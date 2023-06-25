import { apiInstance, errorResponse, type ApiResponse } from '.';

export async function groupsList(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get('/groups/list/');
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function groupCreate(newGroup): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post('/groups/create/', newGroup);
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function groupEdit(editedGroup): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post(
      '/groups/update/' + editedGroup.id + '/',
      editedGroup
    );
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function groupDelete(index: string): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post('/groups/remove/' + index + '/');
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}
