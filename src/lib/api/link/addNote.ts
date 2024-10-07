
import { goto } from "$app/navigation";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import { AppRoute } from "$lib/constants";
import { getSession } from "$lib/stores/user.store";

export async function addNote(link_id: string, note: string) {
  const s = getSession();
  if (!s?.access_token) {
    await goto(AppRoute.ACCOUNT_LOGIN);
    return;
  }

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
      note,
    })
  });
  console.log("res", response)

  const result = await response.json();

  console.log("add note res", result)
}
