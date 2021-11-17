const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':

    return {
      images: state.images,
      userInfo: action.info,
    };

    case 'ADD_IMAGES':
    return {
      images: [...state.images, ...action.images],
      userInfo:state.userInfo,
    };
    case 'CHANGE_IMAGEDATA':
    const newImages = state.images.map((item)=>{
      if (item.id === action.image.id) {
        return action.image;
      }
      return item;
    });
    return {
      images:newImages,
      userInfo:state.userInfo,
    };

    case 'REQUEST_SENDING':
    return {
      images:state.images,
      userInfo: state.userInfo,
      requestStatus:'sent',
    };
    case 'REQUEST_SUCCESS':
    return {
      images:state.images,
      userInfo: state.userInfo,
      requestStatus:'success',
    };
    case 'REQUEST_ERROR':
    return {
      images:state.images,
      userInfo: state.userInfo,
      requestStatus:'failure',
      errorMessage:action.errorMessage,
    };
    case 'ERROR_CLEAR':
    return {
      images:state.images,
      userInfo: state.userInfo,
    }

    default:
      return state;
  }
};

export default reducer;
