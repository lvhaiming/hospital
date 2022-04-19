<template>
    <section class="content">
        <h3 class="page-title">{{ tit }}排班</h3>
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
                <Button @click="edit" v-if="isShow" icon="md-clipboard" type="primary" style="margin-left: 16px;">
                    编辑
                </Button>
            </FormItem>
        </Form>
        <SchedulingTable :title="title" :year="form.years" :month="form.months" :data="data" :dataNight="dataNight"></SchedulingTable>
    </section>
</template>

<script>
import { getMonthDays } from "@/lib/date";
import { sessionStorage } from '@/lib/until'
export default {
    props: {
        department: {
            default() {
                return ''
            }
        },
        tit: {
            default() {
                return ''
            }
        }
    },
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
            users: {}
        };
    },
    created () {
        this.init()
        this.users = sessionStorage.get('hospital_user')
    },
    computed: {
       isShow() {
           return this.users.posts == '1' && this.users.department == this.department
       } 
    },
    methods: {
        edit() {
            // this.$emit('edit')
            this.$router.push({ path: '/scheduling/edit', query: { department: this.department } })
        },
        init() {
            this.form.years = new Date().getFullYear()
            this.form.months = new Date().getMonth() + 1
            this.title = `${this.form.years}-${this.form.months}月${this.tit}排班`
            for(let i = 2010; i <= new Date().getFullYear(); i++) {
                this.yearArr.push(i)
            }
            for(let i = 1; i <= 12; i++) {
                this.monthArr.push(i)
            }
            this.getData()
        },
        getData() {
            this.$http.post("/scheduling/getScheduling", Object.assign(this.form, { department: this.department })).then((res) => {
                let data = res.data.data;
                this.year = data.years || this.form.years
                this.month = data.months || this.form.months
                this.data = data.scheduling || []
                this.dataNight = data.schedulingNight || []
                this.data.length = getMonthDays(this.year, this.month)
                this.dataNight.length = getMonthDays(this.year, this.month)
                this.title = `${this.form.years}-${this.form.months}月${this.tit}排班`
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