import { goto } from "$app/navigation";
import { authenticate } from "$lib/api/auth";
import { AppRoute } from "$lib/constants";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {

  await authenticate({ admin: true });
  await goto(AppRoute.APP_ALL)
  return {
    title: 'Bookmark'
  }
}
