<template>
    <section class="content">
        <h3 class="page-title">病患管理</h3>
        <Form :model="form" :label-width="90" inline>
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
        </Form>
        <!-- <Button @click="add" icon="md-add" type="primary" size="small">
            新增
        </Button> -->
        <HosTable
            @changeNo="search"
            :page="page"
            :columns="columns"
            :data="data"
        ></HosTable>
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
                    width: 230,
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
                                        marginRight: "10px",
                                    },
                                    on: {
                                        click: () => {
                                            let form = params.row
                                            if (form.hospitalStatus == 1) return
                                            this.$Modal.confirm({
                                                title: "提醒",
                                                content: `确认安排${params.row.name}住院？`,
                                                cancelText: "取消",
                                                onOk: () => {
                                                    form.hospitalStatus = params.row.hospitalStatus == 1 ? 2 : 1
                                                    form.doctor = params.row.doctorId
                                                    this.$http.post("/patient/editPatientData", Object.assign(form)).then((res) => {
                                                        this.search();
                                                        this.$Message.success('已安排住院');
                                                    })
                                                },
                                            });
                                            
                                        },
                                    },
                                },
                                params.row.hospitalStatus == 1 ? '已安排住院' : '安排住院'
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small",
                                    },
                                    style: {
                                        marginRight: "10px",
                                    },
                                    on: {
                                        click: () => {
                                            let form = params.row
                                            let message = params.row.patientStatus == 2 ? '已就诊' : '更改为未就诊'
                                            this.$Modal.confirm({
                                                title: "提醒",
                                                content: `确认${params.row.name}${message}？`,
                                                cancelText: "取消",
                                                onOk: () => {
                                                    form.doctor = params.row.doctorId
                                                    this.$http.post("/patient/editPatientData", Object.assign( form, { patientStatus: params.row.patientStatus == 1 ? 2 : 1 })).then((res) => {
                                                        this.search();
                                                    })
                                                },
                                            });
                                            
                                        },
                                    },
                                },
                                params.row.patientStatus == 2 ? '就诊' : '已就诊'
                            ),
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
                                            this.$router.push({ path: '/patient/patient/edit', query: { id: params.row.id } })
                                        },
                                    },
                                },
                                "编辑"
                            ),
                            // h(
                            //     "Button",
                            //     {
                            //         props: {
                            //             type: "error",
                            //             size: "small",
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.delete(params.row);
                            //             },
                            //         },
                            //     },
                            //     "删除"
                            // ),
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
    },
    activated () {
        this.search();
    },
    methods: {
        add() {
            this.$router.push('/patient/patient/add')
        },
        search(flag) {
            if (flag) {
                this.page.pageNumber = 1
            }
            this.form.doctor = sessionStorage.get('hospital_user').jobNum
            this.form.checkStatus = '1'
            this.$http.post("/patient/getPatientData", Object.assign(this.form, this.page)).then((res) => {
                this.data = res.data.data;
                this.page = res.data.page;
            });
        },
        delete(row) {
            this.$Modal.confirm({
                title: "提醒",
                content: `确认删除${row.name}的信息？`,
                cancelText: "取消",
                onOk: () => {
                    this.$http.post('/patient/deletePatientData', { id: row.id }).then(res => {
                        this.$Message.success(res.data.msg);
                        // 保存成功信息提示
                        this.search(true)
                    }).catch(() => {})
                },
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