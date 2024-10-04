import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { AppRoute } from '$lib/constants';
import { getSession } from '$lib/stores/user.store';
import type { Folder } from '$lib/types/folder';

export async function getRootFoldersOnly(): Promise<Folder[] | undefined> {
  const s = getSession();

  if (!s?.access_token) {
    return undefined; // Return undefined and let the caller handle the redirection
  }

  const getFoldersEndPoint = `${PUBLIC_API_ENDPOINT}/private/folder/getRootFoldersByUserID`;

  try {
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
      throw new Error(`Failed to fetch folders: ${response.statusText}`);
    }

    const result = await response.json();
    const folders: Folder[] = Array.isArray(result[0]) ? result[0] : [];

    return folders;

  } catch (error) {
    console.error("Error fetching root folders:", error);
    return undefined;
  }
}
