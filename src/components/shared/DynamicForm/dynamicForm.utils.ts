import type { DynamicField } from '@/models/dynamicField.model';
import type { FormFieldsGroup } from './dynamicForm.models';

const checkDuplicateNames = (fields: DynamicField[]) => {
  fields.forEach((field) => {
    const filteredArr = fields.filter((i) => i.name === field.name);

    if (filteredArr.length > 1) {
      const fieldName = filteredArr.map((f) => f.name);

      console.error(
        `Dynamic Form - Fields with duplicated names (${fieldName})`
      );
    }
  });
};

export const checkDuplicateNamesFormFields = (
  formFieldsGroups: FormFieldsGroup[]
) => {
  formFieldsGroups.forEach((formFieldsGroup) =>
    checkDuplicateNames(formFieldsGroup.fields)
  );
};

export const dynamicFormValues = async (
  form: any,
  input: any,
  defaultValue?: any
) => {
  const { valid } = await form.value.validate();
  const values: any = defaultValue ?? {};

  if (valid) {
    for (const element of input.target.elements) {
      if (element.name) {
        let value = element.value || null;

        if (element.type === 'checkbox') {
          value = element.checked;
        } else if (element.type === 'file') {
          value = element.attributes.value;
        }

        values[element.name] = value;
      }
    }
  }

  return { valid, values };
};
