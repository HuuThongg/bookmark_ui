import { PUBLIC_API_ENDPOINT } from '$env/static/public';

export async function requestPasswordResetLink(emailAddress: string) {
	const response = await fetch(`${PUBLIC_API_ENDPOINT}/public/requestResetPasswordLink`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({
			email: emailAddress
		})
	});

	try {
		const data = await response.json();

		if (data.message === 'reset password link has been sent') {
		} else {
			alert(data.message);
		}
	} catch (error) {
		console.log(error);
	}
}
