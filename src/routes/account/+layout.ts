import { goto } from '$app/navigation';
import { checkIfIsAuthenticated } from '$lib/api/auth';
import { AppRoute } from '$lib/constants';
import { getSession } from '$lib/stores/user.store';
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async () => {
  const s = getSession()
  //if (s?.access_token) {
  //  console.log("hello")
  //  const isLoggin = await checkIfIsAuthenticated(s.access_token);
  //  if (isLoggin) {
  //    await goto(AppRoute.APP);
  //  }
  //}
  return { title: 'Login' };
};
