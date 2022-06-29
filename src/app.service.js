import { unsplash } from './containers/authorization.jsx';

export const getAuthenticationUrl = (unsplashData) => {
  return unsplash.auth.getAuthenticationUrl([
          'public',
          'write_likes'
    ]);
  };
