import { reactive } from 'vue';

const loadingSpinner = reactive({
  active: false,
});

export function useLoadingSpinner() {
  return {
    loadingSpinner
  }
}
