import { goto } from '$app/navigation';
import { checkIfIsAuthenticated } from '$lib/api/auth';
import { AppRoute } from '$lib/constants';
import { getSession } from '$lib/stores/user.store';
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async () => {
	const access_token = getSession().access_token;
	if (access_token) {
		const isLoggin = await checkIfIsAuthenticated(access_token);
		if (isLoggin) {
			await goto(AppRoute.APP);
		}
	}
	return { title: 'Login' };
};
