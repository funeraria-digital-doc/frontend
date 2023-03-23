import { apiInstance, errorResponse, type ApiResponse } from ".";

export async function loginUser(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get("/login");

    return { success: true, data: response.data };
  } catch (e: any) {
    console.error("Login user error", e);
    return errorResponse(e);
  }
}
