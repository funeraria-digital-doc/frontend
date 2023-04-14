export interface DynamicField {
  label: string;
  input: string;
  name: string;
  rules?: any[];
  type?: DynamicFieldType;
  items?: SelectOption[];
  value?: string | boolean | number;
}

type DynamicFieldType = "text" | "checkbox" | "select" | "date";

interface SelectOption {
  label: string;
  value: string;
}
