import type { DynamicField } from '@/models/dynamicField.model';

export interface FormFieldsGroup {
  title: string;
  fields: DynamicField[];
  sm?: number;
}
