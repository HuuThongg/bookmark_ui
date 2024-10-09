import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async ({ params, fetch, parent }) => {
	const data = await parent();

	return {
		title: 'shit'
	};
};
