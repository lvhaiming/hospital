var connection = require('../mysql')

class User {
    constructor() {
        this.connection = connection
    }

    // 获取菜单列表
    getMenus(req, res) {
        let professional = req.body.professional // 获取参数
        this.connection.query(`select * from menu;`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log('result :>> ', result);
                let data = []
                result.forEach(item => {
                    if (item.parentId) {
                        data.push(item)
                    }
                })
                // 整理菜单列表
                data.map(item => {
                    item.children = []
                    result.forEach(list => {
                        if (list.parent) {
                            if (list.parent == item.parentId) {
                                item.children.push(list)
                            }
                        }
                    })
                })
                let resultData = []
                data.forEach(item => {
                    if (item.auth.split(",").indexOf(professional) > -1) {
                        resultData.push(item)
                    }
                })
                res.send({
                    data: resultData,
                    code: '0000',
                    msg: 'ok'
                })
            }
        })
    }
}

module.exports = User 