var until = {
    // 处理sql语句的查询条件
    params (params, vague, ifDoctor) {
        let count = [];
        let doctor = ''
        if (ifDoctor && !params.professional) {
            delete params.professional;
            doctor = "(professional='11' or professional='12')"
        }
        for (let key in params) {
            if (params[key]) {
                if (vague && key === vague) {
                    count.push(key + ' like' + '"%' + params[key] + '%"')
                } else {
                    count.push(key + '=' + '"' + params[key] + '"')
                }
            }
        }
        if (ifDoctor && count.length == 0) {
            return 'where '+ doctor
        }
        if (!ifDoctor && count.length == 0) {
            return ''
        }
        if (ifDoctor && count.length > 0 && !params.professional) {
            return 'where ' + count.join(' and ') + ' and ' + doctor
        }
        if (ifDoctor && count.length > 0 && params.professional) {
            return 'where ' + count.join(' and ') + doctor
        }
        if (!ifDoctor && count.length > 0) {
            return 'where ' + count.join(' and ') + doctor
        }
    },
    update (params) {
        let count = []
        for (let key in params) {
            count.push(key + '=' + '"' + params[key] + '"')
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