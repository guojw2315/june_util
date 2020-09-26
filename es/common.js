function formatOfSymbol(num, syb, size) {
  if (num === void 0) {
    num = '';
  }

  if (syb === void 0) {
    syb = '';
  }

  if (size === void 0) {
    size = 0;
  }

  var numArr = num.toString().split('.');
  var arr = numArr[0].split('');

  if (!size) {
    return num;
  }

  for (var i = arr.length - 1, j = 1; i > 0; i--, j++) {
    if (j >= size) {
      arr.splice(i, 0, syb);
      j = 0;
    }
  }

  if (numArr[1]) {
    return arr.join('') + '.' + numArr[1];
  }

  return arr.join('');
}

var common = {
  formatOfSymbol: formatOfSymbol,
  formatPhone: function formatPhone(value) {
    return common.formatOfSymbol(value, ' ', 4);
  },
  formatMoney: function formatMoney(value) {
    return common.formatOfSymbol(value, ',', 3);
  },
  padLeftZero: function padLeftZero(num, zeroLen) {
    if (zeroLen === void 0) {
      zeroLen = 1;
    }

    var baseStr = '';

    for (var i = 0; i < zeroLen + 1; i++) {
      baseStr += '0';
    }

    return ("" + baseStr + num).substr(("" + num).length);
  }
};
export default common;
//# sourceMappingURL=common.js.map