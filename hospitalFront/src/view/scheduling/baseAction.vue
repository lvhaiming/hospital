<template>
    <section class="content">
        <h3 class="page-title">编辑{{ form.years }}年{{ form.months }}月{{ title }}排班</h3>
        <Form :model="form" :label-width="150" ref="message" style="margin-top: 20px;" online>
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
            DEPARTMENT
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
        init() {
            this.form.years = this.$route.query.years
            this.form.months = this.$route.query.months
            this.department = this.$route.query.department
            this.form.id = Number(this.$route.query.id)
            this.days = getMonthDays(this.form.years, this.form.months)
            for(let i = 2010; i <= new Date().getFullYear(); i++) {
                this.yearArr.push(i)
            }
            for(let i = 1; i <= 12; i++) {
                this.monthArr.push(i)
            }
            this.getDetail()
            this.getEveryDay()
            this.getUser()
        },
        getDetail() {
            this.$http.post("/scheduling/getJobNum", Object.assign(this.form, { department: this.department })).then((res) => {
                let data = res.data.data;
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
            let http = this.$route.query.mode == 'add' ? '/scheduling/addScheduling' : '/scheduling/editScheduling'
            this.$http.post(http, this.form).then((res) => {
                if (res.data.code === '0000') {
                    this.$Message.success(res.data.msg);
                    this.cancel()
                } else {
                    this.$Message.error(res.data.msg);
                }
            });
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