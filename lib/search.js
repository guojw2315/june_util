"use strict";

exports.__esModule = true;
exports.bfs = bfs;
exports.dfs = dfs;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @description 广度优先遍历树形数组 - 循环实现
 */
function bfs(treeList, callback, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$childrenKey = _ref.childrenKey,
      childrenKey = _ref$childrenKey === void 0 ? 'children' : _ref$childrenKey,
      _ref$key = _ref.key,
      key = _ref$key === void 0 ? 'key' : _ref$key;

  var queue = [[]];
  var list = treeList;
  var level = 1;
  var parentKeyMap = {};

  while (queue.length) {
    var temp = [];

    for (var i = 0; i < list.length; i++) {
      var item = Object.create(list[i]);
      item._level = level;

      for (var _i = 0, _Object$keys = Object.keys(parentKeyMap); _i < _Object$keys.length; _i++) {
        var keyItem = _Object$keys[_i];
        var keyItemList = keyItem.split('_');

        if (level - 1 == keyItemList[0] && i >= +keyItemList[1] && i <= +keyItemList[2]) {
          item.parentKey = parentKeyMap[keyItem];
        }
      }

      if (item[childrenKey]) {
        parentKeyMap[level + "_" + temp.length + "_" + (temp.length + item[childrenKey].length - 1)] = item[key];
        temp = [].concat(temp, item[childrenKey]);
      }

      if (callback) {
        var isBreak = callback(_objectSpread(_objectSpread({}, item), list[i]), list[i]);
        if (isBreak) return;
      }

      if (i === list.length - 1) {
        level++;
        queue.splice(1, 0, temp);
      }
    }

    list = queue.pop();
  }
}
/**
 * @description 深度优先遍历树形数组 - 循环实现
 * @param {*} treeList [{key, name}, ...]
 * @param {*} callback ({key:T, name:dynamic, level:int, parentKey:T})
 */


function dfs(treeList, callback, _temp2) {
  var _ref2 = _temp2 === void 0 ? {} : _temp2,
      _ref2$childrenKey = _ref2.childrenKey,
      childrenKey = _ref2$childrenKey === void 0 ? 'children' : _ref2$childrenKey,
      _ref2$key = _ref2.key,
      key = _ref2$key === void 0 ? 'key' : _ref2$key;

  if (!treeList) return console.warn('target must be array');
  var queue = [[]];
  var list = treeList;
  var parentKeyMap = {};

  while (queue.length) {
    for (var i = 0; i < list.length; i++) {
      var item = Object.create(list[i]);
      item._level = queue.length;
      item.level = queue.length;
      if (parentKeyMap[item._level - 1]) item.parentKey = parentKeyMap[item._level - 1];

      if (callback) {
        var isBreak = callback(_objectSpread(_objectSpread({}, item), list[i]), list[i]);
        if (isBreak) return;
      }

      if (item[childrenKey]) {
        parentKeyMap[item._level] = item[key];
        queue.push(list.slice(i + 1));
        queue.push(item[childrenKey]);
        break;
      }
    }

    list = queue.pop();
  }
}
//# sourceMappingURL=search.js.map