import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { page } from '$app/stores';
import { toast } from 'svelte-sonner';
import { goto } from '$app/navigation';
import { AppRoute } from '$lib/constants';

export async function createNewPasswordRequest(password: string) {
	let token: string | null = null;
	const sub = page.subscribe((v) => (token = v.url.searchParams.get('token')));
	sub();
	if (!token) {
		toast.warning('check the link in the email box again!');
	}

	const response = await fetch(`${PUBLIC_API_ENDPOINT}/public/updatePassword`, {
		method: 'PATCH',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({
			password: password,
			token
		})
	});

	try {
		const data = await response.json();

		console.log(data);

		if (data.message === 'password update successfully') {
			toast.success('password update successfully');

			setTimeout(() => {
				goto(AppRoute.ACCOUNT_LOGIN);
			}, 2000);
		} else if (data.message === 'invalid password reset token') {
			toast.error('invalid password reset token');

			setTimeout(() => {
				goto(AppRoute.ACCOUNT_LOST);
			}, 2000);
		}
	} catch (error) {
		console.log(error);
	}
}
