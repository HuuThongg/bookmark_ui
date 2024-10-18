import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import {
  getSession,
  preferences as preferences$,
  resetSavedUser,
  session,
  user as user$
} from '$lib/stores/user.store';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { AppRoute } from '$lib/constants';
import { RefreshToken } from '../token/refreshToken';
import { fade } from 'svelte/transition';

export interface AuthOptions {
  admin?: true;
  public?: true;
}

export const loadUser = async () => {
  try {
    let user = get(user$);
    let preferences = get(preferences$);

    //if (!user && hasAuthCookie()) {
    //	const user = await getMyUser();
    //	user$.set(user);
    //	//preferences$.set(preferences);
    //}
    return user;
  } catch {
    return null;
  }
};

export const authenticate = async (options?: AuthOptions) => {
  const { public: publicRoute, admin: adminRoute } = options || {};
  const user = await loadUser();
  if (publicRoute) {
    return;
  }

  if (!user) {
    redirect(302, AppRoute.ACCOUNT_LOGIN);
  }
  const s = getSession();
  if (!s || (s && !s.access_token)) {
    redirect(302, AppRoute.ACCOUNT_LOGIN);
  }

  const isLoggin = await checkIfIsAuthenticated(s.access_token);
  if (!isLoggin) {
    redirect(302, AppRoute.ACCOUNT_LOGIN);
  }
  //if (adminRoute && user) {
  //  console.log("das")
  //  redirect(302, AppRoute.APP);
  //}
};

export async function checkIfIsAuthenticated(access_token: string): Promise<boolean> {
  console.log("check")
  const response = await fetch(`${PUBLIC_API_ENDPOINT}/public/checkIfIsAuthenticated`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
      //authorization: `Bearer${get(session).access_token}`
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      token: access_token
    }) // body data type must match "Content-Type" header
  });
  const result = await response.json();
  console.log('checkIfIsAuthenticated result', result);
  console.log('checkIfIsAuthenticated response status', response.status);
  if (result.message !== 'user logged in') {
    await RefreshToken(getSession()?.access_token);

    //return false;
  }
  return true;
}

export const handleLogout = async (redirectUri: string) => {
  try {
    if (redirectUri.startsWith('/')) {
      goto(redirectUri, { replaceState: true });
    } else {
      window.location.href = redirectUri;
      window.history.replaceState(null, '', redirectUri);
      window.location.reload();
    }
  } finally {
    resetSavedUser();
  }
};

export async function getMyUser() {
  try {
    const response = await fetch(`${PUBLIC_API_ENDPOINT}/public/account/signin`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred during signup');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Error connecting to the server.');
  }
}
const hasAuthCookie = (): boolean => {
  if (!browser) {
    return false;
  }

  for (const cookie of document.cookie.split('; ')) {
    const [name] = cookie.split('=');
    if (name === 'is_authenticated') {
      return true;
    }
  }
  return false;
};
