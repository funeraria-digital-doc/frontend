import {
  recordDelete,
  recordItem,
  recordsList,
  recordsUpdateStatus,
} from '@/api/records';
import { getLabel } from '@/utils/datatableHelper';

export const getRecords = async (
  loading: { value: boolean },
  records: { value: any },
  fields: any
) => {
  recordsList().then((resp) => {
    if (resp.success) {
      let recordsData = [];
      if (resp.data.length > 0) {
        recordsData = resp.data.map((record: any) => {
          return {
            id: record.id,
            name: record.name,
            email: record.email,
            family_member_phone: record.family_member_phone,
            gender: getLabel('gender', record.gender, fields),
            status: getLabel('status', record.status, fields),
            group_id: getLabel('group_id', record.group_id, fields),
            selectable:
              getLabel('status', record.status, fields) === 'Ativo'
                ? true
                : false,
          };
        });
      }
      records.value = recordsData;
    } else {
      console.error('erro', resp);
    }
    loading.value = false;
  });
};

export const getSingleRecord = async (id: string) => {
  return recordItem(id).then((resp: any) => {
    if (resp.success && resp.data && resp.data.id) {
      return resp.data;
    } else {
      console.error('Get template error:', resp);
    }
  });
};

export const deleteRecord = async (
  id: string,
  records: { value: { [x: string]: any } },
  snack: any
) => {
  try {
    recordDelete(id).then((resp: any) => {
      if (resp.success) {
        records.value = records.value.filter(
          (obj: { id: string | number }) => obj.id !== id
        );
        snack.value.showSnackbar('Declaração eliminada com sucesso.', '', true);
      } else {
        snack.value.showSnackbar(
          'Ocorreu um erro ao eliminar a declaração. <br>Por favor, tente novamente mais tarde.',
          JSON.stringify(resp.error.error),
          false
        );
      }
    });
  } catch (e: any) {
    snack.value.showSnackbar(
      'Ocorreu um erro ao criar a declaração. <br>Por favor, tente novamente mais tarde.',
      JSON.stringify(e),
      false
    );
  }
};

export function checkErrors(
  error: any,
  errorMessages: any,
  errorIndexes: any,
  snack: any,
  defaultErrorMessages: any
) {
  if (error && error.errors) {
    let errors = '';
    for (let i = 0; i < Object.keys(error.errors).length; i++) {
      const validationKey = Object.keys(error.errors)[i];
      const validationItem = error.errors[validationKey];
      errors += validationKey + ', ';
      if (validationKey == 'validations') {
        for (let t = 0; t < Object.keys(validationItem).length; t++) {
          const valKey = Object.keys(validationItem)[t];
          errorIndexes.value.push(parseInt(valKey));
        }
      }
      errorMessages.value[validationKey] = validationItem;
    }
    if (errors.substring(errors.length - 2) == ', ') {
      snack.value.showSnackbar(
        'Contém erros nos seguintes campos:',
        errors.substring(0, errors.length - 2),
        false
      );
    }
  } else {
    errorMessages.value = { ...defaultErrorMessages };
  }
  snack.value.showSnackbar(
    'Verifique que todos os campos obrigatórios estão preenchidos e tente novamente.',
    '',
    false
  );
}

export function canAction() {
  return true;
}

export function generateDocuments(record: any, callback: Function) {
  callback(record);
}

export function getFormat(templateFormat: any, toPicker: boolean) {
  let format = '';
  if (['DAY', 'DAYS'].some((sub) => templateFormat.includes(sub))) {
    if (format) {
      format += '/';
    }
    format += toPicker ? 'dd' : 'DD';
  }
  if (['MONTH', 'MONTHS'].some((sub) => templateFormat.includes(sub))) {
    if (format) {
      format += '/';
    }
    format += 'MM';
  }
  if (['YEAR', 'YEARS'].some((sub) => templateFormat.includes(sub))) {
    if (format) {
      format += '/';
    }
    format += 'YYYY';
  }
  if (['HOUR', 'HOURS'].some((sub) => templateFormat.includes(sub))) {
    if (format) {
      format += ' ';
    }
    format += 'HH';
  }
  if (['MINUTE', 'MINUTES'].some((sub) => templateFormat.includes(sub))) {
    if (format) {
      if (['HOUR', 'HOURS'].some((sub) => templateFormat.includes(sub))) {
        format += ':';
      } else {
        format += ' ';
      }
    }
    format += 'mm';
  }
  if (['SECOND', 'SECONDS'].some((sub) => templateFormat.includes(sub))) {
    if (format) {
      if (
        ['MINUTE', 'MINUTES', 'HOUR', 'HOURS'].some((sub) =>
          templateFormat.includes(sub)
        )
      ) {
        format += ':';
      } else {
        format += ' ';
      }
    }
    format += 'ss';
  }
  return format;
}

export const changeRecordsStatus = async (
  loading: { value: boolean },
  recordsIds: any,
  records: any,
  snack: any
) => {
  recordsUpdateStatus(recordsIds).then((resp) => {
    if (resp.success) {
      recordsIds.forEach((element: number) => {
        const recordFound = records.value.find(
          (record: any) => element == record.id
        );
        recordFound.status = 'Arquivado';
        recordFound.selectable = false;
      });
      snack.value.showSnackbar('Declarações arquivadas com sucesso.', '', true);
    } else {
      console.error('erro', resp);
      snack.value.showSnackbar(
        'Ocorreu um erro ao arquivar as declarações.',
        'Tente novamente mais tarde',
        true
      );
    }
    loading.value = false;
  });
};
