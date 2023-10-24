export function getLabel(key: string, value: any, fields: any) {
  const field = fields.find((f: { name: string }) => f.name === key);
  let label = null;
  if (field) {
    if (field.type == 'checkbox') {
      if (value) {
        label = field.true_value_label;
      } else {
        label = field.false_value_label;
      }
    } else if (field.type == 'select') {
      const val = field.items.find((i: { value: any }) => i.value === value);

      if (val && val['label']) {
        label = val['label'];
      }
    } else {
      label = value;
    }
  }

  return label;
}
