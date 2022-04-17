var connection = require('../mysql')
var until = require('../until')

class User {
    constructor() {
        this.connection = connection
    }
    createPromise(jobNum) {
        var promise
        promise = new Promise(resolve => {
            this.connection.query(`select name from user where jobNum=${jobNum};`, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    if(res.length == 0) {
                        resolve('')
                    } else {
                        resolve(res[0].name)
                    }
                }
            })
        })
        return promise
    }
    // 排班管理-获取排班信息
    getScheduling(req, res) {
        let body = req.body // 获取参数
        let params = {
            years: body.years || '',
            months: body.months || '',
            department: body.department || ''
        }
        let sql = until.params(params, 'name')
        this.connection.query(`select * from scheduling ${sql};`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length == 0) {
                    res.send({
                        data: {
                            scheduling: [],
                            schedulingNight: [],
                        },
                        code: '0000',
                        msg: 'ok'
                    })
                    return
                }
                // console.log('result[0].scheduling :>> ', result[0].scheduling);
                // console.log('result[0].schedulingNight :>> ', result[0].schedulingNight);
                // if (!result[0].scheduling && !result[0].schedulingNight) {
                //     console.log('走这里')
                //     res.send({
                //         data: {
                //             scheduling: [],
                //             schedulingNight: [],
                //         },
                //         code: '0000',
                //         msg: 'ok'
                //     })
                //     return
                // }
                let data = []
                let dataName = []
                let dataLength = []
                let a = (result[0].scheduling && result[0].scheduling.length) > 0 ? result[0].scheduling.split(',') : ['0']
                a = a.map(item => {
                    return item.split('-')
                })
                a.forEach(item => {
                    dataLength.push(item.length)
                    item.forEach(it => {
                        data.push(it)
                    })
                })
                data.forEach(item => {
                    dataName.push(this.createPromise(item))
                })

                let dataNight = []
                let dataNameNight = []
                let dataLengthNight = []
                let aNight = (result[0].schedulingNight && result[0].schedulingNight.length) > 0 ? result[0].schedulingNight.split(',') : ['0']
                aNight = aNight.map(item => {
                    return item.split('-')
                })
                aNight.forEach(item => {
                    dataLengthNight.push(item.length)
                    item.forEach(it => {
                        dataNight.push(it)
                    })
                })
                dataNight.forEach(item => {
                    dataNameNight.push(this.createPromise(item))
                })

                Promise.all(dataName).then(rest => {
                    let da = rest
                    let dataCopy = []
                    dataLength.forEach(item => {
                        dataCopy.push(da.slice(0, item))
                        da.splice(0, item)
                    })
                    dataCopy = dataCopy.map(item => {
                        return item.join('\n')
                    })
                    result[0].scheduling = dataCopy

                    Promise.all(dataNameNight).then(restt => {
                        let daNight = restt
                        let dataCopyNight = []
                        dataLengthNight.forEach(item => {
                            dataCopyNight.push(daNight.slice(0, item))
                            daNight.splice(0, item)
                        })
                        dataCopyNight = dataCopyNight.map(item => {
                            return item.join('\n')
                        })
                        result[0].schedulingNight = dataCopyNight
                        res.send({
                            data: result[0] || {},
                            code: '0000',
                            msg: 'ok'
                        })
                    })
                })
            }
        })
    }

    // 排班管理-获取员工编号
    getJobNum(req,res) {
        let body = req.body // 获取参数
        let params = {
            years: body.years || '',
            months: body.months || '',
            department: body.department || ''
        }
        let sql = until.params(params, 'name')
        this.connection.query(`select * from scheduling ${sql};`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (result.length == 0) {
                    res.send({
                        data: {},
                        code: '0000',
                        msg: 'ok'
                    })
                    return
                }
                let a = (result[0].scheduling && result[0].scheduling.length) > 0 ? result[0].scheduling.split(',') : ['0']
                
                a = a.map(item => {
                    return item.split('-')
                })

                let aNight = (result[0].schedulingNight && result[0].schedulingNight.length) > 0 ? result[0].schedulingNight.split(',') : ['0']
                aNight = aNight.map(item => {
                    return item.split('-')
                })

                result[0].scheduling = a
                result[0].schedulingNight = aNight

                
                res.send({
                    data: result[0] || {},
                    code: '0000',
                    msg: 'ok'
                })
            }
        })
    }
    // 新增排班管理
    addScheduling(req, res) {
        let body = req.body
        let params = {
            years: body.years || '',
            months: body.months || '',
            department: body.department || '',
            scheduling: body.scheduling || '',
            schedulingNight: body.schedulingNight || '',
        }
        
        let sql = until.add(params)
        this.connection.query(`insert into scheduling${sql};`, (err, result) => {
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
    // 编辑排班管理
    editScheduling(req, res) {
        let body = req.body
        let params = {
            years: body.years || '',
            months: body.months || '',
            department: body.department || '',
            scheduling: body.scheduling || '',
            schedulingNight: body.schedulingNight || '',
        }
        
        let sql = until.update(params)
        this.connection.query(`update scheduling set ${sql} where id=${body.id};`, (err, result) => {
            if (err) {
                console.log(err)
                res.send({
                    code: err.errno,
                    msg: '编辑失败，请联系管理员'
                })
            } else {
                res.send({
                    code: '0000',
                    msg: '编辑成功'
                })
            }
        })
    }
}

module.exports = User 