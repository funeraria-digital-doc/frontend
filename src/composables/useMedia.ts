import { useMediaQuery } from '@vueuse/core';

export const useMedia = () => {
  return {
    isDesktopView: useMediaQuery('(min-width: 1024px)'),
    isMobileView: useMediaQuery('(max-width: 600px)'),
  };
};
