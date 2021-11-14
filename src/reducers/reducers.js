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
  
    default:
      return state;
  }
};

export default reducer;
