import {
  downloadTemplateFile,
  templateDelete,
  templateItem,
  templateList,
} from '@/api/templates';

export const getTemplates = async (
  loading: { value: boolean },
  templates: { value: any },
  fields: any
) => {
  templateList().then((resp) => {
    if (resp.success) {
      let templateData = [];
      if (resp.data.length > 0) {
        templateData = resp.data.map((template: any) => {
          return {
            id: template.id,
            title: template.title,
            group_id: getLabel('group_id', 'select', template.group_id, fields),
            send_type: getLabel(
              'send_type',
              'select',
              template.send_type,
              fields
            ),
            file: template.file,
          };
        });
      }
      templates.value = templateData;
    } else {
      console.error('erro', resp);
    }
    loading.value = false;
  });
};

export const getSingleTemplate = async (id: string, defaultObj: any) => {
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
          validations:
            resp.data.validations &&
            Object.keys(resp.data.validations).length > 0
              ? resp.data.validations
              : [{ ...defaultObj }],
        };
      }
    } else {
      console.error('Get template error:', resp);
    }
  });
};

export const deleteTemplate = async (
  id: string | number,
  templates: { value: { [x: string]: any } },
  snack: any
) => {
  try {
    templateDelete(id).then((resp) => {
      if (resp.success) {
        templates.value = templates.value.filter(
          (obj: { id: string | number }) => obj.id !== id
        );
        snack.value.showSnackbar('Template eliminado com sucesso.', '', true);
      } else {
        snack.value.showSnackbar(
          'Ocorreu um erro ao eliminar o template. <br>Por favor, tente novamente mais tarde.',
          JSON.stringify(resp.error.error),
          false
        );
      }
    });
  } catch (e: any) {
    snack.value.showSnackbar(
      'Ocorreu um erro ao criar o template. <br>Por favor, tente novamente mais tarde.',
      JSON.stringify(e),
      false
    );
  }
};

export function getLabel(key: string, type: string, value: any, fields: any) {
  const field = fields.find((f: { name: string }) => f.name === key);
  let label = null;
  if (type == 'checkbox') {
    if (value) {
      label = field.true_value_label;
    } else {
      label = field.false_value_label;
    }
  } else if (type == 'select') {
    const val = field.items.find((i: { value: any }) => i.value === value);
    if (val && val['label']) {
      label = val['label'];
    }
  }
  return label;
}

export function downloadTemplate(template: any) {
  try {
    downloadTemplateFile(template.columns.id).then((resp: any) => {
      if (resp.success) {
        const file = base64ToFile(resp.data, template.columns.title);
        const url = window.URL.createObjectURL(new Blob([file]));
        const link = document.createElement('a');
        link.href = url;
        const filename = template.columns.title + '.docx';
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.log('error', resp);
      }
    });
  } catch (e: any) {
    console.log(JSON.stringify(e));
  }
}

const base64ToFile = (base64Data: any, title: string) => {
  const baseString = base64Data.data
    .replace(
      'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;',
      ''
    )
    .replace('base64,', '')
    .trim();
  const filename = title + '.docx';
  const byteCharacters = atob(baseString);
  const byteArrays = [];
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }
  const byteArray = new Uint8Array(byteArrays);
  return new File([byteArray], filename, {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
};

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
    console.log('edit');
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
  console.log(templateData)
  console.log('to be sent : ', formData);
  return formData;
};

export function canAction(){
  return true
}
