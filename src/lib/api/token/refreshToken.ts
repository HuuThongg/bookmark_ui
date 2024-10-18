import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import { goto } from '$app/navigation';
import { type Session } from '$lib/types/session';
import { getSession, resetSavedUser, setSession } from '$lib/stores/user.store';
import { AppRoute } from '$lib/constants';

export const RefreshToken = async (s: Partial<Session>) => {
  const response = await fetch(`${PUBLIC_API_ENDPOINT}/public/refreshToken`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      refresh_token: s.refresh_token
    }) // body data type must match "Content-Type" header
  });
  if (response.ok) {
    //const { access_token, refresh_token } = await response.json();
    const data = await response.json();
    console.log('data in refresh_token', data);
    s = data[0];

    setSession(s);
    //setSession({
    //  ...getSession(),
    //  access_token,
    //  refresh_token
    //});
  } else {
    resetSavedUser();
  }
  //const data = await response.json();
  //
  //if (data.message) {
  //  // handle this error
  //  console.log(data.message);
  //  await goto(AppRoute.ACCOUNT_LOGIN);
  //  return;
  //}
  //
  //s = data[0];
  //
  //if (s === null) return;
  //
  //setSession(s);
};
