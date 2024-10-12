import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { AppRoute } from '$lib/constants';
import { editedLink, links } from '$lib/stores/link.store';
import { getSession } from '$lib/stores/user.store';

export async function addNote(link_id: string, note: string) {
  const s = getSession();
  if (!s?.access_token) {
    await goto(AppRoute.ACCOUNT_LOGIN);
    return;
  }
  try {
    const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/link/takeNote`, {
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
        link_id,
        note
      })
    });
    console.log('res', response);
    if (!response.ok) {
      throw new Error("Can not add note")
    }

    const result = await response.json();
    //link_id
    const newNote = result[0].link_notes
    const linkId = result[0].link_id
    links.update(l => l.map(link => link.link_id === linkId ? { ...link, link_notes: newNote } : link));

  } catch (error) {
    if (error instanceof Error)
      console.log(error.message)
    else {
      console.error("unexpected errrr ", error)
    }
  }
}
