import Cookies from "js-cookie";

// TOKEN CREDENTIAL
export const tokenKey = `${process.env.NODE_ENV}_admin_access_token`;
const expiredTokenKey = `${process.env.NODE_ENV}_admin_expired_token`;
const userInfoKey = `${process.env.NODE_ENV}_admin_info`;
const accessKey: string = `${process.env.NODE_ENV}_access_info`;


interface userInfoObj {
  user_id: number;
  username: string;
  status: number;
  role: number;
  employee: any;
  school: any;
}

export const getToken = () => Cookies.get(tokenKey) || "";

export const getExpired = () => Cookies.get(expiredTokenKey);

export const setCredential = ({ token, expired }:any): void => {
  Cookies.set(tokenKey, token);
  Cookies.set(expiredTokenKey, expired);
};

export const removeAuthCredential = () => {
  Cookies.remove(tokenKey);
  Cookies.remove(expiredTokenKey);
  Cookies.remove(userInfoKey);
};

export const setUserInfo = ({ data }:any): void => {
  Cookies.set(userInfoKey, data);
};

export const getUserInfo = () => {
  const user = Cookies.get(userInfoKey);
  const userInfo: userInfoObj = user ? JSON.parse(`${user}`) : {};
  return userInfo
}

export const setRememberMe = (email, password) => {
  Cookies.set(accessKey, JSON.stringify({email, password}));
}

export const getAccessRemember= () => {
  const access = Cookies.get(accessKey)
  const accessInfo = access ? JSON.parse(`${access}`) : {};
  return accessInfo
}

