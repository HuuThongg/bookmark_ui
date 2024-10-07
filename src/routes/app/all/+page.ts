import { getAllLinks } from "$lib/api/link/getAllLinks";
import type { LayoutLoad } from "../$types";

export const load: LayoutLoad = async ({ parent, fetch }) => {
  await parent()
  await getAllLinks(fetch)
  return {
    title: 'shit',
  };
};
