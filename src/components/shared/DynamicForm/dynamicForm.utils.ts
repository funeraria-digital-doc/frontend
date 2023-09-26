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
