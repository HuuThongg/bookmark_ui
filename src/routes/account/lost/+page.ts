import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async ({ parent }) => {
	await parent();
	return {
		title: 'Lost'
	};
};
