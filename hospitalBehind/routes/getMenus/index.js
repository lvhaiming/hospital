var connection = require('../mysql')

class User {
    constructor() {
        this.connection = connection
    }

    // 获取菜单列表
    getMenus(req, res) {
        let professional = req.body.professional // 获取参数
        let p = new Promise((resolve, reject) => {
            this.connection.query(`select * from professional where professional_id='${professional}';`, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    resolve(result[0].professional_auth.split(',')) // promise返回professional_auth处理后的数组
                }
            })
        })
        p.then(result => {
            this.connection.query(`select * from menu;`, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    let arr = []
                    result.forEach(item => {
                        data.forEach(list => {
                            if (item == list.id && list.parentId) {
                                arr.push(list) // arr接收有父级字段的菜单，并且菜单id存在result数组里面
                            }
                        })
                    })
                    arr.forEach(item => {
                        item.children = []
                        data.forEach(list => {
                            if (list.parent) {
                                if (list.parent == item.parentId) {
                                    item.children.push(list) // 给父级菜单添加子菜单
                                }
                            }
                        })
                    })
                    res.send({
                        data: arr,
                        code: '0000',
                        msg: 'ok'
                    })
                }
            })
        })
    }
}

module.exports = User 