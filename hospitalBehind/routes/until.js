var until = {
    // 处理sql语句的查询条件
    params: function (params) {
        let count = [];
        for (let key in params) {
            if (params[key]) {
                count.push(key + '=' + '"' + params[key] + '"')
            }
        }
        if (count.length == 0) {
            return ''
        } else {
            return 'where ' + count.join(' and ')
        }
    },
}

module.exports = until 