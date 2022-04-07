<template>
    <section class="content">
        <h3 class="page-title">权限管理</h3>
        <Form :model="form" :label-width="90" inline>
            <FormItem label="职称">
                <Select clearable v-model="form.professional" style="width:150px">
                    <Option v-for="item in professional" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
import { PROFESSIONAL} from "../../../lib/enums";
export default {
    data() {
        return {
            form: {
                professional: ''
            },
            page: {
                pageNumber: 1,
                pageSize: 10,
                totalCount: 100,
            },
            columns: [
                {
                    title: "职称",
                    key: "professional",
                    render: (h, params) => {
                        return h(
                            "span",
                            {},
                            PROFESSIONAL[params.row.professional_id]
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
                                            this.$router.push({ path: '/personnel/auth/action', query: { id: params.row.professional_id } })
                                        },
                                    },
                                },
                                "编辑"
                            ),
                        ]);
                    },
                },
            ],
            data: [],
            PROFESSIONAL,
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
            this.$http.post("/getPersonal", Object.assign(this.form, this.page)).then((res) => {
                this.data = res.data.data;
                this.page = res.data.page;
            });
        },
        changeData() {
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