<template>
    <section class="content">
        <h3 class="page-title">病患信息</h3>
        <Form :model="form" :label-width="90" inline>
            <FormItem label="病患姓名">
                <Input v-model="form.name" />
            </FormItem>
            <FormItem label="证件号">
                <Input v-model="form.idCard" :maxlength="18" />
            </FormItem>
            <FormItem label="科室">
                <Select clearable v-model="form.department" style="width:150px">
                    <Option v-for="item in department" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="状态">
                <Select clearable v-model="form.bedStatus" style="width:150px">
                    <Option :value="2" key="2bed">已住院</Option>
                    <Option :value="1" key="1ed">已出院</Option>
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
                idCard: '',
                department: '',
                bedStatus: ''
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
                    width: 170,
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
                                            if (params.row.bedStatus == 2) return
                                            this.$router.push({ path: '/bed/patient/set', query: { id: params.row.id } })
                                        },
                                    },
                                },
                                params.row.bedStatus == 1 ? "安排床位" : "已安排床位"
                            ),
                            h(
                                params.row.bedStatus == 2 ? "Button" : '',
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
                                            let form = params.row
                                            this.$Modal.confirm({
                                                title: "提醒",
                                                content: `确认安排${params.row.name}出院？`,
                                                cancelText: "取消",
                                                onOk: () => {
                                                    form.doctor = form.doctorId
                                                    this.$http.post('/bed/editBedData', { useName: '', useTime: '', floor: params.row.floor, room: params.row.room, bedNum: params.row.bedNum }).then((res) => {
                                                        this.$http.post('/patient/editPatientData', Object.assign(form, { bedStatus: 1, endTime: dateFormat(new Date()), floor: '', room: '', bedNum: '' })).then(res => {
                                                            this.$Message.success('已安排出院');
                                                            // 保存成功信息提示
                                                            this.search(true)
                                                        }).catch(() => {})
                                                    });
                                                },
                                            });
                                        },
                                    },
                                },
                                "出院"
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
    },
    methods: {
        add() {
            this.$router.push('/patient/patient/add')
        },
        search(flag) {
            if (flag) {
                this.page.pageNumber = 1
            }
            this.form.checkStatus = '1'
            this.form.hospitalStatus = '1'
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