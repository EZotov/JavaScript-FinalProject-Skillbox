import React from 'react';
import ReactDOM from 'react-dom';
import GalleryApp from './containers/app.jsx';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers/reducers.js';
import {BrowserRouter as Router} from 'react-router-dom';

let initialState = {
  images: [],
};

const store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <GalleryApp />
    </Router>
  </Provider>,
  document.querySelector('.app')
);
