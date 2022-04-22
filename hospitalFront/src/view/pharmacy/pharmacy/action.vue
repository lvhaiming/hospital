<template>
    <section class="content">
        <h3 class="page-title">{{ modal ? '新增药品' : '编辑药品' }}</h3>
        <Form :model="form" :label-width="150" ref="message" style="margin-top: 20px;" :rules="formRules">
            <Row>
                <Col span="8">
                    <FormItem label="药品姓名" prop="name">
                        <Input v-model="form.name" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="规格" prop="norms">
                        <Input v-model="form.norms" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="功能主治" prop="treatment">
                        <Input v-model="form.treatment" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="用法用量" prop="uses">
                        <Input v-model="form.uses" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="价格" prop="price">
                        <Input v-model="form.price" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="处方药" prop="prescription">
                        <Select clearable v-model="form.prescription" style="width:150px">
                            <Option value="1" key="prescription1">处方药</Option>
                            <Option value="2" key="prescription2">非处方药</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="药品类型" prop="type">
                        <Select clearable v-model="form.type" style="width:150px">
                            <Option value="1" key="type1">中药</Option>
                            <Option value="2" key="type2">西药</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="注意事项" prop="careful">
                        <Input v-model="form.careful" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem>
                        <Button @click="cancel" style="margin-right: 20px;">
                            取消
                        </Button>
                        <Button @click="submit" type="primary">
                            确定
                        </Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                norms: '',
                treatment: '',
                uses: '',
                careful: '',
                prescription: '',
                type: '',
                price: ''
            },
            formRules: {
                name: [{ required: true, message: '药品姓名不能为空' }],
                norms: [{ required: true, message: '请填写药品规格' }],
                treatment: [{ required: true, message: '请填写药品功能主治' }],
                uses: [{ required: true, message: '请填写药品用法用量' }],
                careful: [{ required: true, message: '请填写药品注意事项' }],
                prescription: [{ required: true, message: '请选择药品是否为处方药' }],
                type: [{ required: true, message: '请选择药品类型' }],
                price: [
                    { required: true, message: '价格不能为空' },
                    {
                        message: '请输入正确的价格',
                        trigger: 'blur',
                        validator: this.$validate.isPrice
                    }
                ],
            },
        };
    },
    created() {
        if (!this.modal) {
            this.getDetail()
        }
    },
    computed: {
        modal() {
            return this.$route.params.action === 'add'
        }
    },
    methods: {
        getDetail() {
            this.$http.post("/pharmacy/getPharmacyData", { id: this.$route.query.id }).then((res) => {
                this.form = res.data.data[0]
            });
        },
        submit() {
            this.$refs.message.validate((valid) => {
                if (valid) {
                    let http = ''
                    if (this.modal) {
                        http = '/pharmacy/addPharmacyData'
                    } else {
                        http = '/pharmacy/editPharmacyData'
                    }
                    this.$http.post(http, this.form).then((res) => {
                        if (res.data.code === '0000') {
                            this.$Message.success(res.data.msg);
                            this.cancel()
                        } else {
                            this.$Message.error(res.data.msg);
                        }
                    });
                } else {
                    this.$Message.error('请填写完整信息');
                }
            })
        },
        cancel() {
            this.$router.go(-1)
        }
    },
};
</script>

<style>
</style>