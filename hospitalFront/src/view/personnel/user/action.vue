<template>
    <section class="content">
        <h3 class="page-title">{{ modal ? '新增用户' : '编辑用户' }}</h3>
        <Form :model="form" :label-width="150" ref="message" style="margin-top: 20px;" :rules="formRules">
            <Row>
                <Col span="8">
                    <FormItem label="用户名称" prop="name">
                        <Input v-model="form.name" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="登录密码" prop="password">
                        <Input v-model="form.password" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="年龄" prop="age">
                        <Input v-model="form.age" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="性别" prop="sex">
                        <Select clearable v-model="form.sex" style="width:150px">
                            <Option v-for="item in sex" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="手机号码" prop="tel">
                        <Input v-model="form.tel" :maxlength="11" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="工号" prop="jobNum">
                        <Input v-model="form.jobNum" :maxlength="8" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="职称" prop="professional">
                        <Select clearable v-model="form.professional" style="width:150px">
                            <Option v-for="item in professional.filter(i => { return i.value !== '99'})" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="所在科室" prop="department">
                        <Select clearable v-model="form.department" style="width:150px">
                            <Option v-for="item in department" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="入职时间" prop="time">
                        <DatePicker v-model="form.time" type="date" :options="options" placeholder="Select date" style="width: 200px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="籍贯" prop="native">
                        <Input v-model="form.native" />
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
import { SEX, PROFESSIONAL, DEPARTMENT } from "../../../lib/enums";
import { dateFormat } from "../../../lib/date";
export default {
    data() {
        return {
            PROFESSIONAL,
            DEPARTMENT,
            SEX,
            department: [],
            professional: [],
            sex: [],
            submitStatus: false,
            form: {
                name: '',
                password: '',
                age: '',
                sex: '',
                tel: '',
                jobNum: '',
                professional: '',
                department: '',
                time: '',
                native: '',
            },
            options: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
            },
            formRules: {
                name: [{ required: true, message: '用户名称不能为空' }],
                password: [{ required: true, message: '请输入登录密码' }],
                age: [
                    { required: true, message: '年龄不能为空' },
                    {
                        message: '请输入正确的年龄',
                        trigger: 'blur',
                        validator(rule, value, callback) {
                            if (value) {
                                if (/^([1-9]\d?|1[01]\d|120)$/.test(value)) {
                                    callback()
                                } else {
                                    return callback(new Error(rule.message))
                                }
                            }
                        }
                    }
                ],
                sex: [{ required: true, message: '请选择性别' }],
                tel: [
                    { required: true, message: '手机号码不能为空' },
                    {
                        message: '请输入正确的手机号码',
                        trigger: 'blur',
                        validator(rule, value, callback) {
                            if (value) {
                                if (/^1\d{10}$/.test(value)) {
                                    callback()
                                } else {
                                    return callback(new Error(rule.message))
                                }
                            }
                        }
                    }
                ],
                jobNum: [
                    { required: true, message: '工号不能为空' },
                    {
                        message: '请输入正确的八位工号',
                        trigger: 'blur',
                        validator(rule, value, callback) {
                            if (value) {
                                if (/\d{8}$/.test(value)) {
                                    callback()
                                } else {
                                    return callback(new Error(rule.message))
                                }
                            }
                        }
                    }
                ],
                professional: [{ required: true, message: '请选择职称' }],
                department: [{ required: true, message: '请选择所在科室' }],
                time: [{ required: true, message: '请选择入职时间' }],
                native: [{ required: true, message: '请填写籍贯' }]
            },
        };
    },
    created() {
        if (!this.modal) {
            this.getDetail()
        }
        this.changeData()
    },
    computed: {
        modal() {
            return this.$route.params.action === 'add'
        }
    },
    methods: {
        getDetail() {
            this.$http.post("/user/getUserData", { id: this.$route.query.id }).then((res) => {
                this.form = res.data.data[0]
            });
        },
        submit() {
            this.$refs.message.validate((valid) => {
                if (valid) {
                    this.form.time = dateFormat(this.form.time)
                    this.form.jobNum = Number(this.form.jobNum)
                    let http = ''
                    if (this.modal) {
                        http = '/user/addUserData'
                    } else {
                        this.form.id = this.$route.query.id
                        http = '/user/editUserData'
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
            for (let key in this.SEX) {
                this.sex.push({
                    value: key,
                    label: this.SEX[key]
                })
            }
        }
    },
};
</script>

<style>
</style>