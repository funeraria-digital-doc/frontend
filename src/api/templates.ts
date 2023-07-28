import { apiInstance, errorResponse, type ApiResponse } from '.';

export async function templateList(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get('/template-logic/list/');

    return { success: true, data: response.data.data };
  } catch (e: any) {
    console.error('List templates error', e);
    return errorResponse(e);
  }
}

export async function templateItem(id: string): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get(
      '/template-logic/get-template/' + id + '/'
    );
    return { success: true, data: response.data.data };
  } catch (e: any) {
    console.error('Get single template error', e);
    return errorResponse(e);
  }
}

export async function getVariablesFromFile(
  file: File
): Promise<ApiResponse<any>> {
  try {
    const formData = new FormData();
    formData.append('file', file as File);
    const response = await apiInstance.post(
      '/template-logic/get-variables-from-file/',
      formData
    );
    if (response.status == 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, data: response };
    }
  } catch (e: any) {
    return { error: e.response };
  }
}

export async function templateCreate(template: {
  id: null;
  title: string;
  group_id: null;
  send_type: null;
  send_email_to: never[];
  send_email_to_cc: never[];
  send_email_to_bcc: never[];
  file: null;
  validations: {
    name: null;
    optional: boolean;
    field_type: null;
    is_field_custom: boolean;
  }[];
}): Promise<ApiResponse<any>> {
  const response = await apiInstance.post('/template-logic/upload/', template);
  if (response.status == 200) {
    return { success: true, data: response.data };
  } else {
    return { success: false, data: response };
  }
}
export async function templateDelete(id: string) {
  try {
    const response = await apiInstance.post(
      '/template-logic/remove/' + id + '/'
    );
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function templateEdit(template: {
  id: null;
  title: string;
  group_id: null;
  send_type: null;
  send_email_to: never[];
  send_email_to_cc: never[];
  send_email_to_bcc: never[];
  file: null;
  validations: {
    name: null;
    optional: boolean;
    field_type: null;
    is_field_custom: boolean;
  }[];
}): Promise<ApiResponse<any>> {
  const response = await apiInstance.post(
    '/template-logic/edit/' + template.id + '/',
    template
  );
  if (response.status == 200) {
    return { success: true, data: response.data };
  } else {
    return { success: false, data: response };
  }
}
