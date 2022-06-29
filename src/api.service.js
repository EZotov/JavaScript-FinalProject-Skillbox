import { unsplash } from './containers/authorization.jsx';

export const loadImages = (page, perPageItemsCount) => {
    return unsplash.photos.listPhotos(page, perPageItemsCount, 'latest');
}

export const logIn = (authCode) => {
  return unsplash.auth.userAuthentication(authCode);
};

export const getCurrentUser = (unsplash) => {
  return unsplash.currentUser.profile();
}
