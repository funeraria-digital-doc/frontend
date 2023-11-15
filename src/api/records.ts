import { apiInstance, errorResponse, type ApiResponse } from '.';

export async function recordsList(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get('/records/list/');
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function recordItem(id: string): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get('/records/get-record/' + id + '/');
    return { success: true, data: response.data };
  } catch (e: any) {
    console.error('Get single record error', e);
    return errorResponse(e);
  }
}

export async function recordCreate(newRecord: any): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post('/records/create/', newRecord);
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function recordEdit(
  id: string,
  editedRecord: any
): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post(
      `/records/update/${id}/`,
      editedRecord
    );
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function recordDelete(index: string): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post('/records/remove/' + index + '/');
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function recordsUpdateStatus(
  recordsIds: Array<String>
): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post(
      `/records/update-many-status/`,
      recordsIds
    );
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}
