<template>
    <section class="content">
        <h3 class="page-title">安排床位</h3>
        <Form :model="form" :label-width="150" ref="message" style="margin-top: 20px;" :rules="formRules">
            <Row>
                <Col span="8">
                    <FormItem label="患者姓名">
                        <Input v-model="form.name" disabled />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="楼号" prop="floor">
                        <Select clearable v-model="form.floor" style="width:150px" @on-change="changeFloor">
                            <Option v-for="item in floor" :value="item.floor" :key="item.floor">{{ item.floor }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="病房号" prop="room">
                        <Select clearable v-model="form.room" style="width:150px" @on-change="changeRoom">
                            <Option v-for="item in room" :value="item.room" :key="item.room">{{ item.room }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="床位号" prop="bedNum">
                        <Select clearable v-model="form.bedNum" style="width:150px">
                            <Option v-for="item in bedNum" :value="item.bedNum" :key="item.bedNum">{{ item.bedNum }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="使用时间" prop="useTime">
                        <DatePicker v-model="form.useTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
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
                useTime: '',
            },
            formRules: {
                floor: [{ required: true, message: '楼号不能为空' }],
                room: [{ required: true, message: '房间号不能为空' }],
                bedNum: [{ required: true, message: '床位号不能为空' },],
                useTime: [{ required: true, message: '使用时间不能为空' },],
            },
            useName: [],
            floor: [],
            room: [],
            bedNum: []
        };
    },
    created() {
        this.search()
    },
    methods: {
        search() {
            this.$http.post("/patient/getPatientData", Object.assign({ id: this.$route.query.id })).then((res) => {
                this.form = res.data.data[0]
            });
            this.$http.post("/bed/getFloor", {}).then((res) => {
                this.floor = []
                this.floor = res.data.data
            });
        },
        changeFloor(val) {
            this.$http.post("/bed/getRoom", { floor: val }).then((res) => {
                this.room = []
                this.room = res.data.data
            });
        },
        changeRoom(val) {
            this.$http.post("/bed/getBedNum", { floor: this.form.floor, room: val }).then((res) => {
                this.bedNum = []
                this.bedNum = res.data.data
            });
        },
        submit() {
            this.$refs.message.validate((valid) => {
                if (valid) {
                    this.form.useName = this.form.id
                    this.form.useTime = dateFormat(this.form.useTime)
                    let http = ''
                    http = '/bed/editBedData'
                    this.$http.post(http, this.form).then((res) => {
                        if (res.data.code === '0000') {
                            this.$Message.success(res.data.msg);
                            this.cancel()
                        } else {
                            this.$Message.error(res.data.msg);
                        }
                    });
                    this.$http.post('/patient/editPatientData', Object.assign(this.form, { bedStatus: 2, endTime: '' })).then((res) => {});
                } else {
                    this.$Message.error('请填写完整信息');
                }
            })
        },
        cancel() {
            this.$router.go(-1)
        },
    },
};
</script>

<style>
</style>