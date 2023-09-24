import { apiInstance, errorResponse, type ApiResponse } from '.';

export async function getRecordsPerMonth(
  months: number
): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get(
      '/stats/deaths-per-months/?months=' + months
    );
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function getDeathsPerDay(days: number): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get(
      '/stats/deaths-per-day/?days=' + days
    );
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function getDeathsByDistrict(
  days: number
): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get(
      '/stats/deaths-by-district/?days=' + days
    );
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function getDeathsByUser(days: number): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get(
      '/stats/deaths-by-user/?days=' + days
    );
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}
