
import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { AppRoute } from '$lib/constants';
import { editedLink } from '$lib/stores/link.store';
import { getSession } from '$lib/stores/user.store';

export async function changeLinkDesc(link_id: string, link_desc: string) {
  const s = getSession();
  if (!s?.access_token) {
    await goto(AppRoute.ACCOUNT_LOGIN);
    return;
  }
  try {
    const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/link/changeLinkDesc`, {
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
        link_desc,
        link_id
      })
    });
    if (!response.ok) {
      throw new Error('cannot update link title');
    }

    const result = await response.json();
    const newDesc = result[0];
    editedLink.update((link) => {
      return {
        ...link,
        description: newDesc
      };
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) throw new Error(error.message);
  }
}
