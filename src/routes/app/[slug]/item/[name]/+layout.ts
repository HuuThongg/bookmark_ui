import { getSingleLink } from '$lib/api/link/getSingleLink';
import type { LayoutLoad } from '../../../$types';

export const load: LayoutLoad = async ({ params, fetch, parent }) => {

  await parent();

  console.log("params", params.name)
  if (!params.name) {
    return {
      title: 'Name'
    };
  }
  const link = await getSingleLink(fetch, params.name);
  return {
    title: 'shit',
    slug: params.name
  };
};
