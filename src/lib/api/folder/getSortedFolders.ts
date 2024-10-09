
import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { AppRoute } from '$lib/constants';
import { getSession } from '$lib/stores/user.store';
import type { Fetch } from '$lib/types';
import type { Folder, MinimalFolder } from '$lib/types/folder';

export async function getSortedFolders(fetch: Fetch): Promise<MinimalFolder[] | undefined> {
  const s = getSession();
  if (!s || (s && !s.access_token)) {
    await goto(AppRoute.ACCOUNT_LOGIN);
    return;
  }

  const getFoldersEndPoint = `${PUBLIC_API_ENDPOINT}/private/folder/getTreeFolders`;

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

  const folders: MinimalFolder[] = result[0];

  return folders;
}
