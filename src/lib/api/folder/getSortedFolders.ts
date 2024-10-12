import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { AppRoute } from '$lib/constants';
import { folderName, sortableFolderStore } from '$lib/stores/folder.store';
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
  if (!response.ok) {
    throw new Error('can not get tree folders');
  }

  const result = await response.json();
  const folders: MinimalFolder[] | null = result[0];
  if (!folders) return undefined;
  sortableFolderStore.set(folders)
  console.log("folders sorted", folders)

  //if (folders.length > 0) {
  //	sortableFolderStore.set(folders.sort((a, b) => a.folder_sort - b.folder_sort));
  //}

  return folders;
}
