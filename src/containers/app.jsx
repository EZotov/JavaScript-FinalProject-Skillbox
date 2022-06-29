import React from 'react';
import {Switch, Route, Link, useHistory, useLocation} from "react-router-dom";
import Header from '../components/header.jsx';
import {Authorization, unsplash} from './authorization.jsx';
import Gallery from './gallery.jsx';
import {getCookie, setCookie, delCookie} from '../cookie.js';
import {loginRequest, getCurrentUserRequest, requestResultClear, setToken} from '../redux/actions.js';
import {useSelector, useDispatch} from 'react-redux';
import { logIn } from '../api.service';
import '../css/normalize.css';
import '../css/primarystyles.css';
import '../scss/app.scss';
import '../scss/media.scss';


function GalleryApp(props) {
  const state = useSelector((state) => state);
  const user = useSelector((state) => state.userInfo);
  const token = useSelector((state) => state.token);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  let authCode = window.location.search.split('code=')[1];

  const getUnsplashToken = (authCode) => {
    dispatch(loginRequest(authCode));
  };

  const onClickErrorCloseBtn = () => {
    dispatch(requestResultClear());
  };

  const saveCurrentUser = (unsplash) => {
    if (!state.userInfo) {
      dispatch(getCurrentUserRequest(unsplash));
    }
  };

  let result_token;

  React.useEffect(() => {
    if (result_token = getCookie('token')) {
      dispatch(setToken(result_token));
    }
    else if (authCode) {
      getUnsplashToken(authCode);
    }
    else {
      history.push('/auth');
    }
  }, []);

  React.useEffect(() => {
    if (user && !location.pathname.split('/')[2]) {
      history.push('/main');
    }
  }, [user]);

  React.useEffect(() => {
    if (token) {
      if (result_token !== token) {
        setCookie('token', token);
        result_token = token;
        unsplash.auth.setBearerToken(result_token);
        saveCurrentUser(unsplash);
      }
    }
  }, [token]);


  return (
    <div className="galleryApp">
      <Header state={state}/>
      <Route exact path='/auth'>
        <Authorization />
      </Route>

      <Route path="/main">
        <Gallery state={state}/>
      </Route>
      {
        state.errorMessage && (
          <div className ="errorContainer">
            <h2 className="errorContainer__headline">Ошибка</h2>
            <p className="errorContainer__errortext">{state.errorMessage}</p>
            <button aria-label="Закрыть окно ошибки" type="button" className="errorContainer__accept" onClick={onClickErrorCloseBtn}>ok</button>
          </div>
        )
      }
    </div>
  )
}

export default GalleryApp;
