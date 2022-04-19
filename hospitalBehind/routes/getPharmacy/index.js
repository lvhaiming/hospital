var connection = require('../mysql')
var until = require('../until')

class Pharmacy {
    constructor() {
        this.connection = connection
    }
    // 药品管理-获取药品信息
    getPharmacyData(req, res) {
        let body = req.body // 获取参数
        let start = (body.pageNumber - 1) * body.pageSize || 0
        let end = body.pageSize || 10
        let params = {
            id: body.id || '',
            name: body.name || '',
            prescription: body.prescription || '',
            type: body.type || ''
        }
        let sql = until.params(params, 'name')
        let p = new Promise((resolve, reject) => {
            this.connection.query(`select * from pharmacy ${sql} limit ${start},${end};`, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    resolve(result)
                }
            })
        })
        p.then(data => {
            this.connection.query(`select count(name) as total from pharmacy ${sql};`, (err, result) => {
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

    // 药品管理-新增药品信息
    addPharmacyData(req, res) {
        let body = req.body
        let params = {
            name: body.name || '',
            norms: body.norms || '',
            treatment: body.treatment || '',
            uses: body.uses || '',
            careful: body.careful || '',
            prescription: body.prescription || '',
            type: body.type || ''
        }
        let sql = until.add(params)
        this.connection.query(`insert into pharmacy${sql};`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send({
                    code: '0000',
                    msg: '新增成功'
                })
            }
        })
    }

    // 药品管理-编辑药品信息
    editPharmacyData(req, res) {
        let body = req.body
        let params = {
            name: body.name || '',
            norms: body.norms || '',
            treatment: body.treatment || '',
            uses: body.uses || '',
            careful: body.careful || '',
            prescription: body.prescription || '',
            type: body.type || ''
        }
        let sql = until.update(params)
        this.connection.query(`update pharmacy set ${sql} where id=${body.id};`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send({
                    code: '0000',
                    msg: '修改成功'
                })
            }
        })
    }

    // 药品管理-删除药品信息
    deletePharmacyData(req, res) {
        let body = req.body
        this.connection.query(`delete from pharmacy where id=${body.id};`, (err, result) => {
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

module.exports = Pharmacy 