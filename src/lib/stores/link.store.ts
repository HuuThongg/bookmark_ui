import type { Link, LinkSelectedChecboxType } from '$lib/types/link';
import { writable, derived } from 'svelte/store';

export const allLinks = writable<Link[]>([]);
export const allLinksLength = derived(allLinks, ($links) => $links.length)
export const trashLinks = writable<Partial<Link>[]>([]);

export const trashLinksLength = derived(
  trashLinks, ($trashLinks) => {
    if (!$trashLinks) {
      return 0
    }
    return $trashLinks.length
  }
);

export const links = writable<Link[]>([]);
export const editedLink = writable<Partial<Link>>()

export const linksFound = writable<Link[]>([]);

export const selectedLinkIdsToEdit = writable<string[]>([]);
export const checkboxLinkStore = derived(
  selectedLinkIdsToEdit,
  ($linkIds) => {
    const result: LinkSelectedChecboxType = {};
    $linkIds.forEach((linkId) => {
      result[linkId] = true;
    });
    return result;
  }
);

editedLink.subscribe((updatedLink) => {
  if (!updatedLink || !updatedLink.link_id) return;

  // Update the corresponding link in the links store
  links.update((allLinks) => {
    return allLinks.map((link) => {
      if (link.link_id === updatedLink.link_id) {
        return {
          ...link,
          ...updatedLink,
        };
      }
      return link;
    });
  });
});
