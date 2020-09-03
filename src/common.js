function formatOfSymbol(num = '', syb = '', size = 0) {
    let numArr = num.toString().split('.')

    let arr = numArr[0].split('');
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
        return arr.join('') + '.' + numArr[1]
    }
    return arr.join('')
}

const common = {
    formatOfSymbol: formatOfSymbol,

    formatPhone(value) {
        return common.formatOfSymbol(value, ' ', 4)
    },

    formatMoney(value) {
        return common.formatOfSymbol(value, ',', 3)
    },

    padLeftZero(num, zeroLen = 1) {
        let baseStr = '';
        for (let i = 0; i < zeroLen + 1; i++) {
            baseStr += '0';
        }
        return `${baseStr}${num}`.substr((`${num}`).length);
    },
}

export default common