var until = {
    // 处理sql语句的查询条件
    params: function (params, vague) {
        let count = [];
        for (let key in params) {
            if (params[key]) {
                if (vague && key === vague) {
                    count.push(key + ' like' + '"%' + params[key] + '%"')
                } else {
                    count.push(key + '=' + '"' + params[key] + '"')
                }
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