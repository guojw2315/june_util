import Cookies from 'js-cookie';
var TOKEN_KEY = 'access_token';
var REGRESH_TOKEN_KEY = 'refresh_token';
var POS_ID_KEY = 'x-shj-request-dept_pos_id';
var tokenLose = false;
export var getToken = function getToken() {
  return Cookies.get(TOKEN_KEY);
};
export var setToken = function setToken(token, params) {
  if (params === void 0) {
    params = {};
  }

  Cookies.set(TOKEN_KEY, token, params);
  setTokenState(false);
};
export var getRefreshToken = function getRefreshToken() {
  return Cookies.get(REGRESH_TOKEN_KEY);
};
export var setRefreshToken = function setRefreshToken(token) {
  Cookies.set(REGRESH_TOKEN_KEY, token);
};
export var getPosId = function getPosId() {
  return Cookies.get(POS_ID_KEY);
};
export var setPosId = function setPosId(id) {
  Cookies.set(POS_ID_KEY, id);
};
export var setTokenState = function setTokenState(flag) {
  if (flag === void 0) {
    flag = false;
  }

  tokenLose = flag;
};
export var getTokenState = function getTokenState() {
  return tokenLose;
};
export var clear = function clear() {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REGRESH_TOKEN_KEY);
  Cookies.remove(POS_ID_KEY);
};
//# sourceMappingURL=auth.js.map