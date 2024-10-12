import type { LayoutLoad } from './$types';
export const ssr = false;
export const csr = true;
export const load: LayoutLoad = async (event) => {
  return {
    meta: {
      title: 'Bookmarking',
    },
  };
};
