"use strict";

exports.__esModule = true;
exports.clear = exports.getTokenState = exports.setTokenState = exports.setPosId = exports.getPosId = exports.setRefreshToken = exports.getRefreshToken = exports.setToken = exports.getToken = void 0;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TOKEN_KEY = 'access_token';
var REGRESH_TOKEN_KEY = 'refresh_token';
var POS_ID_KEY = 'x-shj-request-dept_pos_id';
var tokenLose = false;

var getToken = function getToken() {
  return _jsCookie["default"].get(TOKEN_KEY);
};

exports.getToken = getToken;

var setToken = function setToken(token, params) {
  if (params === void 0) {
    params = {};
  }

  _jsCookie["default"].set(TOKEN_KEY, token, params);

  setTokenState(false);
};

exports.setToken = setToken;

var getRefreshToken = function getRefreshToken() {
  return _jsCookie["default"].get(REGRESH_TOKEN_KEY);
};

exports.getRefreshToken = getRefreshToken;

var setRefreshToken = function setRefreshToken(token) {
  _jsCookie["default"].set(REGRESH_TOKEN_KEY, token);
};

exports.setRefreshToken = setRefreshToken;

var getPosId = function getPosId() {
  return _jsCookie["default"].get(POS_ID_KEY);
};

exports.getPosId = getPosId;

var setPosId = function setPosId(id) {
  _jsCookie["default"].set(POS_ID_KEY, id);
};

exports.setPosId = setPosId;

var setTokenState = function setTokenState(flag) {
  if (flag === void 0) {
    flag = false;
  }

  tokenLose = flag;
};

exports.setTokenState = setTokenState;

var getTokenState = function getTokenState() {
  return tokenLose;
};

exports.getTokenState = getTokenState;

var clear = function clear() {
  _jsCookie["default"].remove(TOKEN_KEY);

  _jsCookie["default"].remove(REGRESH_TOKEN_KEY);

  _jsCookie["default"].remove(POS_ID_KEY);
};

exports.clear = clear;
//# sourceMappingURL=auth.js.map