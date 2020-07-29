export default {
    formatOfSymbol(value, gap, s) {
        let arr = value.split('')
        for (var i = arr.length - 1, j = 1; i > 0; i--, j++) {
            if (j % gap === 0) {
                arr[i] = s + arr[i]
            }
        }
        return arr.join('')
    },

    formatPhone (value) {
        return formatOfSymbol(value, 4, ' ')
    },

    formatMoney (value) {
        return formatOfSymbol(value, 3, ',')
    }
}