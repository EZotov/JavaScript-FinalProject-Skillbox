import React from 'react';

function Header(props) {
  const {state} = props;

  let userInfo;
  if (!state.userInfo) {
    userInfo = '';
  }
  else {
    userInfo = state.userInfo.name;
  }

  return (
    <header className='header'>
      <div className='fixed-container headerContainer'>
        <h1 className='mainHeadline'>
          Unsplash
        </h1>
        <div className='personInfo'>
          <span className='personInfo__name'>{userInfo}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
