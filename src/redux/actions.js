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

const requestSend = () => {
  return {
    type: 'REQUEST_SENDING',
  }
};

const requestSuccess = (data) => {
  return {
    type: 'REQUEST_SUCCESS',
    data,
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
          if (!res.error) {
            dispatch(requestSuccess());
            dispatch(changeImageData(res.photo));
          }
          else {
            dispatch(requestFail(res.error));
            dispatch(changeImageData(sourceImage));
          }
        });
    }
    else {
      image.liked_by_user = false;
      image.likes = image.likes - 1;
      dispatch(changeImageData(image));
      unsplash.photos.unlikePhoto(image.id)
        .then(res => res.json())
        .then(res => {
          if (!res.error) {
              dispatch(requestSuccess());
              dispatch(changeImageData(res.photo));
          }
          else {
            dispatch(requestFail(res.error));
            dispatch(changeImageData(sourceImage));
          }
        });
    }
  };

};


export {setUserInfo, addImages, changeImageData,setLikeStatus,requestResultClear};
