import { getTagsByLinkId } from '$lib/api/link/addTags';
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async ({ parent, fetch, params }) => {
  const tagsList = await getTagsByLinkId(params.name);
  return {
    tagsList
  };
};
