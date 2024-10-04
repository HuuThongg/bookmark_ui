import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { AppRoute } from '$lib/constants';
import { loadingStatesStore } from '$lib/stores';
import { links } from '$lib/stores/link.store';
import { getSession } from '$lib/stores/user.store';
import type { Link } from '$lib/types/link';
//import { hideContextMenu } from './hideContextMenu';
//import { removeItemsSelected } from './removeItemsSelected';

export async function deleteLinksForever(l: Link[]) {
  const s = getSession();
  if (!s?.access_token) {
    await goto(AppRoute.ACCOUNT_LOGIN)
    return
  }
  const linkIds = l.map((link) => link.link_id);

  loadingStatesStore.update((states) => {
    const newStates = { ...states };
    linkIds.forEach((id) => {
      newStates[id] = true; // Set loading state to true for each link
    });
    return newStates;
  });

  const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/link/deleteLinksForever`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${s.access_token}`
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ link_ids: linkIds }) // body data type must match "Content-Type" header
  });

  //removeItemsSelected();
  //
  //hideContextMenu();

  try {
    const result = await response.json();

    l = result[0];

    if (l === null) return;

    for (let index = 0; index < l.length; index++) {
      const element = l[index];

      links.update((values) => values.filter((value) => value.link_id !== element.link_id));
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingStatesStore.update((states) => {
      const updatedStates = { ...states };
      linkIds.forEach((id) => {
        delete updatedStates[id]; // Remove loading state for each link
      });
      return updatedStates; // Return updated states
    });
  }
}
