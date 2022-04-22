<template>
    <section class="content">
        <h3 class="page-title">新增床位</h3>
        <Form :model="form" :label-width="150" ref="message" style="margin-top: 20px;" :rules="formRules">
            <Row>
                <Col span="8">
                    <FormItem label="楼号" prop="floor">
                        <Input v-model="form.floor" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="病房号" prop="room">
                        <Input v-model="form.room" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="床位号" prop="bedNum">
                        <Input v-model="form.bedNum" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="床位等级" prop="isVip">
                        <Select clearable v-model="form.isVip" style="width:150px">
                            <Option value="1" key="1bed">VIP</Option>
                            <Option value="2" key="2bed">普通</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
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
import { SEX, PROFESSIONAL, DEPARTMENT, POSTS } from "../../../lib/enums";
import { dateFormat } from "../../../lib/date";
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
                floor: '',
                room: '',
                bedNum: '',
                useName: '',
                useTime: '',
                isVip: ''
            },
            formRules: {
                floor: [{ required: true, message: '用户姓名不能为空' }],
                room: [{ required: true, message: '请输入登录密码' }],
                bedNum: [{ required: true, message: '年龄不能为空' },],
                isVip: [{ required: true, message: '年龄不能为空' },]
            },
            useName: []
        };
    },
    created() {
        this.changeData()
    },
    methods: {
        submit() {
            this.$refs.message.validate((valid) => {
                if (valid) {
                    let http = ''
                    http = '/bed/addBedData'
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
            for (let key in this.POSTS) {
                this.posts.push({
                    value: key,
                    label: this.POSTS[key]
                })
            }
        },
    },
};
</script>

<style>
</style>