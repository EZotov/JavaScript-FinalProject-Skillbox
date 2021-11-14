export const getCookie = (name) => {
  const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value, options) => {

  //+ 1 день от текущей даты
  let date = new Date(Date.now() + 86400e3);
  date = date.toUTCString();

  //если нет options
  if (!options) {
    options = {
      expires: date
    };
  }


  name = encodeURIComponent(name);
  value = encodeURIComponent(value);

  let updatedCookie = name + "=" + value;

  //добавляем свойства из объекта options
  for (let propName in options) {
      updatedCookie += "; " + propName;
      let propValue = options[propName];
      if (propValue !== true) {
          updatedCookie += "=" + propValue;
      }
  }

  document.cookie = updatedCookie;
};

export const delCookie = (name) => {
  setCookie(name, "", {
    'max-age': -1
  })
};
