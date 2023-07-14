import { getProfile, loginUser } from '@/api/users';
import router from '@/router';
import { TOKEN_KEY } from '@/utils/constants';
import {
  deleteLocalStorage,
  getLocalStorage,
  saveLocalStorage,
} from '@/utils/localStorage';
import { reactive, ref } from 'vue';

const user = reactive({
  name: '',
  email: '',
});

const isAuthFromTokenLoaded = ref(false);

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

  const updateUser = (data: { name: string; email: string }) => {
    user.name = data.name;
    user.email = data.email;
  };

  const authenticateUser = (data: any) => {
    return loginUser(data).then((resp) => {
      if (resp.success) {
        saveLocalStorage(TOKEN_KEY, resp.data.token);
        updateUser(resp.data);
      }
      return resp;
    });
  };

  const authenticateUserFromToken = () => {
    const token = getLocalStorage(TOKEN_KEY);

    if (token) {
      getProfile()
        .then((resp) => {
          resp.success && updateUser(resp.data);
          isAuthFromTokenLoaded.value = true;
        })
        .catch(() => {
          isAuthFromTokenLoaded.value = true;
        });
    } else {
      isAuthFromTokenLoaded.value = true;
    }
  };

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
