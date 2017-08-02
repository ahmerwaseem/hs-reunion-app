import Cookies from 'universal-cookie';


export const deleteCookie = (name) => {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const getCookie = (name) => {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }

export const setCookie = (name, data, path) => {
    const cookies = new Cookies();
    cookies.set(name, data, { path: path });

}