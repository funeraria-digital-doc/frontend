import { apiInstance, errorResponse, type ApiResponse } from '.';

export async function templateList(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get('/template-logic/list/');

    return { success: true, data: response.data.data};
  } catch (e: any) {
    console.error('List templates error', e);
    return errorResponse(e);
  }
}

export async function templateCreate() {
  return { success: true, data: {} };
}
export async function templateEdit() {
  return { success: true, data: {} };
}
export async function templateDelete() {
  return { success: true, data: {} };
}
