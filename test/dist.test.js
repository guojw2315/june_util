let jutil = require('../dist/jutil.js')

// 打包以后的测试，需要先build
test('dist test', () => {
    console.log(jutil.formatPhone(1827119573))
    console.log(jutil.formatMoney('12031293.3423'))
})