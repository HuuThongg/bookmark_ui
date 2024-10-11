import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { AppRoute } from '$lib/constants';
import { getSession } from '$lib/stores/user.store';
export async function fetchPage(url: string) {
  const s = getSession();
  if (!s?.access_token) {
    await goto(AppRoute.ACCOUNT_LOGIN);
    return;
  }
  try {
    const response = await fetch(`${PUBLIC_API_ENDPOINT}/public/proxy?url=${url}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${s.access_token}`
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer',
    });
    if (!response.ok) {
      throw new Error('cannot update link title');
    }

    const pageContent = await response.text();
    return pageContent
  } catch (error) {
    console.error(error);
    if (error instanceof Error) throw new Error(error.message);
  }
}
