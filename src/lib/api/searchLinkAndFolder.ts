
import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { AppRoute } from '$lib/constants';
import { searching } from '$lib/stores';
import { foldersFound } from '$lib/stores/folder.store';
import { linksFound } from '$lib/stores/link.store';
import { getSession } from '$lib/stores/user.store';
import type { Folder } from '$lib/types/folder';
import type { Link } from '$lib/types/link';

let l: Link[] = [];

let f: Folder[] = [];


export async function searchLinksAndFolders(searchPhrase: string) {
  searching.set(true);

  console.log("search string ", searchPhrase)
  const s = getSession();
  if (!s?.access_token) {
    await goto(AppRoute.ACCOUNT_LOGIN);
    return;
  }
  const searchLinksPromise = await fetch(`${PUBLIC_API_ENDPOINT}/private/link/searchLinks/${searchPhrase}`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${s.access_token}`
    }
  });

  const searchFoldersPromise = await fetch(
    `${PUBLIC_API_ENDPOINT}/private/folder/searchFolders/${searchPhrase}`,
    {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${s.access_token}`
      }
    }
  );
  console.log("hello")

  const searchResults = await Promise.all([searchLinksPromise, searchFoldersPromise]);

  const searchLinksRes = await searchResults[0].json();

  const searchFoldersRes = await searchResults[1].json();

  console.log("searchLinks", searchLinksRes)
  console.log("search folder", searchFoldersRes)
  l = searchLinksRes[0];

  f = searchFoldersRes[0];

  if (l !== null) {
    linksFound.set(l);
  } else {
    linksFound.set([]);
  }

  if (f !== null) {
    foldersFound.set(f);
  } else {
    foldersFound.set([]);
  }

  searching.set(false);
}
