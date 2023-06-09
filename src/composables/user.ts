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
});

export function useUser() {
  const isUserAuthenticated = () => {
    return user.name !== '';
  };

  const logoutUser = () => {
    user.name = '';
    user.email = '';

    deleteLocalStorage(TOKEN_KEY);
    router.push('/');
  };

  const updateUser = (data: {
    name: string;
    email: string;
    token?: string;
  }) => {
    user.name = data.name;
    user.email = data.email;

    data.token && saveLocalStorage(TOKEN_KEY, data.token);
  };

  const authenticateUserFromToken = () => {
    const token = getLocalStorage(TOKEN_KEY);

    if (token) {
      getProfile().then((resp) => {
        resp.success && updateUser(resp.data);
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
