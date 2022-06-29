const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        images:state.images,
        userInfo: state.userInfo,
        token : action.token
      }
    case 'MANUAL_SET_TOKEN':
      return {
        images:state.images,
        userInfo: state.userInfo,
        token : action.token
      }
    case 'SET_USER_INFO':

    return {
      images: state.images,
      userInfo: action.info,
      token : state.token
    };

    case 'ADD_IMAGES':
    return {
      images: [...state.images, ...action.images],
      userInfo:state.userInfo,
      token : state.token
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
      token : state.token
    };

    case 'REQUEST_SENDING':
    return {
      images:state.images,
      userInfo: state.userInfo,
      token : state.token,
      requestStatus:'sent',
    };
    case 'REQUEST_SUCCESS':
    return {
      images:state.images,
      userInfo: state.userInfo,
      token : state.token,
      requestStatus:'success',
    };
    case 'REQUEST_ERROR':
    return {
      images:state.images,
      userInfo: state.userInfo,
      token : state.token,
      requestStatus:'failure',
      errorMessage:action.errorMessage,
    };
    case 'ERROR_CLEAR':
    return {
      images:state.images,
      userInfo: state.userInfo,
      token : state.token,
    }

    default:
      return state;
  }
};

export default reducer;
