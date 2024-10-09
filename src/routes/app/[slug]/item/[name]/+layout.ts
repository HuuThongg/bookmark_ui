import { getSingleLink } from '$lib/api/link/getSingleLink';
import type { LayoutLoad } from '../../../$types';

export const load: LayoutLoad = async ({ params, fetch, parent }) => {
	await parent();
	if (!params.name) {
		return {
			title: 'Name'
		};
	}
	const link = await getSingleLink(fetch, params.name);
	return {
		title: 'shit',
		link
	};
};
