import { apiInstance, errorResponse, type ApiResponse } from ".";

export async function loginUser(data: {
  email: any;
  password: any;
}): Promise<ApiResponse<any>> {
  try {
    console.log('entra aqui!')
    console.log(data)
    const response = await apiInstance.post("/accounts/login/", {
      username: data.email.value,
      password: data.password.value,
    });
    console.log(response)
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
