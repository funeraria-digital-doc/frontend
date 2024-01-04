import { isDateOrDateTime } from '../../Templates/components/ValidationEditModal/validationEditModal.helper';
import { clickDownloadFile, clickDownloadImages } from '@/utils/downloadFile';
import { generateDocument } from '@/api/recordTemplates';
import moment from 'moment';
import { getFormat } from '../helper';
import { DeathDeclarationDeathForm } from '../forms/deathDeclarationDeath.form';
import { DeathDeclarationDefunctForm } from '../forms/deathDeclarationDefunct.form';
import { DeathDeclarationFamilyMemberForm } from '../forms/deathDeclarationFamilyMember.form';
import { DeathDeclarationFuneralForm } from '../forms/deathDeclarationFuneral.form';
import { DeathDeclarationSpouseForm } from '../forms/deathDeclarationSpouse.form';

export function getFieldRules(validation: any) {
  const rules = [];
  if (!validation.optional || validation.min > 0) {
    if (validation.field_type === 'BOOLEAN') {
      rules.push((value: any) => {
        return (typeof value === 'boolean' && !!value) || 'Campo Obrigatório.';
      });
    } else {
      rules.push((value: any) => !!value || 'Campo Obrigatório.');
    }
  }
  if (validation.min > 0) {
    if (['TEXT', 'TEXTAREA'].includes(validation.field_type)) {
      rules.push(
        (value: any) =>
          value.length >= validation.min ||
          'Minímo de ' + validation.min + ' caractéres'
      );
    } else if (validation.field_type === 'INTEGER') {
      rules.push(
        (value: any) =>
          value >= validation.min || 'Valor minímo de ' + validation.min
      );
    } else if (validation.field_type === 'BOOLEAN') {
      rules.push(
        (value: any) => !!value || 'Valor minímo de ' + validation.min
      );
    } else {
      rules.push((value: any) => {
        return (
          value.length >= validation.min ||
          'Obrigatório escolher pelo menos ' + validation.min + ' opções'
        );
      });
    }
  }
  if (validation.max > 0) {
    if (['TEXT', 'TEXTAREA'].includes(validation.field_type)) {
      rules.push(
        (value: any) =>
          value.length <= validation.max ||
          'Máximo de ' + validation.max + ' caractéres'
      );
    } else if (validation.field_type === 'INTEGER') {
      rules.push(
        (value: any) =>
          value <= validation.max || 'Valor máximo de ' + validation.max
      );
    } else if (
      ['DATE', 'TIME', 'DATETIME', 'EMAIL', 'BOOLEAN'].includes(
        validation.field_type
      )
    ) {
      //nada acontece
    } else {
      rules.push(
        (value: any) =>
          value.length <= validation.max ||
          'Máximo de ' + validation.max + ' opções'
      );
    }
  }
  if (validation.field_type === 'EMAIL') {
    rules.push((value: any) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Email inválido.';
    });
  }
  return rules;
}

export function getDateType(validation: any, templateValidations: any) {
  let type = '';
  const selectedVal = templateValidations.find(
    (templateVal: { name: String }) => {
      return templateVal.name === validation.name;
    }
  );
  if (isDateOrDateTime(selectedVal.format) === 'date') {
    type = 'date';
  } else if (isDateOrDateTime(selectedVal.format) === 'datetime') {
    type = 'datetime-local';
  } else {
    type = 'time';
  }
  return type;
}

export function getValidations(
  templateValidationsItem: any,
  errorMessages: any
) {
  let newValidations: any[] = [];
  templateValidationsItem.map((val: any) => {
    errorMessages.value[val.name] = '';
    if (val.is_field_custom) {
      newValidations.push(val);
    }
  });

  return newValidations;
}

export function getApiErrors(errors: any, errorMessages: any) {
  for (let t = 0; t < Object.keys(errorMessages.value).length; t++) {
    const errorMessageKey = Object.keys(errorMessages.value)[t];
    errorMessages.value[errorMessageKey] = '';
  }
  if (errors.keys_missing) {
    for (let i = 0; i < errors.keys_missing.length; i++) {
      const key = errors.keys_missing[i];
      errorMessages.value[key] = 'Campo obrigatório.';
    }
  }
  if (errors.errors) {
    for (let i = 0; i < Object.keys(errors.errors).length; i++) {
      const key = Object.keys(errors.errors)[i];
      if (
        typeof errors.errors[key] === 'object' &&
        errors.errors[key][Object.keys(errors.errors[key])[0]]
      ) {
        errorMessages.value[key] =
          errors.errors[key][Object.keys(errors.errors[key])[0]];
      } else {
        errorMessages.value[key] = errors.errors[key];
      }
    }
  }
}

export function saveForm(
  form: any,
  props: any,
  modalFields: any,
  errorMessages: any,
  emitSnackMessages: Function,
  emitCloseModal: Function,
  hasKeysMissing: any,
  forceSave: any,
  missingKeys: any
) {
  const auxForceSave = forceSave.value;
  form.value.validate().then((resp: any) => {
    if (resp.valid) {
      generateDocument(
        props.documentId.id,
        modalFields.value,
        auxForceSave
      ).then((docResp: any) => {
        if (docResp.success) {
          clickDownloadFile({ data: docResp.data.file }, props.documentId.name);
          clickDownloadImages(
            { data: docResp.data.images },
            props.documentId.name
          );
          emitSnackMessages(['Documento emitido com sucesso.', '', true]);
          emitCloseModal();
          modalFields.value = {
            to_send_option: '',
            template: '',
            validations: {},
            file_validations: {},
          };
          hasKeysMissing.value = false;
        } else {
          if (docResp.data && docResp.data.missingVars) {
            missingKeys.value = docResp.data.missingVars;
            hasKeysMissing.value = true;
          }
          if (docResp.error && docResp.error.status.toString()[0] === '4') {
            emitSnackMessages([
              'Formulário preenchido incorretamente.',
              'Preencha todos os campos em falta',
              false,
            ]);
            getApiErrors(docResp.error, errorMessages);
          } else {
            emitSnackMessages([
              'Ocorreu um erro. Tente novamente mais tarde.',
              'Em caso de presistencia, contacte os administradores do sistema',
              false,
            ]);
          }
        }
      });
    } else {
      emitSnackMessages([
        'Formulário preenchido incorretamente.',
        'Preencha todos os campos em falta',
        false,
      ]);
    }
  });
}

export function getDatesPlaceholders(selected: any, validations: any) {
  Object.keys(validations).map((val: any) => {
    const selectedVar = selected.find((item: any) => item.name === val);
    const format =
      selectedVar.format instanceof Array
        ? selectedVar.format[0]
        : selectedVar.format;
    const default_value =
      selectedVar.default_value instanceof Array
        ? selectedVar.default_value[0]
        : selectedVar.default_value;
    if (
      ['DATE', 'DATETIME', 'TIME'].indexOf(selectedVar.field_type) >= 0 &&
      format &&
      selectedVar.default_value
    ) {
      const date = getDateFormated(
        format,
        default_value,
        isDateOrDateTime(format) === 'time' ? true : false
      );
      validations[selectedVar.name] = date;
    }
  });
}

export function getDateFormated(
  apiFormat: string,
  modelData: any,
  isTime: boolean
) {
  const format = getFormat(apiFormat, false);
  let dateFormated;
  if (isTime) {
    dateFormated = moment(modelData).format(format);
  } else {
    dateFormated = moment(modelData, 'HH:mm:ss').format(format);
  }
  return dateFormated;
}

export function getMissingKeysLabelHelper(key: any) {
  let newLabel = '';
  if (key.is_field_custom) {
    newLabel = key.label;
  } else {
    let collection = '';
    switch (key.db_collection) {
      case 'RECORDS':
        collection = 'Declarações - ';
        break;
      case 'TEMPLATES':
        collection = 'Modelos - ';
        break;
      case 'SYSTEM':
        collection = 'Sistema - ';
        break;
      case 'USERS':
        collection = 'Utilizadores - ';
        break;
      case 'GROUPS':
        collection = 'Funerária - ';
        break;
      default:
        collection = '';
    }
    if (key.db_collection === 'RECORDS') {
      const compareObjects = [
        DeathDeclarationDeathForm,
        DeathDeclarationDefunctForm,
        DeathDeclarationFamilyMemberForm,
        DeathDeclarationFuneralForm,
        DeathDeclarationSpouseForm,
      ];
      let jump = false;
      for (let i = 0; i < compareObjects.length; i++) {
        compareObjects[i].forEach((val) => {
          if (val.name === key.db_field_reference) {
            newLabel = collection + val.label;
            jump = true;
            return true;
          }
        });
        if (jump) {
          continue;
        }
      }
    } else {
      newLabel = collection + key.db_field_reference;
    }
  }
  return newLabel;
}
