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
  data: any,
  forceSave: boolean
): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post(
      `/template-logic/${data.template}/download/${record_id}/`,
      {
        data: data,
        forceSave: forceSave,
      }
    );
    console.log('aqui', response)
    return {
      success:
        response.data && response.data.hasOwnProperty('sucess')
          ? response.data.sucess
          : true,
      data: response.data,
    };
  } catch (e: any) {
    return errorResponse(e);
  }
}
