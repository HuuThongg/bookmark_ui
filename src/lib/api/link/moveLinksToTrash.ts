import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { AppRoute } from '$lib/constants';
import { getSession } from '$lib/stores/user.store';
import type { Link } from '$lib/types/link';
import { links, trashLinks, linksFound } from '$lib/stores/link.store';

let l: Partial<Link>[] = [];
export async function moveLinksToTrash(linkIds: string[]) {
	const s = getSession();
	if (!s?.access_token) {
		await goto(AppRoute.ACCOUNT_LOGIN);
		return;
	}

	const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/link/moveLinksToTrash`, {
		method: 'PATCH',
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
			link_ids: linkIds
		})
	});
	console.log('res', response);

	const result = await response.json();

	const newTrashedLinks: Partial<Link>[] = result[0];

	console.log('newTrashedLinks', newTrashedLinks);
	const unsubscribe = trashLinks.subscribe((values) => {
		l = [...l, ...values];
	});

	unsubscribe();

	for (let index = 0; index < newTrashedLinks.length; index++) {
		const element = newTrashedLinks[index];

		links.update((values) => values.filter((value) => value.link_id !== element.link_id));

		l = l.filter((l) => l.link_id !== element.link_id);
	}
	trashLinks.set(l);

	linksFound.set(l);

	//removeItemsSelected();

	//toggleDeleteItemsConfirmationPopup();
}
