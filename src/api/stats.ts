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

export async function getCurrentMonthStats(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get('/stats/current-month-services/');
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function getCurrentYearStats(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get('/stats/current-year-services/');
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function getBestMonthStats(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get('/stats/best-month/');
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}
