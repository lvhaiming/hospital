<template>
    <section class="content">
        <h3 class="page-title">床位记录</h3>
        <Form :model="form" :label-width="90" inline>
            <FormItem label="楼号">
                <Input v-model="form.floor" />
            </FormItem>
            <FormItem label="病房号">
                <Input v-model="form.room" />
            </FormItem>
            <FormItem label="床位等级">
                <Select clearable v-model="form.isVip" style="width:150px">
                    <Option value="1" key="1mns">VIP</Option>
                    <Option value="2" key="2msn">普通</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button @click="search(true)" icon="md-search" type="primary">
                    查询
                </Button>
            </FormItem>
        </Form>
        <Button @click="add" icon="md-add" type="primary" size="small">
            新增
        </Button>
        <HosTable
            @changeNo="search"
            :page="page"
            :columns="columns"
            :data="data"
        ></HosTable>
        <div class="chart" >
            <div id="chart" style="width:45%;height: 400px;"></div>
            <div id="chart2" style="width:45%;height: 400px;"></div>
        </div>
    </section>
</template>

<script>
import { PROFESSIONAL, DEPARTMENT } from "../../../lib/enums";
import { dateFormat } from "../../../lib/date";
const isVip = {
    '1': 'VIP',
    '2': '普通'
}
export default {
    data() {
        return {
            form: {
                floor: '',
                room: '',
                isVip: '',
            },
            page: {
                pageNumber: 1,
                pageSize: 10,
                totalCount: 100,
            },
            columns: [
                {
                    title: "楼号",
                    key: "floor"
                },
                {
                    title: "房间号",
                    key: "room"
                },
                {
                    title: "床位",
                    key: "bedNum"
                },
                {
                    title: "使用者",
                    key: "useName"
                },
                {
                    title: "床位等级",
                    key: "isVip",
                    render: (h, params) => {
                        return h("span", {}, isVip[params.row.isVip]);
                    },
                },
                {
                    title: "使用时间",
                    key: "startTime",
                    render: (h, params) => {
                        return h(
                            "span",
                            {},
                            dateFormat(params.row.useTime, "yyyy-MM-dd")
                        );
                    },
                },
                {
                    title: "操作",
                    key: "action",
                    fixed: "right",
                    width: 80,
                    render: (h, params) => {
                        return h("div", [
                            // h(
                            //     "Button",
                            //     {
                            //         props: {
                            //             type: "primary",
                            //             size: "small",
                            //         },
                            //         style: {
                            //             marginRight: "10px",
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.$router.push({ path: '/bed/bed/edit', query: { id: params.row.id } })
                            //             },
                            //         },
                            //     },
                            //     "编辑"
                            // ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small",
                                    },
                                    style: {
                                        // marginRight: "10px",
                                    },
                                    on: {
                                        click: () => {
                                            if (params.row.useName) {
                                                return this.$Message.error('此床位正在被使用');
                                            }
                                            this.$Modal.confirm({
                                                title: "提醒",
                                                content: `确认删除${params.row.floor}-${params.row.room}-${params.row.bedNum}的床位？`,
                                                cancelText: "取消",
                                                onOk: () => {
                                                    this.$http.post('/bed/deleteBedData', { id: params.row.id }).then(res => {
                                                        this.$Message.success(res.data.msg);
                                                        // 保存成功信息提示
                                                        this.search(true)
                                                    }).catch(() => {})
                                                },
                                            });
                                        },
                                    },
                                },
                                "删除"
                            ),
                        ]);
                    },
                },
            ],
            data: [],
            PROFESSIONAL,
            DEPARTMENT,
            department: [],
            professional: []
        };
    },
    created() {
        this.search();
        this.changeData()
        this.initEcharts()
    },
    activated () {
        this.search();
    },
    methods: {
        add() {
            this.$router.push({ path: '/bed/bed/add' })
        },
        initEcharts() {
            this.$nextTick(() => {
                this.setEcharts()
                this.setEchartsPatient()
            })
        },
        setEcharts() {
            this.$http.post("/bed/getBedAll", {}).then((res) => {
                let data = res.data
                var chartDom = document.getElementById('chart');
                var myChart = this.$echarts.init(chartDom);
                var option;

                option = {
                    title: {
                        text: '床位使用率',
                        left: 'center',
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    color: ['rgba(38, 230, 255, 1)', 'rgba(145, 204, 117, 0.8)'],
                    series: [
                        {
                            name: '使用率',
                            type: 'pie',
                            radius: '35%',
                            data: [
                                { value: data.use, name: '已使用' },
                                { value: data.noUse, name: '未使用' },
                            ],
                            itemStyle:{ 
                                normal:{ 
                                    label:{ 
                                        show: true, 
                                        formatter: '{b} : {c} ({d}%)' 
                                    }, 
                                    labelLine :{show:true} 
                                } 
                            }
                        }
                    ]
                };

                option && myChart.setOption(option);
            });
        },
        setEchartsPatient() {
            this.$http.post("/patient/getPatientAll", {}).then((res) => {
                let data = res.data.data
                let arr = []
                data.forEach(item => {
                    arr.push(item.department)
                })
                let obj = this.getArrNum(arr)
                let objKeys = Object.keys(obj)
                let objValues = Object.values(obj)
                let name = []
                this.department.forEach(item => {
                    objKeys.forEach(it => {
                        if(item.value == it) {
                            name.push(item.label)
                        }
                    }) 
                })
                let datas = []
                name.forEach((item, index) => {
                    datas.push({
                        name: item,
                        value: objValues[index]
                    })
                })
                var chartDom = document.getElementById('chart2');
                var myChart = this.$echarts.init(chartDom);
                var option;

                option = {
                    title: {
                        text: '住院部各科室患者人数百分比',
                        left: 'center',
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                            name: '使用率',
                            type: 'pie',
                            radius: '35%',
                            data: datas,
                            itemStyle:{ 
                                normal:{ 
                                    label:{ 
                                        show: true, 
                                        formatter: '{b} : {c} ({d}%)' 
                                    }, 
                                    labelLine :{show:true} 
                                } 
                            }
                        }
                    ]
                };

                option && myChart.setOption(option);
            });
        },
        getArrNum(arr) {
            let obj = {}
            arr.forEach(item => {
                if (obj[item]) {
                    obj[item]++
                } else {
                    obj[item] = 1
                }
            })
            return obj
        },
        search(flag) {
            if (flag) {
                this.page.pageNumber = 1
            }
            this.$http.post("/bed/getBedData", Object.assign(this.form, this.page)).then((res) => {
                this.data = res.data.data;
                this.page = res.data.page;
            });
        },
        changeData() {
            for (let key in this.DEPARTMENT) {
                this.department.push({
                    value: key,
                    label: this.DEPARTMENT[key]
                })
            }
            for (let key in this.PROFESSIONAL) {
                this.professional.push({
                    value: key,
                    label: this.PROFESSIONAL[key]
                })
            }
        }
    },
};
</script>

<style lang='less' scoped>
.chart {
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
}
</style>