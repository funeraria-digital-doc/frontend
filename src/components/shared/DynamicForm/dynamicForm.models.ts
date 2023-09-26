import type { DynamicField } from '@/models/dynamicField.model';

export interface FormFieldsGroup {
  title: string;
  isAccordion: Boolean;
  fields: DynamicField[];
}
