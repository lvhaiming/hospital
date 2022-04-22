<template>
    <section class="content">
        <h3 class="page-title">药品管理</h3>
        <Form :model="form" :label-width="90" inline>
            <FormItem label="药品名称">
                <Input v-model="form.name" />
            </FormItem>
            <FormItem label="处方药">
                <Select clearable v-model="form.prescription" style="width:150px">
                    <Option value="1" key="prescription1">处方药</Option>
                    <Option value="2" key="prescription2">非处方药</Option>
                </Select>
            </FormItem>
            <FormItem label="药品类型">
                <Select clearable v-model="form.type" style="width:150px">
                    <Option value="1" key="type1">中药</Option>
                    <Option value="2" key="type2">西药</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button @click="search(true)" icon="md-search" type="primary">
                    查询
                </Button>
            </FormItem>
        </Form>
        <Button @click="add" v-if="this.isShow" icon="md-add" type="primary" size="small">
            新增
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
import { sessionStorage } from '@/lib/until'
export default {
    data() {
        return {
            form: {
                name: '',
                treatment: '',
                prescription: '',
                type: ''
            },
            page: {
                pageNumber: 1,
                pageSize: 10,
                totalCount: 100,
            },
            columns: [
                {
                    title: "药品名称",
                    key: "name"
                },
                {
                    title: "功能主治",
                    key: "treatment"
                },
                {
                    title: "用法用量",
                    key: "uses"
                },
                {
                    title: "处方药",
                    key: "prescription",
                    render: (h, params) => {
                        return h("span", {}, params.row.prescription == '1' ? '处方药' : '非处方药');
                    },
                },
                {
                    title: "药品类型",
                    key: "type",
                    render: (h, params) => {
                        return h("span", {}, params.row.type == '1' ? '中药' : '西药');
                    },
                },
                {
                    title: "价格",
                    key: "price"
                },
                {
                    title: "操作",
                    key: "action",
                    fixed: "right",
                    width: 130,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                this.isShow ? "Button" : '',
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
                                            this.$router.push({ path: '/pharmacy/pharmacy/edit', query: { id: params.row.id } })
                                        },
                                    },
                                },
                                "编辑"
                            ),
                            h(
                                this.isShow ? "Button" : '',
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
            users: {}
        };
    },
    created() {
        this.search();
        this.users = sessionStorage.get('hospital_user')
    },
    activated () {
        this.search();
        this.users = sessionStorage.get('hospital_user')
    },
    computed: {
       isShow() {
           return this.users.professional !== '99'
       } 
    },
    methods: {
        add() {
            this.$router.push('/pharmacy/pharmacy/add')
        },
        search(flag) {
            if (flag) {
                this.page.pageNumber = 1
            }
            this.$http.post("/pharmacy/getPharmacyData", Object.assign(this.form, this.page)).then((res) => {
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
                    this.$http.post('/pharmacy/deletePharmacyData', { id: row.id }).then(res => {
                        this.$Message.success(res.data.msg);
                        // 保存成功信息提示
                        this.search(true)
                    }).catch(() => {})
                },
            });
        }
    },
};
</script>

<style>
</style>