import { useMediaQuery } from '@vueuse/core';

export const useMedia = () => {
  return {
    isDesktopView: useMediaQuery('(min-width: 1025px)'),
    isMobileView: useMediaQuery('(max-width: 600px)'),
  };
};
