import { PUBLIC_API_ENDPOINT } from '$env/static/public';

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
			throw new Error(error.message || 'An error occurred during signup');
		}
		const data = await response.json();

		return data[0];
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
	} catch (error) {
		throw new Error('Error connecting to the server.');
	}
}
