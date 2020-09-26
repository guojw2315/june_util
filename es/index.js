function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import createRequest, { setPosHeaders } from "./request";
import { dfs, bfs } from "./search";
import common from "./common";
import { getToken, setToken, getRefreshToken, setRefreshToken, getPosId, setPosId, clear } from "./auth";

var JuneUtil = _objectSpread(_objectSpread({}, common), {}, {
  createRequest: createRequest,
  getToken: getToken,
  setToken: setToken,
  getRefreshToken: getRefreshToken,
  setRefreshToken: setRefreshToken,
  getPosId: getPosId,
  setPosId: setPosId,
  setPosHeaders: setPosHeaders,
  clear: clear,
  dfs: dfs,
  bfs: bfs
});

(function (window) {
  if (window.$jutil) return;
  window.$jutil = JuneUtil;
})(window);

export { common, createRequest, getToken, setToken, getRefreshToken, setRefreshToken, getPosId, setPosId, setPosHeaders, clear, dfs, bfs };
export default JuneUtil;
//# sourceMappingURL=index.js.map