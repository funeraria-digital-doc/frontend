import type { Template } from '@/views/Templates/templatesForm.interface';
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

    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function templateCreate(
  template: Template
): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post(
      '/template-logic/upload/',
      template
    );

    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function templateDelete(id: string) {
  try {
    const response = await apiInstance.delete(
      '/template-logic/remove/' + id + '/'
    );
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function templateEdit(
  template: Template
): Promise<ApiResponse<any>> {
  try {
    const newTemplateValidations: {}[] = [];
    template.validations.map((validation) => {
      const newValidationItem = {};
      for (const key in Object.keys(validation)) {
        if (
          validation[Object.keys(validation)[key]] ||
          validation[Object.keys(validation)[key]] !== ''
        ) {
          newValidationItem[Object.keys(validation)[key]] =
            validation[Object.keys(validation)[key]];
        }
      }
      newTemplateValidations.push(newValidationItem);
    });
    template = { ...template, validations: newTemplateValidations };
    console.log(template);
    const response = await apiInstance.post(
      '/template-logic/edit/' + template.id + '/',
      template
    );

    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function downloadTemplateFile(id: any) {
  try {
    const response = await apiInstance.get(
      '/template-logic/' + id + '/download/'
    );

    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}
