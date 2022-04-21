<template>
    <section class="content">
        <h3 class="page-title">挂号</h3>
        <Form :model="form" :label-width="90" inline v-if="show">
            <FormItem label="病患姓名">
                <Input v-model="form.name" />
            </FormItem>
            <FormItem label="手机号码">
                <Input v-model="form.tel" />
            </FormItem>
            <FormItem label="挂号码">
                <Input v-model="form.checkNum" />
            </FormItem>
            <FormItem label="所在科室">
                <Select clearable v-model="form.department" style="width:150px">
                    <Option v-for="item in department" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="状态">
                <Select clearable v-model="form.checkStatus" style="width:150px">
                    <Option value="1" key="checkStatus1">已挂号</Option>
                    <Option value="2" key="checkStatus2">已退号</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button @click="search(true)" icon="md-search" type="primary">
                    查询
                </Button>
            </FormItem>
        </Form>
        <Button @click="add" icon="md-add" type="primary" size="small">
            {{ show ? '新增' : '预约挂号' }}
        </Button>
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
                professional: '',
                department: '',
                checkStatus: '',
                idCard: ''
            },
            page: {
                pageNumber: 1,
                pageSize: 10,
                totalCount: 100,
            },
            columns: [
                {
                    title: "挂号码",
                    key: "checkNum"
                },
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
                    title: "手机号码",
                    key: "tel"
                },
                {
                    title: "所在科室",
                    key: "department",
                    render: (h, params) => {
                        return h("span", {}, DEPARTMENT[params.row.department]);
                    },
                },
                {
                    title: "入院时间",
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
                    title: "主治医师",
                    key: "doctor"
                },
                {
                    title: "状态",
                    key: "checkStatus",
                    render: (h, params) => {
                        return h("span", {}, params.row.checkStatus == '1' ? '已挂号' : '已退号');
                    },
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
                                        marginRight: "10px",
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({ path: '/check/check/edit', query: { id: params.row.id } })
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
            professional: [],
            users: {}
        };
    },
    created() {
        this.users = sessionStorage.get('hospital_user')
        this.search();
        this.changeData()
    },
    computed: {
        show() {
            return this.users.professional !== '99'
        }
    },
    methods: {
        add() {
            this.$router.push('/check/check/add')
        },
        search(flag) {
            if (flag) {
                this.page.pageNumber = 1
            }
            if (!this.show) {
                this.form.name = this.users.name
                this.form.idCard = this.users.idCard
            }
            this.$http.post("/patient/getPatientData", Object.assign(this.form, this.page)).then((res) => {
                this.data = res.data.data;
                this.page = res.data.page;
            });
            console.log('this.page :>> ', this.page);
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