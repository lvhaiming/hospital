export const page = () => {
    return {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 0
    }
}

export const sessionStorage = {
    _ss: window.sessionStorage,
    set: function (key, value) {
        // 删除对应的storge中对用的key
        if (value === null || !value) {
            return this.del(key)
        }
        // 如果value值不是Object类型，则直接设置到localStorage
        else if (typeof value !== 'object') {
            return this._ss.setItem(key, value)
        }
        // 如果value值是Object类型，则转化为字符串，再设置到localStorage
        return this._ss.setItem(key, JSON.stringify(value))
    },
    get: function (key) {
        return parseJson(this._ss.getItem(key))
    },
    del: function (key) {
        return key && this._ss.removeItem(key)
    },
    clear: function () {
        this._ss.clear()
    }
}

export const localStorage = {
    _ls: window.localStorage,
    set: function (key, value) {
        // 删除对应的storge中对用的key
        if (value === null || !value) {
            return this.del(key)
        }
        // 如果value值不是Object类型，则直接设置到localStorage
        else if (typeof value !== 'object') {
            return this._ls.setItem(key, value)
        }
        // 如果value值是Object类型，则转化为字符串，再设置到localStorage
        return this._ls.setItem(key, JSON.stringify(value))
    },
    get: function (key) {
        return parseJson(this._ls.getItem(key))
    },
    del: function (key) {
        return key && this._ls.removeItem(key)
    },
    clear: function () {
        this._ls.clear()
    }

}

export const parseJson = (obj) => {
    let result

    if (/^[0-9]*$/.test(obj)) {
        return obj
    }
    try {
        result = JSON.parse(obj)
        if (typeof (result) !== 'object') {
            return obj
        }
    } catch (e) {
        result = obj
    }
    return result
}