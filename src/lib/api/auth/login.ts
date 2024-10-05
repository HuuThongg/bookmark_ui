import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { toast } from 'svelte-sonner';
import { setSession } from '../../stores/user.store';
import type { Session } from '$lib/types/session';
import { AppRoute } from '$lib/constants';

//export async function login(formData: any) {
//  const response = await fetch(`${PUBLIC_API_ENDPOINT}/public/account/signin`, {
//    method: 'POST',
//    mode: 'cors',
//    cache: 'no-cache',
//    credentials: 'include',
//    redirect: 'follow',
//    referrerPolicy: 'no-referrer',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(formData)
//  });
//
//  if (!response.ok) {
//    const error = await response.json();
//    console.log("error json", error)
//    throw new Error(error.message);
//  }
//  const data = await response.json();
//
//  return data[0];
//
//}

export async function login(formData: any) {
	try {
		const response = await fetch(`${PUBLIC_API_ENDPOINT}/public/account/signin`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'include',
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});

		if (!response.ok) {
			const error = await response.json();
			console.log('error json', error);
			throw new Error(error.message);
		}
		const data = await response.json();

		const session: Session = data[0];

		setSession(session);
		toast.success('Welcome Back');
		await goto(AppRoute.APP);
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === 'invalid password') {
				toast.error('Invalid Password');
			}
		} else {
			toast.error('error from the server');
		}
	}
}
//const user = await login({ loginCredentialDto: { email, password } });
//
//     if (user.isAdmin && !$serverConfig.isOnboarded) {
//       await onOnboarding();
//       return;
//     }
//
//     if (!user.isAdmin && user.shouldChangePassword) {
//       await onFirstLogin();
//       return;
//     }
