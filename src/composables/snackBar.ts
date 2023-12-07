import { computed, reactive } from 'vue';

const state = reactive({
  message: '',
  subMessage: '',
  color: '',
  snackBarModel: false,
  timeout: 3000,
});

export function useSnackBar() {
  const showSnackbar = (
    message: string,
    subMessage: string,
    isSuccess: boolean,
    timeout?: number
  ) => {
    state.message = message;
    state.subMessage = subMessage;
    state.color = isSuccess ? 'green-darken-2' : 'red-darken-2';
    state.snackBarModel = true;
    timeout && (state.timeout = timeout);

    setTimeout(() => {
      state.snackBarModel = false;
    }, state.timeout);
  };

  return {
    snackBarModel: computed(() => state.snackBarModel),
    message: computed(() => state.message),
    subMessage: computed(() => state.subMessage),
    color: computed(() => state.color),
    timeout: computed(() => state.timeout),
    showSnackbar,
  };
}
