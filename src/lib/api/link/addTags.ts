import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { AppRoute } from '$lib/constants';
import { tagsForEachLinkStore } from '$lib/stores';
import { getSession } from '$lib/stores/user.store';

export async function addTag(link_id: string, tag_name: string) {
	const s = getSession();
	if (!s?.access_token) {
		await goto(AppRoute.ACCOUNT_LOGIN);
		return;
	}

	const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/tag`, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${s.access_token}`
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({
			link_id,
			tag_name
		})
	});
	if (!response.ok) {
		throw new Error('can not add tag');
	}
	const result = await response.json();
	if (result[0].result) {
		return result[0].tag;
	} else {
		throw new Error('can not add tag');
	}
}

export async function removeTag(link_id: string, tag_id: string): Promise<Boolean> {
	const s = getSession();
	if (!s?.access_token) {
		await goto(AppRoute.ACCOUNT_LOGIN);
		return false;
	}

	const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/tag`, {
		method: 'DELETE',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${s.access_token}`
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({
			link_id,
			tag_id
		})
	});
	if (!response.ok) {
		return false;
	}

	const result = await response.json();

	if (result[0].success != 'true') {
		return false;
	}

	return true;
}

export async function getTagsByLinkId(link_id: string) {
	const s = getSession();
	if (!s?.access_token) {
		await goto(AppRoute.ACCOUNT_LOGIN);
		return;
	}

	const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/tag?link_id=${link_id}`, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${s.access_token}`
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer'
	});

	const result = await response.json();

	console.log('get tags', result[0]);
	const tagsList = Array.isArray(result[0])
		? result[0].map((tag) => ({
				id: tag.tag_id.toString(),
				value: tag.tag_name
			}))
		: [];
	tagsForEachLinkStore.set(tagsList);
	return result[0];
}