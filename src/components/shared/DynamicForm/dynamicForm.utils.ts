import type { DynamicField } from "@/models/dynamicField.model";

export const checkDuplicateNames = (arr: DynamicField[]) => {
  let hasDuplicatedNames = false;

  arr.map((item) => {
    if (arr.filter((i) => i.name === item.name).length > 1) {
      hasDuplicatedNames = true;
    }
  });

  return hasDuplicatedNames;
};
