<template>
    <section class="content">
        <h3 class="page-title">个人中心</h3>
        <Form :model="form" :label-width="150" ref="message" style="margin-top: 20px;" :rules="formRules">
            <Row>
                <Col span="8">
                    <FormItem label="用户姓名" prop="name">
                        <Input v-model="form.name" disabled />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="登录密码" prop="password">
                        <Input v-model="form.password" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="年龄" prop="age">
                        <Input v-model="form.age" disabled />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="性别" prop="sex">
                        <Select clearable v-model="form.sex" style="width:150px" disabled>
                            <Option v-for="item in sex" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="证件号" prop="idCard">
                        <Input v-model="form.idCard" :maxlength="18" disabled />
                    </FormItem>
                </Col>
                <Col span="8" v-if="show">
                    <FormItem label="工号" prop="jobNum">
                        <Input v-model="form.jobNum" :maxlength="8" disabled />
                    </FormItem>
                </Col>
                <Col span="8" v-if="show">
                    <FormItem label="职称" prop="professional">
                        <Select clearable v-model="form.professional" style="width:150px" disabled>
                            <Option v-for="item in professional.filter(i => { return i.value !== '99'})" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8" v-if="show">
                    <FormItem label="科室">
                        <Select clearable v-model="form.department" style="width:150px" disabled>
                            <Option v-for="item in department" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8" v-if="show">
                    <FormItem label="职位" prop="posts">
                        <Select clearable v-model="form.posts" style="width:150px" disabled>
                            <Option v-for="item in posts" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8" v-if="show">
                    <FormItem label="入职时间" prop="time">
                        <DatePicker v-model="form.time" type="date" :options="options" placeholder="Select date" style="width: 200px" disabled></DatePicker>
                    </FormItem>
                </Col>
                <Col span="8" v-if="show">
                    <FormItem label="籍贯" prop="native">
                        <Input v-model="form.native" disabled />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <FormItem label="详细信息">
                        <Input v-model="form.message" disabled type="textarea" />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem>
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
import { SEX, PROFESSIONAL, DEPARTMENT, POSTS } from "../../../lib/enums";
import { dateFormat } from "../../../lib/date";
import { sessionStorage } from '@/lib/until'
export default {
    data() {
        return {
            PROFESSIONAL,
            DEPARTMENT,
            SEX,
            POSTS,
            department: [],
            professional: [],
            sex: [],
            posts: [],
            submitStatus: false,
            form: {
                name: '',
                password: '',
                age: '',
                sex: '',
                jobNum: '',
                professional: '',
                department: '',
                posts: '',
                time: '',
                native: '',
                idCard: '',
                message: ''
            },
            options: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now();
                }
            },
            formRules: {
                password: [{ required: true, message: '请输入登录密码' }],
            },
            users: {}
        };
    },
    created() {
        this.users = sessionStorage.get('hospital_user')
        this.getDetail()
        this.changeData()
    },
    computed: {
        show() {
            return this.form.professional !== '99'
        }
    },
    methods: {
        getDetail() {
            this.$http.post("/user/getUserData", { id: this.users.id }).then((res) => {
                this.form = res.data.data[0]
            });
        },
        submit() {
            this.$refs.message.validate((valid) => {
                if (valid) {
                    if (this.show) {
                        this.form.time = dateFormat(this.form.time)
                    }
                    let http = ''
                    http = '/user/editUserData'
                    this.$http.post(http, this.form).then((res) => {
                        if (res.data.code === '0000') {
                            this.$Message.success('修改成功，请重新登录');
                            this.$router.push('/')
                        } else {
                            this.$Message.error(res.data.msg);
                        }
                    });
                } else {
                    this.$Message.error('请填写完整信息');
                }
            })
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
            for (let key in this.POSTS) {
                this.posts.push({
                    value: key,
                    label: this.POSTS[key]
                })
            }
        }
    },
};
</script>

<style>
</style>