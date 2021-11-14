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



export {setUserInfo, addImages, changeImageData};
