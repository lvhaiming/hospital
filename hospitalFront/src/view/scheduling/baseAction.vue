<template>
    <section class="content">
        <h3 class="page-title">编辑{{ title }}排班</h3>
        <Form :model="form" :label-width="150" ref="message" style="margin-top: 20px;" :rules="formRules" online>
            <Row>
                <Col span="8">
                    <FormItem label="选择年份" prop="years">
                        <Select clearable v-model="form.years" style="width:150px" @on-change="getData">
                            <Option v-for="item in yearArr" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="选择月份"  prop="months">
                        <Select clearable v-model="form.months" style="width:150px" @on-change="getData">
                            <Option v-for="item in monthArr" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <FormItem v-for="(item, index) in days" :key="item + 's' + index" :label="item + '号(周' + weekDays[index] + ')'">
                <span>主班：</span>
                <Select clearable multiple v-model="scheduling[index]" style="width:40%">
                    <Option v-for="it in doctor" :value="it.jobNum" :key="it.jobNum + 'm'">{{ it.name }}</Option>
                </Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>晚班：</span>
                <Select clearable multiple v-model="schedulingNight[index]" style="width:40%">
                    <Option v-for="it in doctor" :value="it.jobNum" :key="it.jobNum + 'n'">{{ it.name }}</Option>
                </Select>
            </FormItem>
            <Row>
                <Col span="8">
                    <FormItem>
                        <Button @click="cancel" style="margin-right: 20px;">
                            取消
                        </Button>
                        <Button @click="submit" type="primary">
                            确定
                        </Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </section>
</template>

<script>
import { getMonthDays } from "../../lib/date";
import { DEPARTMENT } from "../../lib/enums";
export default {
    data() {
        return {
            form: {
                id: null,
                years: null,
                months: null,
                department: '1',
                scheduling: '',
                schedulingNight: ''
            },
            yearArr: [],
            monthArr: [],
            scheduling: [],
            schedulingNight: [],
            days: 0,
            weekDays: [],
            doctor: [],
            department: '',
            DEPARTMENT,
            formRules: {
                years: [{ required: true, message: '用户姓名不能为空' }],
                months: [{ required: true, message: '请输入登录密码' }],
            },
            mode: '',
            id: null
        };
    },
    created() {
        this.init()
    },
    computed: {
        title() {
            return DEPARTMENT[this.department]
        }
    },
    methods: {
        getData() {
            this.days = getMonthDays(this.form.years, this.form.months)
            this.getDetail()
            this.getEveryDay()
        },
        init() {
            this.form.years = new Date().getFullYear()
            this.form.months = new Date().getMonth() + 1
            this.department = this.$route.query.department
            for(let i = 2010; i <= new Date().getFullYear(); i++) {
                this.yearArr.push(i)
            }
            for(let i = 1; i <= 12; i++) {
                this.monthArr.push(i)
            }
            this.getData()
            this.getUser()
        },
        getDetail() {
            this.$http.post("/scheduling/getJobNum", Object.assign(this.form, { department: this.department })).then((res) => {
                let data = res.data.data;
                this.form.id = data.id || ''
                if (!this.form.id) {
                    this.mode = 'add'
                } else {
                    this.mode = 'edit'
                }
                this.scheduling = data.scheduling || []
                this.schedulingNight = data.schedulingNight || []
            });
        },
        getUser() {
            this.$http.post("/user/getUserData", { department: this.department }).then((res) => {
                this.$nextTick(() => {
                    this.doctor = res.data.data
                })
            });
        },
        submit() {
            this.$refs.message.validate((valid) => {
                if (valid){
                    let a = ['0']
                    let data = JSON.parse(JSON.stringify(this.scheduling))
                    let dataNight = JSON.parse(JSON.stringify(this.schedulingNight))
                    for(let i = data.length; i < this.days; i++) {
                        data.push(a)
                    }
                    for(let i = dataNight.length; i < this.days; i++) {
                        dataNight.push(a)
                    }
                    data = data.map(item => {
                        if (!item || item.length == 0) {
                            item = a
                        }
                        item = item.join('-')
                        return item
                    })
                    dataNight = dataNight.map(item => {
                        if (!item || item.length == 0) {
                            item = a
                        }
                        item = item.join('-')
                        return item
                    })
                    this.form.scheduling = data.join(',')
                    this.form.schedulingNight = dataNight.join(',')
                    let http = this.mode == 'add' ? '/scheduling/addScheduling' : '/scheduling/editScheduling'
                    this.$http.post(http, this.form).then((res) => {
                        if (res.data.code === '0000') {
                            this.$Message.success(res.data.msg);
                            this.cancel()
                        } else {
                            this.$Message.error(res.data.msg);
                        }
                    });
                }
            })
        },
        cancel() {
            this.$router.go(-1)
        },
        getEveryDay(){
            let weekDay = ['日', '一', '二', '三', '四', '五', '六']
            this.weekDays = []
            for(var i = 1; i <= this.days; i++){
                var week = new Date(this.form.years, this.form.months - 1, i).getDay();
                this.weekDays.push(weekDay[week])
            }
        },
    },
};
</script>

<style>
</style>