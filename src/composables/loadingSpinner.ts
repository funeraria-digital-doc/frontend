import { computed, reactive } from 'vue';

const loadingSpinner = reactive({
  active: false,
});

export function useLoadingSpinner() {
  const changeLoadingSpinnerState = (state: boolean) => {
    loadingSpinner.active = state;
  };

  return {
    isLoadingSpinnerActive: computed(() => loadingSpinner.active),
    changeLoadingSpinnerState,
  };
}
