import { getProfile } from '@/api/users';
import router from '@/router';
import { TOKEN_KEY } from '@/utils/constants';
import {
  deleteLocalStorage,
  getLocalStorage,
  saveLocalStorage,
} from '@/utils/localStorage';
import { reactive } from 'vue';

const user = reactive({
  name: '',
  email: '',
  token: '',
});

export function useUser() {
  const isUserAuthenticated = () => {
    return user.name !== '';
  };

  const logoutUser = () => {
    user.name = '';
    user.email = '';
    user.token = '';
    deleteLocalStorage(TOKEN_KEY);
    router.push('/');
  };

  const updateUser = (data: {
    username: string;
    email: string;
    token?: string;
  }) => {
    data.token && saveLocalStorage(TOKEN_KEY, data.token);
    const token = getLocalStorage(TOKEN_KEY);
    getProfile(token).then((resp) => {
      if (resp.success) {
        user.name = resp.data.username;
        user.email = resp.data.email;
      }
      user.token = token;
    });
  };

  const authenticateUserFromToken = () => {
    const token = getLocalStorage(TOKEN_KEY);

    if (token) {
      getProfile(token).then((resp) => {
        resp.success && updateUser(resp.data);
        user.token = token;
      });
    }
  };

  return {
    user,
    isUserAuthenticated,
    authenticateUserFromToken,
    updateUser,
    logoutUser,
  };
}
