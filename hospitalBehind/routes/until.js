var until = {
    // 处理sql语句的查询条件
    params (params, vague) {
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
    update (params) {
        let count = []
        for (let key in params) {
            if (params[key]) {
                count.push(key + '=' + '"' + params[key] + '"')
            }
        }
        if (count.length == 0) {
            return ''
        } else {
            return count.join(',')
        }
    },
    add (params) {
        let keyCount = []
        let valueCount = []
        keyCount = Object.keys(params)
        for (let key in params) {
            valueCount.push(`"${params[key]}"`)
        }
        return `(${keyCount.join(',')}) values(${valueCount.join(',')})`
    }
}

module.exports = until 