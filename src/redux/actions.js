import { loadImages, logIn, getCurrentUser } from '../api.service';

const setUserInfo = (info) => {
  return {
    type: 'SET_USER_INFO',
    info,
  };
};

const addImages = (images) => {
 return {
   type: 'ADD_IMAGES',
   images,
 }
};

const changeImageData = (image) => {
  return {
    type: 'CHANGE_IMAGEDATA',
    image,
  };
};

const loginRequestSuccess = (token) => {
  return {
    type: 'SET_TOKEN',
    token,
  };
};

const setToken = (token) => {
  return {
    type: 'MANUAL_SET_TOKEN',
    token,
  };
};

const requestSend = () => {
  return {
    type: 'REQUEST_SENDING',
  }
};

const requestSuccess = (data) => {
  return {
    type: 'REQUEST_SUCCESS'
  }
};

const requestFail = (errorMessage) => {
  return {
    type: 'REQUEST_ERROR',
    errorMessage,
  }
};

const requestResultClear = () => {
  return {
    type: 'ERROR_CLEAR',
  }
};

//Async Actions
const setLikeStatus = (unsplash, image) => {
  return (dispatch) => {
    const sourceImage = Object.assign({}, image);
    if (!image.liked_by_user) {
      image.liked_by_user = true;
      image.likes = image.likes + 1;
      dispatch(changeImageData(image));
      dispatch(requestSend());
      unsplash.photos.likePhoto(image.id)
        .then(res => res.json())
        .then(res => {
          dispatch(requestSuccess());
          dispatch(changeImageData(res.photo));
        })
        .catch(error => {
          dispatch(requestFail(error));
          dispatch(changeImageData(sourceImage));
        });
    }
    else {
      image.liked_by_user = false;
      image.likes = image.likes - 1;
      dispatch(changeImageData(image));
      unsplash.photos.unlikePhoto(image.id)
        .then(res => res.json())
        .then(res => {
            dispatch(requestSuccess());
            dispatch(changeImageData(res.photo));
        })
        .catch(error => {
          dispatch(requestFail(error));
          dispatch(changeImageData(sourceImage));
        });
    }
  };

};

const addImagesRequest = (page, perPageItemsCount) => {
  return (dispatch) => {
    loadImages(page, perPageItemsCount)
      .then(result => result.json())
      .then(result => {
        if (!result.errors) {
          dispatch(addImages(result));
        }
      })
      .catch(error => dispatch(requestFail(error)))
  };
};

const loginRequest = (authCode) => {
  return (dispatch) => {
    logIn(authCode)
      .then(result => result.json())
      .then(result => {
        if (!result.errors) {
          dispatch(loginRequestSuccess(result.access_token));
        }
      })
      .catch(error =>
        dispatch(requestFail(error)));
  };
};

const getCurrentUserRequest = (unsplash) => {
  return (dispatch) => {
    getCurrentUser(unsplash)
      .then(result => result.json())
      .then(result => {
        if (!result.errors) {
          return dispatch(setUserInfo(result));
        }
      })
      .catch(error => dispatch(requestFail(error)));
  };
};


export {changeImageData,setLikeStatus,requestResultClear, addImagesRequest, loginRequest, getCurrentUserRequest, setToken};
