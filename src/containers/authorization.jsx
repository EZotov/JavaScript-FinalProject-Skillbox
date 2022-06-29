import React from 'react';
import Unsplash from 'unsplash-js';
import { getAuthenticationUrl } from '../app.service';


const keys = {
    accessKey: 'MlV7TRtdIrVCCBWecniVm_0y58A7p59Z4U0EMm8sLfU',
    secretkey: 'ux6cUoSqlzYy583Oy6N0ca-irY0_gK4RTrS38oYbSNo',
    callbackUrl: 'http://localhost:8000'
}

 const unsplash = new Unsplash({
    accessKey: keys.accessKey,
    secret: keys.secretkey,
    callbackUrl: keys.callbackUrl
});

function Authorization() {
  const authenticationUnsplash = (unsplash) => {
    const authenticationUrl = getAuthenticationUrl(unsplash);
    window.location.assign(authenticationUrl);
  }

  return (
    <div className="authorizationBlock">
      <button className="authorizationBlock__button" onClick={(event)=>{authenticationUnsplash(unsplash);}}>Авторизация</button>
    </div>
  );
}

export {Authorization, unsplash} ;
