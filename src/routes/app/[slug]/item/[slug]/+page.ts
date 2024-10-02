import type { LayoutLoad } from '../../../$types';

export const load: LayoutLoad = async ({ params }) => {
	return {
		title: 'shit',
		slug: params.slug
	};
};
