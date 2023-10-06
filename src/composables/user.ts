import { createNewAxiosInstance } from '@/api';
import { loginUser } from '@/api/users';
import router from '@/router';
import { TOKEN_KEY } from '@/utils/constants';
import jwt_decode from 'jwt-decode';
import {
  deleteLocalStorage,
  getLocalStorage,
  saveLocalStorage,
} from '@/utils/localStorage';
import { reactive, ref } from 'vue';

const user = reactive({
  name: '',
  email: '',
  role: '',
  expiration_date: 0,
});

const isAuthFromTokenLoaded = ref(false);

export function useUser() {
  const isUserAuthenticated = () => {
    return user.role !== '';
  };

  const logoutUser = () => {
    user.name = '';
    user.email = '';
    user.role = '';
    user.expiration_date = 0;

    deleteLocalStorage(TOKEN_KEY);
    createNewAxiosInstance();
    router.push('/');
  };

  const updateUser = (auth: any) => {
    user.name = auth.name;
    user.email = auth.email;
    user.role = auth.role;
    user.expiration_date = auth.exp;
  };

  const authenticateUser = (data: any) => {
    return loginUser(data).then((resp) => {
      if (resp.success) {
        const auth = jwt_decode(resp.data.access);
        saveLocalStorage(TOKEN_KEY, resp.data.access);
        updateUser(auth);
        createNewAxiosInstance();
      }
      return resp;
    });
  };

  async function authenticateUserFromToken() {
    const token = getLocalStorage(TOKEN_KEY);
    const toReturn = false
    if (token) {
      const auth = jwt_decode(token);
      if (auth.exp * 1000 > new Date().getTime()) updateUser(auth);
      isAuthFromTokenLoaded.value = true;
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
