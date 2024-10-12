import { getFolderLinks } from '$lib/api/folder/getFoldersLinks';
import { currentFolderAtSlug, folders, sortableFolderStore } from '$lib/stores/folder.store';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, params, fetch }) => {
  await parent();
  const folderID = params.slug;
  const linksList = await getFolderLinks(fetch, folderID);
  if (folderID) {
    const folder = get(sortableFolderStore).find((folder) => folder.folder_id == folderID);
    currentFolderAtSlug.set({
      folder_id: folderID,
      folder_name: folder?.folder_name ?? 'Folder Name'
    });
  }

  return { title: 'hello', slug: params.slug, linksList };
};
