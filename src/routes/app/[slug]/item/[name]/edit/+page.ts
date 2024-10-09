import { getTagsByLinkId } from '$lib/api/link/addTags';
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async ({ parent, fetch, params }) => {
	console.log('load', params.name);
	const tagsList = await getTagsByLinkId(params.name);
	console.log('rerun tagsList', tagsList);
	return {
		tagsList
	};
};
