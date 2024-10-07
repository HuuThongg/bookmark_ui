import type { Link } from '$lib/types/link';
import { getSession } from '$lib/stores/user.store';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { allLinks, editedLink } from '$lib/stores/link.store';
import { toast } from 'svelte-sonner';
import { goto } from '$app/navigation';
import { AppRoute } from '$lib/constants';
import type { Fetch } from '$lib/types';

export async function getSingleLink(fetch: Fetch, link_id: string): Promise<Link[] | undefined> {
  const s = getSession();
  if (!s || (s && !s.access_token)) {
    toast.error("session is timeout")
    await goto(AppRoute.ACCOUNT_LOGIN);
    return
  }

  try {
    let url = `${PUBLIC_API_ENDPOINT}/private/link/${link_id}`;
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
    const link = result[0]
    editedLink.set(link)
    return link;

  } catch (error) {
    console.error(error);
    throw new Error('Error: get a link');

  }
}
