import type { DynamicField } from '@/models/dynamicField.model';
import type { FormSubtitle } from '@/models/formSubtitle.form';

export const checkDuplicateNames = (arr: DynamicField[]) => {
  arr.map((item) => {
    const filteredArr = arr.filter((i) => i.name === item.name);

    if (filteredArr.length > 1) {
      const fieldName = filteredArr.map((f) => f.name);

      console.error(
        `Dynamic Form - Fields with duplicated names (${fieldName})`
      );
    }
  });
};

export const checkSubtitlesDuplicateIndexes = (arr?: FormSubtitle[]) => {
  arr?.map((item) => {
    const filteredArr = arr?.filter((i) => i.index === item.index);

    if (filteredArr.length > 1) {
      const index = filteredArr.map((f) => f.index);

      console.error(
        `Dynamic Form - Subtitles with duplicated indexes (index: ${index})`
      );
    }
  });
};
