import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {unsplash} from '../containers/authorization.jsx';
import {disableScroll, enableScroll} from '../helpers/disable_scroll.js'
import {format} from 'date-fns';

let isFirst = false;
let isLast = false;

const Popup = (props) => {
  const {state, updatePhoto} = props;
  const location = useLocation();
  let id = location.pathname.split('image/')[1];

  let currentImage = state.images.find(item => item.id == id);
  let indexOfImage = state.images.indexOf(currentImage);

  let date = new Date(Date.parse(currentImage.created_at));
  let formatDate = format(date, 'dd.MM.yyyy');

  switch (indexOfImage) {
    case 0:
      isFirst = true;
      break;
    case state.images.length-1:
      isLast = true;
      break;
    default:
    isFirst = false;
    isLast = false;
  }

  React.useEffect(() => {
      disableScroll();
  });


  const closePopup = () => {
    enableScroll();
  };

  const toggleLike = (image) => {
    if (!image.liked_by_user) {
      unsplash.photos.likePhoto(image.id)
        .then(res => res.json())
        .then(res => {
          if (!res.error) {
            updatePhoto(res.photo);
          }
        });
    }
    else {
      unsplash.photos.unlikePhoto(image.id)
        .then(res => res.json())
        .then(res => {
          if (!res.error) {
            updatePhoto(res.photo);
          }
        });
    }
  };

  return (
    <div className='popupModal'>
      <div className='popupPhotoContainer'>
        {
          !isFirst ? (<Link to={state.images[indexOfImage-1].id} className='popupPhotoContainer__prevImage'></Link>) :''
        }
        {
          !isLast ? (<Link to={state.images[indexOfImage+1].id} className='popupPhotoContainer__nextImage'></Link>) : ''
        }
        {
          !isLast ? (
            <Link to={state.images[indexOfImage+1].id}>
              <picture>
                <source srcSet={currentImage.urls.small} media="(max-width: 1240px)"/>
                <img src={currentImage.urls.regular} className='popupPhotoContainer__image' alt={currentImage.description}/>
              </picture>
            </Link>
          ):(
            <picture>
              <source srcSet={currentImage.urls.small} media="(max-width: 1240px)"/>
              <img src={currentImage.urls.regular} className='popupPhotoContainer__image' alt={currentImage.description}/>
            </picture>
          )
        }
        <div className='photoInfoContainer'>
          <div className='photoOwnerInfo'>
            <picture>
              <source srcSet={currentImage.user.profile_image.small} media="(max-width: 576px)"/>
              <img src={currentImage.user.profile_image.medium} alt="Фото владельца"/>
            </picture>
            <div className='photoOwnerInfoWrapper'>
              <a aria-label='Профиль пользователя' className='photoOwnerInfoWrapper__link' href={currentImage.user.links.html} target='_blank'>{currentImage.user.name}</a>
              <span className='photoOwnerInfoWrapper__date'>{formatDate}</span>
            </div>
          </div>
          {
            currentImage.liked_by_user ? (<button aria-label='Мне нравится' className='likeBtn likeBtn_active' type='button' onClick={() => toggleLike(currentImage)}>{currentImage.likes}</button>)
            : (<button aria-label='Мне нравится' className='likeBtn' type='button' onClick={() => toggleLike(currentImage)}>{currentImage.likes}</button>)
          }

        </div>
      </div>
      <Link to='/main' className='popupPhotoContainer__closeLink' onClick={() => closePopup()}></Link>
    </div>
  );
};

export default Popup;
