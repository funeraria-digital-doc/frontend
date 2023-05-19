import { apiInstance, errorResponse, type ApiResponse } from ".";

export async function loginUser(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get("/accounts/login");

    return { success: true, data: response.data };
  } catch (e: any) {
    console.error("Login user error", e);
    return errorResponse(e);
  }
}

export async function listUsers(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get("/accounts/list-all-users/");

    return { success: true, data: response.data };
  } catch (e: any) {
    console.error("List users error", e);
    return errorResponse(e);
  }
}
