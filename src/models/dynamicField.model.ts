export interface DynamicField extends FileDynamicField {
  label: string;
  input: string;
  name: string;
  rules?: any[];
  type?: DynamicFieldType;
  items?: SelectOption[];
  value?: string | boolean | number;
}

type DynamicFieldType =
  | 'checkbox'
  | 'date-time'
  | 'date'
  | 'file'
  | 'select'
  | 'text'
  | 'time';

interface SelectOption {
  label: string;
  value: string;
}

interface FileDynamicField {
  downloadFile?: boolean;
  downloadName?: string;
}
