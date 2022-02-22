var connection = require('../mysql')
var until = require('./../until')

class User {
    constructor() {
        this.connection = connection
    }

    // 登录
    login(req, res) {
        let body = req.body
        this.connection.query(`select name,professional,tel,password from user where tel=${body.username}`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length > 0) {
                    if (result[0].password == body.password) {
                        let message = result[0]
                        res.send({
                            name: message.name,
                            professional: message.professional,
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
        console.log('req :>> ', req.body);
        let body = req.body // 获取参数
        let start = (body.pageNumber - 1) * body.pageSize
        let end = body.pageNumber * body.pageSize
        let params = {
            name: body.name,
            tel: body.tel,
            professional: body.professional,
            department: body.department
        }
        let sql = until.params(params)
        console.log('start :>> ', start);
        console.log('end :>> ', end);
        let p = new Promise((resolve, reject) => {
            this.connection.query(`select * from user ${sql} limit ${start},${end}`, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    resolve(result)
                }
            })
        })
        p.then(data => {
            this.connection.query("select count(name) as total from user", (err, result) => {
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

        let sql = `insert into user(name, age, sex, professional, department, time, native, tel, password) values(${body.name}, ${body.age}, ${body.sex}, ${body.professional}, ${body.department}, ${body.time}, ${body.native}, ${body.tel}, ${body.password}});`
        this.connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send({
                    code: '0000',
                    msg: '新增成功'
                })
            }
        })
        // let insertData = () => {
        //     let p = new Promise((resolve, reject) => {
        //         let sql = `insert into user(name, age, sex, professional, department, time, native, tel, password) values(${body.name}, ${body.age}, ${body.sex}, ${body.professional}, ${body.department}, ${body.time}, ${body.native}, ${body.tel}, ${body.password}});`
        //         this.connection.query(sql, (err, result) => {
        //             if (err) {
        //                 console.log(err)
        //             } else {
        //                 resolve(result)
        //             }
        //         })
        //     })
        //     return p
        // }

        // let deleteId = () => {
        //     let p = new Promise((resolve, reject) => {
        //         let sql = `alter table user drop column id;`
        //         this.connection.query(sql, (err, result) => {
        //             if (err) {
        //                 console.log(err)
        //             } else {
        //                 resolve(result)
        //             }
        //         })
        //     })
        //     return p
        // }

        // let addId = () => {
        //     let p = new Promise((resolve, reject) => {
        //         let sql = `alter table user add id int(11) not null primary key auto_increment first;`
        //         this.connection.query(sql, (err, result) => {
        //             if (err) {
        //                 console.log(err)
        //             } else {
        //                 resolve(result)
        //             }
        //         })
        //     })
        //     return p
        // }

        // Promise.all([insertData, deleteId, addId]).then((resolve, reject) => {
        //     res.send({
        //         code: '0000',
        //         msg: '新增成功'
        //     })
        // })
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