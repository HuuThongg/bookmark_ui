import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { RefreshToken } from '$lib/api/token/refreshToken';
import { setSession } from '$lib/stores/user.store';
import { getCookie } from '$lib/utils';
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async ({ parent }) => {
  await parent();
  const response = await fetch(`${PUBLIC_API_ENDPOINT}/public/refreshToken`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body data type must match "Content-Type" header
  });
  if (!response.ok) {
    console.log("err")
  }
  if (response.ok) {
    //const { access_token, refresh_token } = await response.json();
    const data = await response.json();

    const s = data[0];

    setSession(s);
  }
  return {
    title: 'login'
  };
};
