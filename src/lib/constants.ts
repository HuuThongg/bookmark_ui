export enum AppRoute {
  ACCOUNT_LOGIN = '/account/login',
  ACCOUNT_SIGNUP = '/account/signup',
  ACCOUNT_LOST = '/account/lost',
  ACCOUNT_RECOVER = '/account/recover',
  SETTINGS_APP = '/settings',
  ALBUMS = '/albums',
  APP = '/app',
  APP_ALL = '/app/all'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export const metaInfo = {
  title: "Bookmarking",
  description: "Your page description goes here.",
  themeColor: "currentColor",
  imageUrl: "https://example.com/image.png", // Replace this with your actual image URL
  ogType: "website",
  twitterCard: "summary_large_image",
  externalDomain: "https://example.com", // Set your external domain here
};
