import type { Link } from '$lib/types/link';
import { getSession } from '$lib/stores/user.store';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { editedLink } from '$lib/stores/link.store';
import { toast } from 'svelte-sonner';
import { goto } from '$app/navigation';
import { AppRoute } from '$lib/constants';
import type { TreeItem1 } from '$lib/types';

export async function saveFolderSort(newSortedArray: TreeItem1[]) {
  const s = getSession();
  if (!s || (s && !s.access_token)) {
    toast.error('session is timeout');
    await goto(AppRoute.ACCOUNT_LOGIN);
    return;
  }
  newSortedArray.forEach(element => {
    console.log(element.folderInfo.folder_name, " : ", element.folderInfo.folder_order)
  });
  try {
    let url = `${PUBLIC_API_ENDPOINT}/private/folder/updateOrder`;
    const res = await fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${s.access_token}`
      },

      body: JSON.stringify({
        folders: newSortedArray.map((minimalFolder) => {
          return {
            folder_id: minimalFolder.folderInfo.folder_id,
            folder_order: minimalFolder.folderInfo.folder_order,
            subfolder_of: minimalFolder.folderInfo.subfolder_of
          };
        })
      })
    });
    if (!res.ok) {
      throw new Error('Cannot update folder order');
    }

    const result = await res.json();
    const a = result[0];
    console.log('update folder order', a);
  } catch (error) {
    console.error(error);
    throw new Error('Error: get a link');
  }
}
