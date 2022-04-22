var connection = require('../mysql')
var until = require('../until')

class Bed {
    constructor() {
        this.connection = connection
    }

    // 床位管理-获取床位信息
    getBedData(req, res) {
        let body = req.body // 获取参数
        let start = (body.pageNumber - 1) * body.pageSize || 0
        let end = body.pageSize || 10
        let params = {
            id: body.id || '',
            floor: body.floor || '',
            room: body.room || '',
            bedNum: body.bedNum || '',
            useName: body.useName || '',
            isVip: body.isVip || ''
        }
        let sql = until.params(params)
        let limit =  body.pageSize ? ` limit ${start},${end};` : ''
        let p = new Promise((resolve, reject) => {
            this.connection.query(`select * from bed ${sql}${limit}`, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    if (!params.id) {
                        result.map(item => {
                            if (item.useName) {
                                this.connection.query(`select name from patient where id=${item.useName};`, (err, res) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        item.userId = item.useName
                                        item.useName = res.length > 0 ? res[0].name : ''
                                    }
                                })
                            }
                        })
                    }
                    resolve(result)
                }
            })
        })
        p.then(data => {
            this.connection.query(`select count(id) as total from bed ${sql};`, (err, result) => {
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
    // 床位管理-获取床位信息
    getBedAll(req, res) {
        this.connection.query(`select * from bed;`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                let use = 0
                let noUse = 0
                let a = result || []
                a.forEach(item => {
                    if (item.useName) {
                        use++
                    } else {
                        noUse++
                    }
                })
                res.send({
                    use: use,
                    noUse: noUse,
                    code: '0000',
                    msg: 'ok'
                })
            }
        })
        // let body = req.body // 获取参数
        // let start = (body.pageNumber - 1) * body.pageSize || 0
        // let end = body.pageSize || 10
        // let params = {
        //     id: body.id || '',
        //     floor: body.floor || '',
        //     room: body.room || '',
        //     bedNum: body.bedNum || '',
        //     useName: body.useName || '',
        //     isVip: body.isVip || ''
        // }
        // let sql = until.params(params)
        // let limit =  body.pageSize ? ` limit ${start},${end};` : ''
        // let p = new Promise((resolve, reject) => {
        //     this.connection.query(`select * from bed ${sql}${limit}`, (err, result) => {
        //         if (err) {
        //             console.log(err)
        //         } else {
        //             if (!params.id) {
        //                 result.map(item => {
        //                     this.connection.query(`select name from patient where id=${item.useName};`, (err, res) => {
        //                         if (err) {
        //                             console.log(err)
        //                         } else {
        //                             item.useName = res.length > 0 ? res[0].name : ''
        //                         }
        //                     })
        //                 })
        //             }
        //             resolve(result)
        //         }
        //     })
        // })
        // p.then(data => {
        //     this.connection.query(`select count(id) as total from bed ${sql};`, (err, result) => {
        //         if (err) {
        //             console.log(err)
        //         } else {
        //             res.send({
        //                 data: data,
        //                 page: {
        //                     pageNumber: body.pageNumber,
        //                     pageSize: body.pageSize,
        //                     totalCount: JSON.parse(JSON.stringify(result))[0].total
        //                 },
        //                 code: '0000',
        //                 msg: 'ok'
        //             })
        //         }
        //     })
        // })
    }

    // 床位管理-新增床位信息
    addBedData(req, res) {
        let body = req.body
        let params = {
            floor: body.floor || '',
            room: body.room || '',
            bedNum: body.bedNum || '',
            useName: body.useName || '',
            isVip: body.isVip || ''
        }
        
        let sql = until.add(params)
        this.connection.query(`insert into bed${sql};`, (err, result) => {
            if (err) {
                console.log(err)
                res.send({
                    code: err.errno,
                    msg: '新增失败，请联系管理员'
                })
            } else {
                res.send({
                    code: '0000',
                    msg: '新增成功'
                })
            }
        })
    }

    // 床位管理-编辑床位信息
    editBedData(req, res) {
        let body = req.body
        let params = {
            useName: body.useName || '',
            useTime: body.useTime || '',
        }
        let sql = until.update(params)
        this.connection.query(`update bed set ${sql} where floor=${body.floor} and room=${body.room} and bedNum=${body.bedNum};`, (err, result) => {
            if (err) {
                console.log(err)
                res.send({
                    code: err.errno,
                    msg: '安排失败'
                })
            } else {
                res.send({
                    code: '0000',
                    msg: '安排成功'
                })
            }
        })
    }

    // 床位管理-删除床位信息
    deleteBedData(req, res) {
        let body = req.body
        this.connection.query(`delete from bed where id=${body.id};`, (err, result) => {
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

    // 获取所有楼号
    getFloor(req, res) {
        this.connection.query(`select distinct floor from bed where useName="";`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log('result :>> ', result);
                res.send({
                    data: result,
                    code: '0000',
                    msg: '成功'
                })
            }
        })
    }

    // 获取所有房间号
    getRoom(req, res) {
        let body = req.body
        this.connection.query(`select distinct room from bed where floor=${body.floor} and useName="";`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send({
                    data: result,
                    code: '0000',
                    msg: '成功'
                })
            }
        })
    }

    // 获取所有床位号
    getBedNum(req, res) {
        let body = req.body
        this.connection.query(`select bedNum from bed where floor=${body.floor} and room=${body.room} and useName="";`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send({
                    data: result,
                    code: '0000',
                    msg: '成功'
                })
            }
        })
    }
}

module.exports = Bed 