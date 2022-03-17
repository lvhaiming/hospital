var connection = require('../mysql')
var until = require('../until')

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
                                if (list.parent == item.parentId && result.indexOf(list.id.toString()) > -1) {
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

    // 获取所有菜单列表(无限制)
    getAllMenus(req, res) {
        this.connection.query(`select * from menu;`, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                let arr = []
                data.forEach(list => {
                    if (list.parentId) {
                        arr.push(list) // arr接收有父级字段的菜单，并且菜单id存在result数组里面
                    }
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
    }

    // 获取职称列表
    getPersonal (req, res) {
        let body = req.body // 获取参数
        let start = (body.pageNumber - 1) * body.pageSize || 0
        let end = body.pageSize || 10
        let professional = body.professional // 获取参数
        let params = {
            professional_id: professional || ''
        }
        let sql = until.params(params)
        let p = new Promise((resolve, reject) => {
            this.connection.query(`select * from professional ${sql} limit ${start},${end};`, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    resolve(result)
                }
            })
        })
        p.then(data => {
            this.connection.query(`select count(professional_id) as total from professional ${sql};`, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send({
                        data: data,
                        page: {
                            pageNumber: body.pageNumber,
                            pageSize: body.pageSize,
                            totalCount: JSON.parse(JSON.stringify(result))[0].total
                        },
                        code: '0000',
                        msg: 'ok'
                    })
                }
            })
        })
    }

    // 获取职称权限树
    getPersonalTree (req, res) {
        let body = req.body // 获取参数
        let professional = body.professional // 获取参数
        this.connection.query(`select * from professional where professional_id='${professional}';`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send({
                    data: result,
                    code: '0000',
                    msg: 'ok'
                })
            }
        })
    }

    // 修改权限
    updateAuth (req, res) {
        let body = req.body
        let professional = body.professional
        let auth = body.auth
        this.connection.query(`update professional set professional_auth='${auth}' where professional_id='${professional}';`, (err, result) => {
            if (err) {
                console.log(err)
                res.send({
                    code: err.errno,
                    msg: '修改失败，请联系管理员'
                })
            } else {
                res.send({
                    code: '0000',
                    msg: '修改成功'
                })
            }
        })
    }
}

module.exports = User 