var connection = require('../mysql')
var until = require('../until')

class Patient {
    constructor() {
        this.connection = connection
    }

    // 病患管理-获取病患信息
    getPatientData(req, res) {
        let body = req.body // 获取参数
        let start = (body.pageNumber - 1) * body.pageSize || 0
        let end = body.pageSize || 10
        let params = {
            id: body.id || '',
            name: body.name || '',
            tel: body.tel || '',
            checkNum: body.checkNum || '',
            department: body.department || '',
            checkStatus: body.checkStatus || '',
            doctor: body.doctor || '',
            hospitalStatus: body.hospitalStatus || '',
            drugs: body.drugs || '',
            drugsNum: body.drugsNum || '',
            idCard: body.idCard || '',
            patientStatus: body.patientStatus || '',
            bedStatus: body.bedStatus || '',
        }
        let sql = until.params(params, 'name')
        let limit =  body.pageSize ? ` limit ${start},${end};` : ''
        let p = new Promise((resolve, reject) => {
            this.connection.query(`select * from patient ${sql}${limit}`, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    if (!params.id) {
                        result.map(item => {
                            this.connection.query(`select name from user where jobNum=${item.doctor};`, (err, res) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    item.doctorId = item.doctor
                                    item.doctor = res[0].name
                                }
                            })
                        })
                    }
                    resolve(result)
                }
            })
        })
        p.then(data => {
            this.connection.query(`select count(name) as total from patient ${sql};`, (err, result) => {
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

    // 病患管理-新增病患信息
    addPatientData(req, res) {
        let body = req.body
        let params = {
            name: body.name || '',
            age: body.age || '',
            sex: body.sex || '',
            department: body.department || '',
            startTime: body.startTime || '',
            endTime: body.endTime || '',
            native: body.native || '',
            tel: body.tel || '',
            address: body.address || "",
            doctor: body.doctor || "",
            diagnosis: body.diagnosis || "",
            cost: body.cost || "",
            advice: body.advice || '',
            remarks: body.remarks || '',
            drugs: body.drugs || '',
            idCard: body.idCard || '',
            category: body.category || '',
            checkNum: body.checkNum || '',
            checkStatus: body.checkStatus || '',
            drugs: body.drugs || '',
            drugsNum: body.drugsNum || '',
        }
        
        let sql = until.add(params)
        this.connection.query(`insert into patient${sql};`, (err, result) => {
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

    // 病患管理-编辑病患信息
    editPatientData(req, res) {
        let body = req.body
        let params = {
            name: body.name || '',
            age: body.age || '',
            sex: body.sex || '',
            department: body.department || '',
            startTime: body.startTime || '',
            endTime: body.endTime || '',
            native: body.native || '',
            tel: body.tel || '',
            address: body.address || "",
            doctor: body.doctor || "",
            diagnosis: body.diagnosis || "",
            cost: body.cost || "",
            advice: body.advice || '',
            remarks: body.remarks || '',
            drugs: body.drugs || '',
            idCard: body.idCard || '',
            category: body.category || '',
            checkStatus: body.checkStatus || '',
            hospitalStatus: body.hospitalStatus || '',
            drugsStatus: body.drugsStatus || '',
            drugs: body.drugs || '',
            drugsNum: body.drugsNum || '',
            patientStatus: body.patientStatus || '',
            room: body.room || '',
            floor: body.floor || '',
            bedNum: body.bedNum || '',
            bedStatus: body.bedStatus || '',
        }
        
        let sql = until.update(params)
        this.connection.query(`update patient set ${sql} where id=${body.id};`, (err, result) => {
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

    // 病患管理-删除病患信息
    deletePatientData(req, res) {
        let body = req.body
        this.connection.query(`delete from patient where id=${body.id};`, (err, result) => {
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
    
    // 获取所有住院的人数
    getPatientAll(req, res) {
        this.connection.query(`select department from patient where bedStatus="2";`, (err, result) => {
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

module.exports = Patient 