import { templateList } from '@/api/templates';

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
          console.log(template);
          return {
            id: template.id,
            title: template.title,
            group: getLabel('group', 'select', template.group_id, fields),
            send_type: getLabel(
              'send_type',
              'select',
              template.send_type,
              fields
            ),
            // send_email_to: template.send_email_to,
            // send_email_to_cc: template.send_email_to_cc,
            // send_email_to_bcc: template.send_email_to_bcc,
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

export function deleteTemplate(){
  return true
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
