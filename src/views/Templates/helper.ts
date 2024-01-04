import {
  downloadTemplateFile,
  templateDelete,
  templateItem,
  templateList,
} from '@/api/templates';
import { useSnackBar } from '@/composables/snackBar';
import { getLabel } from '@/utils/datatableHelper';
import { clickDownloadFile } from '@/utils/downloadFile';

const { showSnackbar } = useSnackBar();

export const getTemplates = async (templates: { value: any }, fields: any) => {
  templateList().then((resp) => {
    if (resp.success) {
      let templateData = [];
      if (resp.data.length > 0) {
        templateData = resp.data.map((template: any) => {
          return {
            id: template.id,
            title: template.title,
            group_id: getLabel('group_id', template.group_id, fields),
            send_type: getLabel('send_type', template.send_type, fields),
            file: template.file,
          };
        });
      }
      templates.value = templateData;
    } else {
      console.error('erro', resp);
    }
  });
};

export const getSingleTemplate = async (
  id: string
  //defaultObj: any,
  // defaultFileObj: any
) => {
  return templateItem(id).then((resp) => {
    if (resp.success) {
      if (resp.data.id) {
        return {
          id: id,
          title: resp.data.title,
          group_id: resp.data.group_id,
          send_type: resp.data.send_type,
          send_email_to: resp.data.send_email_to ? resp.data.send_email_to : [],
          send_email_to_cc: resp.data.send_email_to_cc
            ? resp.data.send_email_to_cc
            : [],
          send_email_to_bcc: resp.data.send_email_to_bcc
            ? resp.data.send_email_to_bcc
            : [],
          file: resp.data.file ? resp.data.file : null,
          file_name: resp.data.file_name ? resp.data.file_name : null,
          validations:
            resp.data.validations &&
            Object.keys(resp.data.validations).length > 0
              ? resp.data.validations
              : [],
          file_validations:
            resp.data.file_validations &&
            Object.keys(resp.data.file_validations).length > 0
              ? resp.data.file_validations
              : [],
        };
      }
    } else {
      console.error('Get template error:', resp);
    }
  });
};
//: [{ ...defaultObj }],//: defaultFileObj,
export const deleteTemplate = async (
  id: string | number,
  templates: { value: { [x: string]: any } }
) => {
  try {
    templateDelete(id).then((resp) => {
      if (resp.success) {
        templates.value = templates.value.filter(
          (obj: { id: string | number }) => obj.id !== id
        );
        showSnackbar('Template eliminado com sucesso.', '', true);
      } else {
        showSnackbar(
          'Ocorreu um erro ao eliminar o template. <br>Por favor, tente novamente mais tarde.',
          JSON.stringify(resp.error.error),
          false
        );
      }
    });
  } catch (e: any) {
    showSnackbar(
      'Ocorreu um erro ao criar o template. <br>Por favor, tente novamente mais tarde.',
      JSON.stringify(e),
      false
    );
  }
};

export function downloadTemplate(template: any) {
  try {
    downloadTemplateFile(template.id).then((resp: any) => {
      if (resp.success) {
        clickDownloadFile(resp.data, template.title);
      } else {
        console.log('error', resp);
      }
    });
  } catch (e: any) {
    console.log(JSON.stringify(e));
  }
}

export const formatDataBeforeRequest = (templateData: any, mode: string) => {
  let formData = {};

  if (mode === 'create') {
    for (let i = 0; i < Object.keys(templateData).length; i++) {
      const key = Object.keys(templateData)[i];
      const item = templateData[key];
      if (key === 'validations') {
        const formValidations = [];
        for (let v = 0; v < Object.keys(item).length; v++) {
          const validation = {};
          const validationKey = Object.keys(item)[v];
          const validationItem = item[validationKey.toString()];
          for (let t = 0; t < Object.keys(validationItem).length; t++) {
            const valKey = Object.keys(validationItem)[t];
            const valItem = validationItem[valKey];
            if (valItem != null && valItem != undefined) {
              if (
                typeof valItem == 'object' &&
                Object.keys(valItem).length > 0
              ) {
                validation[valKey] = valItem;
              } else if (
                typeof valItem == 'boolean' ||
                (typeof valItem == 'string' && valItem !== '') ||
                typeof valItem == 'number'
              ) {
                validation[valKey] = valItem;
              }
            }
          }
          if (Object.keys(validation).length > 0) {
            formValidations.push(validation);
          }
        }
        if (formValidations.length > 0) {
          formData.validations = formValidations;
        }
      } else {
        if (item !== '') {
          formData[key] = item;
        }
      }
    }
  } else if (mode === 'edit') {
    for (let i = 0; i < Object.keys(templateData).length; i++) {
      const key = Object.keys(templateData)[i];
      const item = templateData[key];
      if (key === 'validations') {
        const formValidations = [];
        for (let v = 0; v < Object.keys(item).length; v++) {
          const validation = {};
          const validationKey = Object.keys(item)[v];
          const validationItem = item[validationKey.toString()];
          for (let t = 0; t < Object.keys(validationItem).length; t++) {
            const valKey = Object.keys(validationItem)[t];
            const valItem = validationItem[valKey];
            if (valItem != null && valItem != undefined) {
              if (
                typeof valItem == 'object' &&
                Object.keys(valItem).length > 0
              ) {
                validation[valKey] = valItem;
              } else if (
                typeof valItem == 'boolean' ||
                (typeof valItem == 'string' && valItem !== '') ||
                typeof valItem == 'number'
              ) {
                validation[valKey] = valItem;
              }
            }
          }
          if (Object.keys(validation).length > 0) {
            formValidations.push(validation);
          }
        }
        if (formValidations.length > 0) {
          formData.validations = formValidations;
        }
      } else {
        if (item !== '') {
          formData[key] = item;
        }
      }
    }
  }
  return formData;
};

export function canAction() {
  return true;
}
