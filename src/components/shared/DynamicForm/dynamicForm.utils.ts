import type { DynamicField } from "@/models/dynamicField.model";
import type { FormSubtitle } from "@/models/formSubtitle.form";

export const checkDuplicateNames = (arr: DynamicField[]) => {
  let hasDuplicatedNames = false;

  arr.map((item) => {
    if (arr.filter((i) => i.name === item.name).length > 1) {
      hasDuplicatedNames = true;
    }
  });

  return hasDuplicatedNames;
};

export const checkSubtitlesDuplicateIndexes = (arr?: FormSubtitle[]) => {
  let hasDuplicatedNames = false;

  arr?.map((item) => {
    if (arr?.filter((i) => i.index === item.index).length > 1) {
      hasDuplicatedNames = true;
    }
  });

  return hasDuplicatedNames;
};
