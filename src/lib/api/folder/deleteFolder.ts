import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { AppRoute } from '$lib/constants';
import { currentFolderAtSlug, folders, selectedFolders, sortableFolderStore } from '$lib/stores/folder.store';
import { getSession } from '$lib/stores/user.store';
import { toast } from 'svelte-sonner';


export async function deleteFolder(folder_ids: string[]) {
  const s = getSession();
  if (!s || (s && !s.access_token)) {
    toast.error('session is timeout');
    await goto(AppRoute.ACCOUNT_LOGIN);
    return;
  }
  try {

    const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/folder/deleteFoldersForever`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${s.access_token}`
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        folder_ids,
      }) // body data type must match "Content-Type" header
    });
    if (!response.ok) {
      throw new Error("Can delete Folder")
    }

    const result = await response.json();
    if (result[0].result === true) {
      toast.success("Folder deleted")
    }
    const folder_ids_deleted = result[0].folderIds as string[]
    currentFolderAtSlug.set(null);
    folder_ids
    sortableFolderStore.update((f) => f.filter((v) => !folder_ids_deleted.includes(v.folder_id)));
    folders.set([]);

    selectedFolders.set([]);
  } catch (error) {
    toast.error("Can delete folder")
  }

}
