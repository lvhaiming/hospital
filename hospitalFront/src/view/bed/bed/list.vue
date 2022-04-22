<template>
    <section class="content">
        <h3 class="page-title">就诊记录</h3>
        <!-- <Form :model="form" :label-width="90" inline>
            <FormItem label="病患姓名">
                <Input v-model="form.name" />
            </FormItem>
            <FormItem label="手机号码">
                <Input v-model="form.tel" />
            </FormItem>
            <FormItem label="住院状态">
                <Select clearable v-model="form.hospitalStatus" style="width:150px">
                    <Option :value="1" key="1mn">已入院</Option>
                    <Option :value="2" key="2mn">已出院</Option>
                </Select>
            </FormItem>
            <FormItem label="就诊状态">
                <Select clearable v-model="form.patientStatus" style="width:150px">
                    <Option :value="1" key="1mns">未就诊</Option>
                    <Option :value="2" key="2msn">已就诊</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button @click="search(true)" icon="md-search" type="primary">
                    查询
                </Button>
            </FormItem>
        </Form> -->
        <!-- <Button @click="add" icon="md-add" type="primary" size="small">
            新增
        </Button> -->
        <HosTable
            @changeNo="search"
            :page="page"
            :columns="columns"
            :data="data"
        ></HosTable>
        <div id="chart" style="width: 600px;height: 400px;"></div>
    </section>
</template>

<script>
import { SEX, PROFESSIONAL, DEPARTMENT } from "../../../lib/enums";
import { dateFormat } from "../../../lib/date";
import { sessionStorage } from '@/lib/until'
export default {
    data() {
        return {
            form: {
                name: '',
                tel: '',
                doctor: '',
                hospitalStatus: '',
                patientStatus: ''
            },
            page: {
                pageNumber: 1,
                pageSize: 10,
                totalCount: 100,
            },
            columns: [
                {
                    title: "病患姓名",
                    key: "name"
                },
                {
                    title: "年龄",
                    key: "age"
                },
                {
                    title: "性别",
                    key: "sex",
                    render: (h, params) => {
                        return h("span", {}, SEX[params.row.sex]);
                    },
                },
                {
                    title: "籍贯",
                    key: "native"
                },
                {
                    title: "手机号码",
                    key: "tel"
                },
                {
                    title: "科室",
                    key: "department",
                    render: (h, params) => {
                        return h("span", {}, DEPARTMENT[params.row.department]);
                    },
                },
                {
                    title: "就诊时间",
                    key: "startTime",
                    render: (h, params) => {
                        return h(
                            "span",
                            {},
                            dateFormat(params.row.startTime, "yyyy-MM-dd")
                        );
                    },
                },
                {
                    title: "出院时间",
                    key: "endTime",
                    render: (h, params) => {
                        return h(
                            "span",
                            {},
                            dateFormat(params.row.endTime, "yyyy-MM-dd")
                        );
                    },
                },
                {
                    title: "主治医师",
                    key: "doctor"
                },
                {
                    title: "操作",
                    key: "action",
                    fixed: "right",
                    width: 80,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small",
                                    },
                                    style: {
                                        // marginRight: "10px",
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({ path: '/myInfo/myInfo/action', query: { id: params.row.id } })
                                        },
                                    },
                                },
                                "查看"
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
        this.$nextTick(() => {

            this.setEcharts()
        })
    },
    activated () {
        this.search();
    },
    methods: {
        setEcharts() {
            var chartDom = document.getElementById('chart');
            var myChart = this.$echarts.init(chartDom);
            var option;

            option = {
            title: {
                text: 'Referer of a Website',
                subtext: 'Fake Data',
                left: 'center'
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
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                    itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
                }
            ]
            };

            option && myChart.setOption(option);
        },
        search(flag) {
            if (flag) {
                this.page.pageNumber = 1
            }
            this.form.idCard = sessionStorage.get('hospital_user').idCard
            this.form.patientStatus = '1'
            this.$http.post("/patient/getPatientData", Object.assign(this.form, this.page)).then((res) => {
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

<style>
</style>