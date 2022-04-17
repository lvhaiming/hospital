<template>
    <section class="content">
        <h3 class="page-title">急诊科排班</h3>
        <Form :model="form" :label-width="90" inline>
            <FormItem label="选择年份">
                <Select clearable v-model="form.years" style="width:150px">
                    <Option v-for="item in yearArr" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </FormItem>
            <FormItem label="选择月份">
                <Select clearable v-model="form.months" style="width:150px">
                    <Option v-for="item in monthArr" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button @click="getData" icon="md-search" type="primary">
                    查询
                </Button>
            </FormItem>
        </Form>
        <Button @click="edit" type="primary" size="small">
            编辑
        </Button>
        <SchedulingTable :title="title" :year="form.years" :month="form.months" :data="data" :dataNight="dataNight"></SchedulingTable>
    </section>
</template>

<script>
import { getMonthDays } from "../../../lib/date";
export default {
    data() {
        return {
            title: '',
            yearArr: [],
            monthArr: [],
            data: [],
            dataNight: [],
            form: {
                years: null,
                months: null
            },
            year: null,
            month: null,
            mode: 'edit',
            id: null
        };
    },
    created () {
        this.init()
    },
    methods: {
        edit() {
            this.$router.push({ path: '/scheduling/emergency/edit', query: { years: this.year, months: this.month, mode: this.mode, id: this.id } })
        },
        init() {
            this.form.years = new Date().getFullYear()
            this.form.months = new Date().getMonth() + 1
            this.title = `${this.form.years}-${this.form.months}月急诊科排班`
            for(let i = 2010; i <= new Date().getFullYear(); i++) {
                this.yearArr.push(i)
            }
            for(let i = 1; i <= 12; i++) {
                this.monthArr.push(i)
            }
            this.getData()
        },
        getData() {
            this.$http.post("/scheduling/getScheduling", Object.assign(this.form, { department: '1' })).then((res) => {
                let data = res.data.data;
                if (!data.scheduling) {
                    this.mode = 'add'
                } else {
                    this.mode = 'edit'
                }
                this.year = data.years || this.form.years
                this.month = data.months || this.form.months
                this.id = data.id || null
                this.data = data.scheduling || []
                this.dataNight = data.schedulingNight || []
                this.data.length = getMonthDays(this.year, this.month)
                this.dataNight.length = getMonthDays(this.year, this.month)
                this.title = `${this.form.years}-${this.form.months}月急诊科排班`
            });
        }
    },
};
</script>

<style lang='less' scoped>
h2 {
    text-align: center;
    margin: 20px 0;
}
.table {
    border: 1px solid #ccc;
    overflow: scroll;
    font-size: 14px;
    .table-content {
        display: flex;
        width: 100%;
        div {
            flex-shrink: 0;
            border-right: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            width: 80px;
            height: 40px;
            line-height: 40px;
            text-align: center;
        }
        div:nth-last-child(1) {
            border-right: 0;
        }
        .bold {
            font-weight: bold;
        }
    }
}
</style>