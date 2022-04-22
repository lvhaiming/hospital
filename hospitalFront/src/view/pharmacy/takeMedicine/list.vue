<template>
    <section class="content">
        <h3 class="page-title">取药</h3>
        <Form :model="form" :label-width="90" inline>
            <FormItem label="病患姓名">
                <Input v-model="form.name" />
            </FormItem>
            <FormItem label="证件号">
                <Input v-model="form.idCard" :maxlength="18" />
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
import { SEX, DEPARTMENT } from "../../../lib/enums";
export default {
    data() {
        return {
            form: {
                name: '',
                tel: '',
                doctor: '',
                hospitalStatus: ''
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
                    title: "科室",
                    key: "department",
                    render: (h, params) => {
                        return h("span", {}, DEPARTMENT[params.row.department]);
                    },
                },
                {
                    title: "主治医师",
                    key: "doctor"
                },
                {
                    title: "药方",
                    key: "drugs",
                    render: (h, params) => {
                        return h("div", {}, this.change(params.row.drugs, params.row.drugsNum));
                    },
                },
                {
                    title: "操作",
                    key: "action",
                    fixed: "right",
                    width: 90,
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
                                            if (params.row.drugsStatus == 1) return
                                            this.$Modal.confirm({
                                                title: "提醒",
                                                content: `确认取出${params.row.name}的药品？`,
                                                cancelText: "取消",
                                                onOk: () => {
                                                    let val = Object.values(this.drugsObj)
                                                    let key = Object.keys(this.drugsObj)
                                                    let drugs = []
                                                    form.drugs.forEach((item, index) => {
                                                        let idx;
                                                        idx = val.indexOf(item)
                                                        drugs.push(key[idx])
                                                    })
                                                    form.drugs = drugs.join(',') || ''
                                                    form.drugsNum = form.drugsNum.join(',') || ''
                                                    this.$http.post("/patient/editPatientData", Object.assign(form, { drugsStatus: params.row.drugsStatus == 1 ? 2 : 1 })).then((res) => {
                                                        this.$nextTick(() => {

                                                            this.search();
                                                        })
                                                        this.$Message.success('取药成功');
                                                    })
                                                },
                                            });
                                            
                                        },
                                    },
                                },
                                params.row.drugsStatus == 1 ? '已取药' : '取药'
                            ),
                        ]);
                    },
                },
            ],
            data: [],
            DEPARTMENT,
            department: [],
            drugsObj: {},
            drugsId: [],
        };
    },
    created() {
        this.getDrugs()
        this.changeData()
    },
    methods: {
        change(drug, drugNum) {
            let msg = ``
            if (typeof drug == 'string') {
                drug = drug.split(',')
            }
            drug.forEach((item,index) => {
                if (item) {
                    msg += `${item}*${drugNum[index]}\n；`
                }
            })
            return msg
        },
        getDrugs() {
            this.$http.post("/pharmacy/getPharmacyData", {}).then((res) => {
                let drugs = res.data.data;
                drugs.forEach(item => {
                    this.drugsObj[item.id.toString()] = item.name
                })
                this.search();
            });
        },
        search(flag) {
            if (flag) {
                this.page.pageNumber = 1
            }
            this.$http.post("/patient/getPatientData", Object.assign(this.form, this.page)).then((res) => {
                this.data = res.data.data;
                this.page = res.data.page;
                this.data.forEach(item => {
                    let drugsName = []
                    item.drugs.split(',').forEach(it => {
                        drugsName.push(this.drugsObj[it])
                    })
                    item.drugs = drugsName
                    if (item.drugsNum) {
                        item.drugsNum = item.drugsNum.split(',')
                    }
                })
            });
        },
        changeData() {
            for (let key in this.DEPARTMENT) {
                this.department.push({
                    value: key,
                    label: this.DEPARTMENT[key]
                })
            }
        }
    },
};
</script>

<style>
</style>