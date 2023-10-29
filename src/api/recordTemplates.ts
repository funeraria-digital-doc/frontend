import { apiInstance, errorResponse, type ApiResponse } from '.';

export async function getTemplates(record: number): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get(
      '/record-templates/' + record + '/list-templates/'
    );
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function generateDocument(
  record_id: number,
  data: any
): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post(
      `/template-logic/${data.template}/download/${record_id}/`,
      data
    );
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}
