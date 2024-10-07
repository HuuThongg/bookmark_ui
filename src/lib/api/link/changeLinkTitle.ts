
import { goto } from "$app/navigation";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import { AppRoute } from "$lib/constants";
import { editedLink } from "$lib/stores/link.store";
import { getSession } from "$lib/stores/user.store";

export async function changeLinkTitle(link_id: string, title: string) {
  const s = getSession();
  if (!s?.access_token) {
    await goto(AppRoute.ACCOUNT_LOGIN);
    return;
  }
  try {
    const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/link/changeTitle`, {
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
        link_title: title,
        link_id,
      })
    });
    if (!response.ok) {
      throw new Error("cannot update link title")
    }

    console.log("res", response)

    const result = await response.json();
    const newTitle = result[0]
    editedLink.update((link) => {
      return {
        ...link,
        link_title: newTitle,
      };
    });

  } catch (error) {

    console.error(error)
    if (error instanceof Error)
      throw new Error(error.message)
  }

}
