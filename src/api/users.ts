import { apiInstance, errorResponse, type ApiResponse } from '.';

export async function loginUser(data: {
  email: any;
  password: any;
}): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post('/accounts/login/', {
      username: data.email.value,
      password: data.password.value,
    });

    return {
      success: true,
      data: { ...response.data, username: response.data.name },
    };
  } catch (e: any) {
    console.error('Login user error', e);
    return errorResponse(e);
  }
}

export async function changePassword(data: {
  password: any;
  confirmPassword: any;
}): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post('/accounts/change-password/', {
      password: data.password.value,
      confirm_password: data.confirmPassword.value,
    });

    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function listAllUsers(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get('/accounts/list-all-users/');
    return { success: true, data: response.data };
  } catch (e: any) {
    console.error('List users error', e);
    return errorResponse(e);
  }
}

export async function listAllActiveUsers(
  token: string
): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get('/accounts/list-active-users/', {
      headers: {
        Authorization: 'Token ' + token,
      },
    });

    return { success: true, data: response.data };
  } catch (e: any) {
    console.error('List active users error', e);
    return errorResponse(e);
  }
}

export async function editProfile(data: {
  username: { value: any };
  email: { value: any };
}): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.patch('/accounts/edit-profile/', {
      username: data.username.value,
      email: data.email.value,
    });

    return { success: true, data: response.data };
  } catch (e: any) {
    console.error('Edit Profile error', e);
    return errorResponse(e);
  }
}

export async function getProfileImage(): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.get('/accounts/profile-image/');

    return { success: true, data: response.data };
  } catch (e: any) {
    console.error('Get profile image error', e);
    return errorResponse(e);
  }
}

export async function editProfileImage(
  image: string
): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post('/accounts/file-upload/', {
      file: image,
    });
    return { success: true, data: response.data };
  } catch (e: any) {
    console.error('Edit profile image error', e);
    return errorResponse(e);
  }
}

export async function userCreate(data: any): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post('/accounts/create-user/', data);
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function userDelete(id: any): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post('/accounts/remove/' + id + '/');
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}

export async function userEdit(data: any): Promise<ApiResponse<any>> {
  try {
    const response = await apiInstance.post(
      '/accounts/edit-user/' + data.id + '/',
      data
    );
    return { success: true, data: response.data };
  } catch (e: any) {
    return errorResponse(e);
  }
}
