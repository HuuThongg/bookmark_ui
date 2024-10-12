import { goto } from "$app/navigation";
import { PUBLIC_API_ENDPOINT } from "$env/static/public";
import { AppRoute } from "$lib/constants";
import { tagsForEachLinkStore } from "$lib/stores";
import { links } from "$lib/stores/link.store";
import { getSession } from "$lib/stores/user.store";

export async function addTag(link_id: string, tag_name: string) {
  const s = getSession();
  if (!s?.access_token) {
    await goto(AppRoute.ACCOUNT_LOGIN);
    return;
  }

  const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/tag`, {
    method: 'POST',
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
      link_id,
      tag_name,
    })
  });
  if (!response.ok) {
    throw new Error("can not add tag")
  }
  const result = await response.json();
  if (result[0].result) {

    const tag_id = result[0].tag.tag_id
    const linkId = result[0].tag.link_id

    links.update(l =>
      l.map(link =>
        link.link_id === linkId
          ? {
            ...link,
            tags: [...link.tags, { tag_id, tag_name }] // Add the new tag to the tags array
          }
          : link
      )
    );

    return result[0].tag
  } else {

    throw new Error("can not add tag")
  }
}

export async function removeTag(link_id: string, tag_id: string): Promise<Boolean> {
  const s = getSession();
  if (!s?.access_token) {
    await goto(AppRoute.ACCOUNT_LOGIN);
    return false;
  }

  const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/tag`, {
    method: 'DELETE',
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
      link_id,
      tag_id,
    })
  });
  if (!response.ok) {
    return false
  }

  const result = await response.json();
  const tag_id_to_remove = result[0]; // Assuming this is the tag_id you want to remove
  links.update(l =>
    l.map(link =>
      link.link_id === link_id
        ? {
          ...link,

          tags: link.tags.filter(tag => tag.tag_id !== tag_id_to_remove) // Remove the tag by filtering
        }
        : link
    )
  );


  return true;
}


export async function getTagsByLinkId(link_id: string) {
  const s = getSession();
  if (!s?.access_token) {
    await goto(AppRoute.ACCOUNT_LOGIN);
    return;
  }

  const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/tag?link_id=${link_id}`, {
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

  const result = await response.json();

  console.log("get tags", result[0])
  const tagsList = Array.isArray(result[0]) ?
    result[0].map((tag) => ({
      id: tag.tag_id.toString(),
      value: tag.tag_name
    })) : []
  tagsForEachLinkStore.set(tagsList)
  return result[0]
}




export async function addTagForLinks(linkIds: string[], tags: string[]) {
  const s = getSession();
  if (!s?.access_token) {
    await goto(AppRoute.ACCOUNT_LOGIN);
    return;
  }

  const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/tags`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${s.access_token}`
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      linkIds,
      tags,
    })
  });
  if (!response.ok) {
    throw new Error("can not add tag")
  }
  const result = await response.json();
  if (result[0].result) {
    return result[0].tag
  } else {

    throw new Error("can not add tag")
  }
}

export async function removeTagForLinks(linkIds: string[], tag_id: string): Promise<Boolean> {
  const s = getSession();
  if (!s?.access_token) {
    await goto(AppRoute.ACCOUNT_LOGIN);
    return false;
  }

  const response = await fetch(`${PUBLIC_API_ENDPOINT}/private/tags`, {
    method: 'DELETE',
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
      linkIds,
      tag_id,
    })
  });
  if (!response.ok) {
    return false
  }

  const result = await response.json();

  if (result[0].success != 'true') {
    return false
  }

  return true;
}


