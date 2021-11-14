import React from 'react';
import Unsplash from 'unsplash-js';


const keys = {
    accessKey: "MlV7TRtdIrVCCBWecniVm_0y58A7p59Z4U0EMm8sLfU",
    secretkey: "ux6cUoSqlzYy583Oy6N0ca-irY0_gK4RTrS38oYbSNo",
    callbackUrl: "http://localhost:8000"
}

 const unsplash = new Unsplash({
    accessKey: keys.accessKey,
    secret: keys.secretkey,
    callbackUrl: keys.callbackUrl
});

function Authorization() {
  const authenticationUnsplash = (unsplash) => {
      // Генерирует ссылку для авторизации с указанными правами
      const authenticationUrl = unsplash.auth.getAuthenticationUrl([
          "public",
          "write_likes"
      ]);

      window.location.assign(authenticationUrl); // Перенапревление на авторизацию в unsplash
  }

  return (
    <div className='authorizationBlock'>
      <button className="authorizationBlock__button" onClick={(event)=>{authenticationUnsplash(unsplash);}}>Авторизация</button>
    </div>
  );
}

export {Authorization, unsplash} ;
