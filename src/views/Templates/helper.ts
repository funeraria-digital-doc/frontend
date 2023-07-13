import { templateItem, templateList } from '@/api/templates';
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
        return {
          title: resp.data.title,
          group_id: resp.data.group_id,
          send_type: resp.data.send_type,
          send_email_to: resp.data.send_email_to,
          send_email_to_cc: resp.data.send_email_to_cc,
          send_email_to_bcc: resp.data.send_email_to_bcc,
          file: resp.data.file,
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

export function deleteTemplate() {
  return true;
}

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
