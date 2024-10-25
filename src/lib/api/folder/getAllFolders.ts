import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { AppRoute } from '$lib/constants';
import { getSession } from '$lib/stores/user.store';
import type { Fetch } from '$lib/types';
import type { Folder } from '$lib/types/folder';

export async function getAllFolders(fetch: Fetch): Promise<Folder[] | undefined> {
  const s = getSession();
  if (!s || (s && !s.access_token)) {
    await goto(AppRoute.ACCOUNT_LOGIN);
    return;
  }

  const getFoldersEndPoint = `${PUBLIC_API_ENDPOINT}/private/folder/all`;

  const response = await fetch(getFoldersEndPoint, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${s.access_token}`
    }
  });

  const result = await response.json();

  const folders: Folder[] = result[0];
  console.log("folders", folders)

  return folders;
}
