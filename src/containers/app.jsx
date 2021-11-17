import React from 'react';
import {Switch, Route, Link, useHistory} from "react-router-dom";
import Header from '../components/header.jsx';
import {Authorization, unsplash} from './authorization.jsx';
import Gallery from './gallery.jsx';
import {getCookie,setCookie,delCookie} from '../cookie.js';
import {setUserInfo,requestResultClear} from '../redux/actions.js';
import {useSelector, useDispatch} from 'react-redux';
import '../css/normalize.css';
import '../css/primarystyles.css';
import '../scss/app.scss';
import '../scss/media.scss';


function GalleryApp(props) {
  const state = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();


  let authCode = window.location.search.split('code=')[1];

  //State Changers
  const setUser = (user) => {
    dispatch(setUserInfo(user));
  };

  let errorMessageConcate = '';
  if (state.errorMessage) {
    state.errorMessage.forEach((item, i) => {
      errorMessageConcate = item + ';';
    });
  }


  const onClickErrorCloseBtn = () => {
    dispatch(requestResultClear());
  };

  const getCurrentUser = (unsplash) => {
    if (!state.userInfo) {
      unsplash.currentUser.profile()
        .then(res => res.json())
        .then(res => {
          if (!res.errors) {
            setUser(res);
            history.push('/main');
          }
          else {
            console.log(res);
          }
        });
    }
  };

  let result_token;

  if (result_token = getCookie('token')) {
    unsplash.auth.setBearerToken(result_token);
    getCurrentUser(unsplash);
  }
  else if (authCode) {
    unsplash.auth.userAuthentication(authCode)
      .then(res => res.json())
      .then(resJSON => {
        result_token = resJSON.access_token;
        setCookie('token', result_token);
        unsplash.auth.setBearerToken(result_token);
        getCurrentUser(unsplash);
      })
      .catch(err => console.log('Auth err', err));
  }
  else {
      history.push('/auth');
  }

  return (
    <div className='galleryApp'>
      <Header state={state}/>
      <Route exact path='/auth'>
        <Authorization />
      </Route>

      <Route path='/main'>
        <Gallery state={state}/>
      </Route>
      {
        state.errorMessage ? (
          <div className ='errorContainer'>
            <h2 className='errorContainer__headline'>Ошибка</h2>
            <p className='errorContainer__errortext'>{errorMessageConcate}</p>
            <button aria-label='Закрыть окно ошибки' type='button' className='errorContainer__accept' onClick={() => onClickErrorCloseBtn()}>ok</button>
          </div>
        ): ''
      }
    </div>
  )
}

export default GalleryApp;
