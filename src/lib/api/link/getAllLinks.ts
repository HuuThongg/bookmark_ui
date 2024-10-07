
import type { Link } from '$lib/types/link';
import { getSession } from '$lib/stores/user.store';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { allLinks } from '$lib/stores/link.store';
import { toast } from 'svelte-sonner';
import { goto } from '$app/navigation';
import { AppRoute } from '$lib/constants';
import type { Fetch } from '$lib/types';

export async function getAllLinks(fetch: Fetch): Promise<Link[] | undefined> {
  const s = getSession();
  if (!s || (s && !s.access_token)) {
    toast.error("session is timeout")
    await goto(AppRoute.ACCOUNT_LOGIN);
    return
  }


  let url = `${PUBLIC_API_ENDPOINT}/private/link/all/${s.account.id}`;
  const res = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${s.access_token}`
    }
  });
  if (!res.ok) {
    throw new Error('Can get links');
  }

  const result = await res.json();

  let linksList: Link[] = [];
  if (result[0]) {
    linksList = result[0];
    allLinks.set(linksList);
  } else {
    allLinks.set([]);
  }
  return linksList;
}
