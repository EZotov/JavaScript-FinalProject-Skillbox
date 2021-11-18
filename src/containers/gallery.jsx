import React from 'react';
import {unsplash} from './authorization.jsx';
import Popup from '../components/popup.jsx';
import {Switch, Route, Link,useHistory} from "react-router-dom";
import {addImages, changeImageData} from '../redux/actions.js';
import {useSelector, useDispatch} from 'react-redux';
import Masonry from 'react-masonry-component';
import {format} from 'date-fns';

let page = 1;
const perPageItemsCount = 20;
let photos;
let isLoadingImagesEnable = false;
let idFromPrevAppUpdate='';

let moreImagesBtn;
let imagesListElem;
let positionYImagesListElem;


const getCoordsOfElement = (elem) => {
  const element = elem.getBoundingClientRect();

  return {
    top: element.top + window.scrollY,
    left: element.left + window.scrollX
  };
}


function Gallery(props) {
  const {state} = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = React.useRef(null);

  let galleryHeight;

  //State Changers
  const addPhotos = (photos) => {
    dispatch(addImages(photos));
  };


  const loadMoreImages = () => {
    page++;
    unsplash.photos.listPhotos(page, perPageItemsCount, 'latest')
      .then(res => res.json())
      .then(res => {
          if (!res.errors) {
             photos = res;
             addPhotos(photos);
          }
          else {
             console.log(res);
          }
      });

  };

   if (location.pathname.split('image/')[1]) {
     idFromPrevAppUpdate = location.pathname.split('image/')[1];
   }


  //Запрос первого запуска
  if (!state.images.length && state.userInfo) {
    unsplash.photos.listPhotos(page, perPageItemsCount, 'latest')
      .then(res => res.json())
      .then(res => {
          if (!res.errors) {
             photos = res;
             addPhotos(photos);
          }
          else {
            console.log(res.errors);
          }
      });
  }



  React.useEffect(() => {
    setTimeout(() => {
      galleryHeight =  ref.current.clientHeight;
      positionYImagesListElem = getCoordsOfElement(ref.current).top + galleryHeight;
      isLoadingImagesEnable = true;
    },1000);

    //Поиск элемента при наличии сссылки на элемент
    if (state.images.length) {
      if (idFromPrevAppUpdate) {
        let findedItem = state.images.find(item => item.id == idFromPrevAppUpdate);
        if (!findedItem) {
          loadMoreImages();
        }
        else {
          history.push('/main/image/' + idFromPrevAppUpdate);
          idFromPrevAppUpdate = '';
        }
      }
    }

  });




  window.onscroll = (event) => {
    let bottomWindowBorder = window.scrollY + window.innerHeight;
    if (bottomWindowBorder >= positionYImagesListElem) {
      if (isLoadingImagesEnable) {
        isLoadingImagesEnable = false;
        //Поучаем фотки
        loadMoreImages();
      }
    }
  };

  return (
    <main className='main'>
      <div className='galleryContainer'>
        <div className='galleryBlock'  ref={ref}>
          <div className='fixed-container'>
            <Masonry className='imageList'
              elementType={'ul'}
              options={{isOriginTop: true, isFitWidth: true, gutter: 10}}>
              {
                state.images.map((image) => {
                  return (
                    <li key={image.id} className='imageListItem'>
                      <Link to={'main/image/' + image.id} className='imageListItemWrapLink'>
                        <img className='imageListItem__image' src={image.urls.small} alt={image.description}/>
                      </Link>
                      <div className='imageListItemHoverBlock'>
                        <a aria-label='Профиль владельца' className='imageListItemHoverBlock__link' target='_blank' href={image.user.links.html}>{image.user.name}</a>
                        <span className='imageListItemHoverBlock__likes'>{image.likes}</span>
                        <span className='imageListItemHoverBlock__date'>{format(new Date(Date.parse(image.created_at)), 'dd.MM.yyyy')}</span>
                      </div>
                    </li>
                  );
                })
              }
            </Masonry>
          </div>
        </div>
        <button aria-label='Загрузить больше изображений' className='galleryContainer__button' type='button' onClick={() => loadMoreImages()}>Загрузить ещё</button>
      </div>

      <Route path='/main/image'>
        <Popup state={state} />
      </Route>
    </main>
  );
}



export default Gallery;
