import { createNewAxiosInstance } from '@/api';
import { getProfile, loginUser } from '@/api/users';
import router from '@/router';
import { NO_AUTH, STAFF, TOKEN_KEY, SUPER, USER } from '@/utils/constants';
import {
  deleteLocalStorage,
  getLocalStorage,
  saveLocalStorage,
} from '@/utils/localStorage';
import { reactive, ref } from 'vue';

const user = reactive({
  name: '',
  email: '',
  role: NO_AUTH,
});

const isAuthFromTokenLoaded = ref(false);

export function useUser() {
  const isUserAuthenticated = () => {
    return user.role > NO_AUTH;
  };

  const logoutUser = () => {
    user.name = '';
    user.email = '';
    user.role = NO_AUTH;

    deleteLocalStorage(TOKEN_KEY);
    createNewAxiosInstance();
    router.push('/');
  };

  const updateUser = (data: { name: string; email: string }) => {
    user.name = data.name;
    user.email = data.email;
    user.role = STAFF;
  };

  const authenticateUser = (data: any) => {
    return loginUser(data).then((resp) => {
      if (resp.success) {
        saveLocalStorage(TOKEN_KEY, resp.data.token);
        updateUser(resp.data);
        createNewAxiosInstance();
      }
      return resp;
    });
  };

  async function authenticateUserFromToken() {
    const token = getLocalStorage(TOKEN_KEY);
    let toReturn = false
    if (token) {
      await getProfile()
        .then((resp) => {
          updateUser(resp.data);
          isAuthFromTokenLoaded.value = true;
          toReturn = true
        })
        .catch(() => {
          isAuthFromTokenLoaded.value = true;
        });
    } else {
      isAuthFromTokenLoaded.value = true;
    }
    return toReturn
  }

  return {
    user,
    isUserAuthenticated,
    isAuthFromTokenLoaded,
    authenticateUser,
    authenticateUserFromToken,
    updateUser,
    logoutUser,
  };
}
