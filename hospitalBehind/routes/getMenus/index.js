var connection = require('../mysql')

class User {
    constructor() {
        this.connection = connection
    }

    // 获取菜单列表
    getMenus(req, res) {
        console.log('req :>> ', req.body);
        let professional = req.professional || '1' // 获取参数
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
                res.send({
                    data: data,
                    code: '0000',
                    msg: 'ok'
                })
            }
        })
    }
}

module.exports = User 