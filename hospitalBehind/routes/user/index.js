var connection = require('../mysql')
var until = require('../until')

class User {
    constructor() {
        this.connection = connection
    }

    // 登录
    login(req, res) {
        let body = req.body
        let sql = ''
        if (body.username.length == 8) {
            sql = `select name,professional,tel,password,department,posts from user where jobNum=${body.username}`
        } else {
            sql = `select name,professional,tel,password,department,posts from user where tel=${body.username}`
        }
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length > 0) {
                    if (result[0].password == body.password) {
                        let message = result[0]
                        res.send({
                            name: message.name,
                            professional: message.professional,
                            department: message.department,
                            posts: message.posts,
                            code: '0000',
                            msg: '登录成功'
                        })
                    } else {
                        res.send({
                            code: '0001',
                            msg: '账号或密码错误'
                        })
                    }
                } else {
                    res.send({
                        code: '0001',
                        msg: '账号不存在，请联系管理员。'
                    })
                }
            }
        })
    }

    // 人员管理-用户管理-获取用户信息
    getUserData(req, res) {
        let body = req.body // 获取参数
        let start = (body.pageNumber - 1) * body.pageSize || 0
        let end = body.pageSize || 10
        let params = {
            id: body.id || '',
            name: body.name || '',
            tel: body.tel || '',
            jobNum: body.jobNum || '',
            professional: body.professional || '',
            department: body.department || ''
        }
        let sql = until.params(params, 'name')
        let p = new Promise((resolve, reject) => {
            this.connection.query(`select * from user ${sql} limit ${start},${end};`, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    resolve(result)
                }
            })
        })
        p.then(data => {
            this.connection.query(`select count(name) as total from user ${sql};`, (err, result) => {
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

    // 人员管理-用户管理-新增用户信息
    addUserData(req, res) {
        let body = req.body
        let params = {
            name: body.name || '',
            age: body.age || '',
            sex: body.sex || '',
            professional: body.professional || '',
            department: body.department || '',
            posts: body.posts || '',
            time: body.time || '',
            native: body.native || '',
            tel: body.tel || '',
            jobNum: body.jobNum || '',
            password: body.password || '',
            idCard: body.idCard || '',
        }
        let sql = until.add(params)
        this.connection.query(`insert into user${sql};`, (err, result) => {
            if (err) {
                console.log(err)
                let ms = ''
                if (err.sqlMessage.indexOf('jobNum') > -1) {
                    ms = '工号'
                } else {
                    ms = '手机号'
                }
                res.send({
                    code: err.errno,
                    msg: `新增失败，${ms}已存在`
                })
            } else {
                res.send({
                    code: '0000',
                    msg: '新增成功'
                })
            }
        })
    }

    // 人员管理-用户管理-编辑用户信息
    editUserData(req, res) {
        let body = req.body
        let params = {
            name: body.name || '',
            age: body.age || '',
            sex: body.sex || '',
            professional: body.professional || '',
            department: body.department || '',
            posts: body.posts || '',
            time: body.time || '',
            native: body.native || '',
            tel: body.tel || '',
            jobNum: body.jobNum || '',
            password: body.password || '',
            idCard: body.idCard || '',
        }
        let sql = until.update(params)
        this.connection.query(`update user set ${sql} where id=${body.id};`, (err, result) => {
            if (err) {
                console.log(err)
                res.send({
                    code: err.errno,
                    msg: '修改失败'
                })
            } else {
                res.send({
                    code: '0000',
                    msg: '修改成功'
                })
            }
        })
    }

    // 人员管理-用户管理-删除用户信息
    deleteUserData(req, res) {
        let body = req.body
        this.connection.query(`delete from user where id=${body.id};`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send({
                    code: '0000',
                    msg: '删除成功'
                })
            }
        })
    }
}

module.exports = User 