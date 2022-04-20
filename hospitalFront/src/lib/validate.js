/**
 * 字符输入校验校验
 * create by zhangguangde
 *
 */

 const validator = {
    /*
		测试校验
	*/
    // 电话号码
    isMobile: (rule, value, callback) => {
        if (value) {
            if (/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
                return callback()
            } else {
                return callback(new Error(rule.message))
            }
        } else {
            return callback()
        }
    },
    // 身份证号
    isCard: (rule, value, callback) => {
        if (value) {
            if (/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
                return callback()
            } else {
                return callback(new Error(rule.message))
            }
        } else {
            return callback()
        }
    },
    // 年龄
    isAge: (rule, value, callback) => {
        if (value) {
            if (/^([1-9]\d?|1[01]\d|120)$/.test(value)) {
                callback()
            } else {
                return callback(new Error(rule.message))
            }
        } else {
            return callback()
        }
    },
    // 价格
    isPrice: (rule, value, callback) => {
        if (value) {
            if (/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/.test(value)) {
                callback()
            } else {
                return callback(new Error(rule.message))
            }
        } else {
            return callback()
        }
    }

}

export default validator
