function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import axios from 'axios';
import { getToken, setToken, getRefreshToken, getTokenState, setTokenState, getPosId, setRefreshToken } from './auth'; // 刷新 access_token 的接口

var _refreshToken = function refreshToken(instance, path, baseURL) {
  if (path === void 0) {
    path = '/refresh/token';
  }

  return instance.post(path + ("?refreshToken=" + getRefreshToken()), {
    refreshToken: getRefreshToken()
  }, {
    baseURL: baseURL
  }); // return instance.request({
  //     baseURL,
  //     url: path + `?refreshToken=${getRefreshToken()}`,
  //     method: 'post',
  //     data: { refreshToken: getRefreshToken() }
  // })
}; // 给请求头添加 access_token


var _setHeaderToken = function setHeaderToken(instance, isNeedToken, options) {
  if (options === void 0) {
    options = {};
  }

  var refreshToken = isNeedToken ? getRefreshToken() : null;
  var accessToken = isNeedToken ? getToken() : null;

  if (isNeedToken) {
    // api 请求需要携带 access_token
    var tokenLose = getTokenState();

    if (!refreshToken && !tokenLose) {
      console.log('不存在 access_token 则跳转回登录页');
      setTokenState(true);
      options.onTokenLose && options.onTokenLose();
    }

    instance.defaults.headers.common.Authorization = "Bearer " + accessToken;
    options.setHeaders && options.setHeaders(instance);
  }
};

export var setPosHeaders = function setPosHeaders(instance, key) {
  if (key === void 0) {
    key = 'x-shj-request-dept-pos-id';
  }

  instance.defaults.headers.common[key] = getPosId();
};
export default function create(config, options) {
  if (config === void 0) {
    config = {};
  }

  if (options === void 0) {
    options = {};
  }

  // 创建 axios 实例
  var instance = axios.create(_objectSpread({
    // baseURL: process.env.GATSBY_API_URL,
    // baseURL: '/api',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json'
    }
  }, config));
  var isRefreshing = false; // 标记是否正在刷新 token

  var requests = []; // 存储待重发请求的数组

  instance.interceptors.response.use(function (response) {
    return typeof options.onResponse === 'function' ? options.onResponse(response) : response;
  }, function (error) {
    if (!error.response) {
      return Promise.reject(error);
    }

    if (/^417$|^401$/g.test(error.response.status) && !error.config.url.includes('/auth/refresh')) {
      var _config = error.config;

      if (!isRefreshing) {
        isRefreshing = true;
        return _refreshToken(instance, options.refreshTokenPath, options.refreshURL || _config.baseURL).then(function (res) {
          var access_token = res.data[options.tokenKey || 'data'];
          var refresh_token = res.headers[options.refreshTokenKey || 'refresh_token'];
          setToken(access_token);
          setRefreshToken(refresh_token);
          _config.headers.Authorization = "Bearer " + access_token; // token 刷新后将数组的方法重新执行

          requests.forEach(function (cb) {
            return cb(access_token);
          });
          requests = []; // 重新请求完清空

          return instance(_config);
        })["catch"](function (err) {
          console.log('抱歉，您的登录状态已失效，请重新登录！');
          options.onTokenLose && options.onTokenLose();
          return Promise.reject(err);
        })["finally"](function () {
          isRefreshing = false;
        });
      } else {
        // 返回未执行 resolve 的 Promise
        return new Promise(function (resolve) {
          // 用函数形式将 resolve 存入，等待刷新后再执行
          requests.push(function (token) {
            _config.headers.Authorization = "Bearer " + token;
            resolve(instance(_config));
          });
        });
      }
    } else {
      options.onError && options.onError(error.response);
    }

    return Promise.reject(error);
  }); // 有些 api 并不需要用户授权使用，则无需携带 access_token；默认不携带，需要传则设置第三个参数为 true

  var get = function get(url, params, isNeedToken, headers) {
    if (params === void 0) {
      params = {};
    }

    if (isNeedToken === void 0) {
      isNeedToken = false;
    }

    if (headers === void 0) {
      headers = {};
    }

    _setHeaderToken(instance, isNeedToken, options);

    return instance({
      method: 'get',
      url: url,
      params: params,
      headers: _objectSpread(_objectSpread({}, instance.defaults.headers), headers)
    });
  };

  var post = function post(url, _ref, isNeedToken) {
    var _ref$data = _ref.data,
        data = _ref$data === void 0 ? {} : _ref$data,
        _ref$params = _ref.params,
        params = _ref$params === void 0 ? {} : _ref$params,
        _ref$headers = _ref.headers,
        headers = _ref$headers === void 0 ? {} : _ref$headers;

    if (isNeedToken === void 0) {
      isNeedToken = false;
    }

    _setHeaderToken(instance, isNeedToken, options);

    return instance({
      method: 'post',
      url: url,
      params: params,
      data: data,
      headers: _objectSpread(_objectSpread({}, instance.defaults.headers), headers)
    });
  };

  var put = function put(url, _ref2, isNeedToken) {
    var _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? {} : _ref2$data,
        _ref2$params = _ref2.params,
        params = _ref2$params === void 0 ? {} : _ref2$params,
        _ref2$headers = _ref2.headers,
        headers = _ref2$headers === void 0 ? {} : _ref2$headers;

    if (isNeedToken === void 0) {
      isNeedToken = false;
    }

    _setHeaderToken(instance, isNeedToken, options);

    return instance({
      method: 'put',
      url: url,
      params: params,
      data: data,
      headers: _objectSpread(_objectSpread({}, instance.defaults.headers), headers)
    });
  };

  var deleteReq = function deleteReq(url, _ref3, isNeedToken) {
    var _ref3$data = _ref3.data,
        data = _ref3$data === void 0 ? {} : _ref3$data,
        _ref3$params = _ref3.params,
        params = _ref3$params === void 0 ? {} : _ref3$params,
        _ref3$headers = _ref3.headers,
        headers = _ref3$headers === void 0 ? {} : _ref3$headers;

    if (isNeedToken === void 0) {
      isNeedToken = false;
    }

    _setHeaderToken(instance, isNeedToken, options);

    return instance({
      method: 'delete',
      url: url,
      params: params,
      data: data,
      headers: _objectSpread(_objectSpread({}, instance.defaults.headers), headers)
    });
  };

  return {
    instance: instance,
    get: get,
    post: post,
    put: put,
    deleteReq: deleteReq,
    setHeaderToken: function setHeaderToken() {
      return _setHeaderToken(instance, true, options);
    },
    refreshToken: function refreshToken(path) {
      return _refreshToken(instance, path || options.refreshTokenPath, options.refreshURL || config.baseURL);
    }
  };
}
//# sourceMappingURL=request.js.map