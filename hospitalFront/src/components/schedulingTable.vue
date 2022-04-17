<template>
    <section class="content">
        <h2>{{ title }}</h2>
        <div class="table">
            <div class="table-content">
                <div class="bold">日</div>
                <div v-for="item in days" :key="item + 'a'" class="bold"><span>{{ item }}</span></div>
            </div>
            <div class="table-content">
                <div class="bold">星期</div>
                <div v-for="(item, index) in weekDays" :key="index + 'b'" class="bold"><span>{{ item }}</span></div>
            </div>
            <div class="table-content">
                <div class="bold">主班</div>
                <div v-for="(item, index) in data" :key="index + 'b'" style="padding: 5px;"><span>{{ item }}</span></div>
            </div>
            <div class="table-content">
                <div class="bold">夜班</div>
                <div v-for="(item, index) in dataNight" :key="index + 'b'" style="padding: 5px;"><span>{{ item }}</span></div>
            </div>
        </div>
    </section>
</template>

<script>
import { getMonthDays } from "../lib/date";
export default {
    props: {
        title: {
            default() {
                return ''
            },
            type: String
        },
        year: {
            default() {
                return ''
            }
        },
        month: {
            default() {
                return ''
            }
        },
        data: {
            default() {
                return []
            },
            type: Array
        },
        dataNight: {
            default() {
                return []
            },
            type: Array
        }
    },
    data() {
        return {
            days: 0,
            weekDays: []
        };
    },
    mounted() {
        this.init()
    },
    watch: {
        title() {
            this.init()
        }
    },
    methods: {
        init() {
            this.days = getMonthDays(this.year, this.month)
            this.getEveryDay()
        },
        getEveryDay(){
            let weekDay = ['日', '一', '二', '三', '四', '五', '六']
            this.weekDays = []
            for(var i = 1; i <= this.days; i++){
                var week = new Date(this.year, this.month - 1, i).getDay();
                this.weekDays.push(weekDay[week])
            }
        },
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
            min-height: 40px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            word-break: keep-all
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