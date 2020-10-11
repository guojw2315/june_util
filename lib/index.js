"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _request = _interopRequireWildcard(require("./request"));

exports.createRequest = _request["default"];
exports.setPosHeaders = _request.setPosHeaders;

var _search = require("./search");

exports.dfs = _search.dfs;
exports.bfs = _search.bfs;

var _common = _interopRequireDefault(require("./common"));

exports.common = _common["default"];

var _auth = require("./auth");

exports.getToken = _auth.getToken;
exports.setToken = _auth.setToken;
exports.getRefreshToken = _auth.getRefreshToken;
exports.setRefreshToken = _auth.setRefreshToken;
exports.getPosId = _auth.getPosId;
exports.setPosId = _auth.setPosId;
exports.clear = _auth.clear;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JuneUtil = _objectSpread(_objectSpread({}, _common["default"]), {}, {
  createRequest: _request["default"],
  getToken: _auth.getToken,
  setToken: _auth.setToken,
  getRefreshToken: _auth.getRefreshToken,
  setRefreshToken: _auth.setRefreshToken,
  getPosId: _auth.getPosId,
  setPosId: _auth.setPosId,
  setPosHeaders: _request.setPosHeaders,
  clear: _auth.clear,
  dfs: _search.dfs,
  bfs: _search.bfs
});

(function (window) {
  if (!window || window.$jutil) return;
  window.$jutil = JuneUtil;
})(void 0);

var _default = JuneUtil;
exports["default"] = _default;
//# sourceMappingURL=index.js.map