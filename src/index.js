import React from 'react';
import ReactDOM from 'react-dom';
import GalleryApp from './containers/app.jsx';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducers.js';
import {BrowserRouter as Router} from 'react-router-dom';

let initialState = {
  images: [],
  token : ''
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <GalleryApp/>
    </Router>
  </Provider>,
  document.querySelector('.app')
);
