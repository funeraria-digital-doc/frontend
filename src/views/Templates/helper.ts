import { templateDelete, templateItem, templateList } from '@/api/templates';
import type { Ref } from 'vue';

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
          };
        });
      }
      console.log(templateData);
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
        console.log('send_type', resp.data);
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
    console.log('id', id)
    console.log('templates', templates.value)
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
