import { apiInstance, errorResponse, type ApiResponse } from ".";

export async function loginUser(data: {
  email: any;
  password: any;
}): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post("/accounts/login/", {
      username: data.email.value,
      password: data.password.value,
    });
    return { success: true, data: response.data };
  } catch (e: any) {
    return { error: e.response };
  }
}

export async function changePassword(data: {
  password: any;
  confirmPassword: any;
  token: any;
}): Promise<ApiResponse<any>> {
  try {
    console.log(data.token)
    const response = await apiInstance.post(
      "/accounts/change-password/",
      {
        password: data.password.value,
        confirm_password: data.confirmPassword.value,
      },
      {
        headers: {
          Authorization: "Token " + data.token,
        },
      }
    );
    console.log(response);
    return { success: true };
  } catch (e: any) {
    return { error: e.response };
  }
}

export async function listAllUsers(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get("/accounts/list-all-users/");

    return { success: true, data: response.data };
  } catch (e: any) {
    console.error("List users error", e);
    return errorResponse(e);
  }
}

export async function listAllActiveUsers(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get("/accounts/list-active-users/");

    return { success: true, data: response.data };
  } catch (e: any) {
    console.error("List active users error", e);
    return errorResponse(e);
  }
}

export async function getProfile(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get("/accounts/profile/");

    return { success: true, data: response.data };
  } catch (e: any) {
    console.error("Get Profile error", e);
    return errorResponse(e);
  }
}

export async function editProfile(data: {
  username: { value: any };
  email: { value: any };
  token: { value: any };
}): Promise<ApiResponse<any>> {
  try {
    console.log(data.token);
    const response = await apiInstance.patch(
      "/accounts/edit-profile/",
      {
        username: data.username.value,
        email: data.email.value,
      },
      {
        headers: {
          Authorization: "Token " + data.token,
        },
      }
    );

    return { success: true, data: response.data };
  } catch (e: any) {
    console.error("Edit Profile error", e);
    return errorResponse(e);
  }
}
