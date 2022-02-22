<template>
    <section class="content">
        <h3 class="page-title">用户管理</h3>
        <Form :model="form" :label-width="90" inline>
            <FormItem label="用户名称">
                <Input v-model="form.name" />
            </FormItem>
            <FormItem label="电话">
                <Input v-model="form.tel" />
            </FormItem>
            <FormItem label="职称">
                <Select clearable v-model="form.professional" style="width:150px">
                    <Option v-for="item in professional" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="所在科室">
                <Select clearable v-model="form.department" style="width:150px">
                    <Option v-for="item in department" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button @click="search()" icon="md-search" type="primary">
                    查询
                </Button>
            </FormItem>
        </Form>
        <Button @click="add" icon="md-add" type="primary" size="small">
            新增
        </Button>
        <HosTable
            @changeNo="changeNo"
            :page="page"
            :columns="columns"
            :data="data"
        ></HosTable>
    </section>
</template>

<script>
import { SEX, PROFESSIONAL, DEPARTMENT } from "./../../lib/enums";
import { dateFormat } from "./../../lib/date";
export default {
    data() {
        return {
            form: {
                name: '',
                tel: '',
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
                    title: "用户名称",
                    key: "name",
                },
                {
                    title: "年龄",
                    key: "age",
                    width: 80,
                },
                {
                    title: "性别",
                    key: "sex",
                    width: 80,
                    render: (h, params) => {
                        return h("span", {}, SEX[params.row.sex]);
                    },
                },
                {
                    title: "电话",
                    key: "tel",
                    width: 140,
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
                    title: "所在科室",
                    key: "department",
                    render: (h, params) => {
                        return h("span", {}, DEPARTMENT[params.row.department]);
                    },
                },
                {
                    title: "入职时间",
                    key: "time",
                    width: 100,
                    render: (h, params) => {
                        return h(
                            "span",
                            {},
                            dateFormat(params.row.time, "yyyy-MM-dd")
                        );
                    },
                },
                {
                    title: "籍贯",
                    key: "native",
                    width: 130,
                },
                {
                    title: "操作",
                    key: "action",
                    fixed: "right",
                    width: 140,
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
                                            console.log("编辑");
                                        },
                                    },
                                },
                                "编辑"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small",
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params.row);
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
    },
    methods: {
        add() {},
        search() {
            this.$http.post("/user/getUserData", Object.assign(this.form, this.page)).then((res) => {
                this.data = res.data.data;
                this.page = res.data.page;
            });
        },
        changeNo(pageNo) {
            this.page.pageNumber = pageNo;
            this.search();
        },
        delete(row) {
            this.$Modal.confirm({
                title: "提醒",
                content: `确认删除${row.name}的信息？`,
                cancelText: "取消",
                onOk: () => {
                    this.$http.post('/user/deleteUserData', { id: row.id }).then(res => {
                        this.$Message.success(res.data.msg);
                        // 保存成功信息提示
                        this.search()
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