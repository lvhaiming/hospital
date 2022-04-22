<template>
    <section class="content">
        <h3 class="page-title">医生信息</h3>
        <Form :model="form" :label-width="90" inline>
            <FormItem label="医生姓名">
                <Input v-model="form.name" />
            </FormItem>
            <FormItem label="工号">
                <Input v-model="form.jobNum" />
            </FormItem>
            <FormItem label="职称">
                <Select clearable v-model="form.professional" style="width:150px">
                    <Option v-for="item in professional.filter(i => { return i.value == '11' || i.value == '12'})" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="科室">
                <Select clearable v-model="form.department" style="width:150px">
                    <Option v-for="item in department" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button @click="search(true)" icon="md-search" type="primary">
                    查询
                </Button>
            </FormItem>
        </Form>
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
export default {
    data() {
        return {
            form: {
                name: '',
                jobNum: '',
                professional: '',
                department: ''
            },
            page: {
                pageNumber: 1,
                pageSize: 10,
                totalCount: 100,
            },
            columns: [
                {
                    title: "医生姓名",
                    key: "name",
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
                    title: "工号",
                    key: "jobNum"
                },
                {
                    title: "职称",
                    key: "professional",
                    render: (h, params) => {
                        return h(
                            "span",
                            {},
                            PROFESSIONAL[params.row.professional]
                        );
                    },
                },
                {
                    title: "科室",
                    key: "department",
                    render: (h, params) => {
                        return h("span", {}, DEPARTMENT[params.row.department]);
                    },
                },
                {
                    title: "籍贯",
                    key: "native"
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
                                            this.$router.push({ path: '/doctorMessage/message/detail', query: { id: params.row.id } })
                                        },
                                    },
                                },
                                "查看"
                            )
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
        search(flag) {
            if (flag) {
                this.page.pageNumber = 1
            }
            this.$http.post("/user/getUserData", Object.assign(this.form, this.page, {ifDoctor: true})).then((res) => {
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