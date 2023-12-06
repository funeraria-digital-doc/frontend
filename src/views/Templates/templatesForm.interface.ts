export interface Template {
  file: string | ArrayBuffer;
  group_id?: string;
  id?: string;
  send_email_to_bcc: string[];
  send_email_to_cc: string[];
  send_email_to: string[];
  send_type: string;
  title: string;
  validations: TemplateValidation[];
  file_validations: TemplateFileValidation[]
}

export interface TemplateValidation {
  db_collection: string;
  db_field_reference: string;
  default_value: any[];
  field_type?: string;
  format: string;
  is_date_numeric: boolean;
  is_field_custom: boolean;
  label: string;
  max?: number;
  min?: number;
  name?: string;
  optional: boolean;
  options: any[];
  placeholder: string;
}

export interface TemplateFileValidation {
  name: string;
  name_with_extension: string;
  image_data: string;
  image_data_base64: string
}
