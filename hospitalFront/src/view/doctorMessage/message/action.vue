<template>
    <section class="content">
        <h3 class="page-title">医生信息</h3>
        <Form :model="form" :label-width="150" ref="message" style="margin-top: 20px;">
            <Row>
                <Col span="8">
                    <FormItem label="医生姓名">
                        <Input v-model="form.name" disabled />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="年龄">
                        <Input v-model="form.age" disabled />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="性别">
                        <Select clearable v-model="form.sex" style="width:150px" disabled >
                            <Option v-for="item in sex" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="工号">
                        <Input v-model="form.jobNum" :maxlength="8" disabled />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="职称">
                        <Select clearable v-model="form.professional" style="width:150px" disabled >
                            <Option v-for="item in professional.filter(i => { return i.value !== '99'})" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="科室">
                        <Select clearable v-model="form.department" style="width:150px" disabled >
                            <Option v-for="item in department" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="职位">
                        <Select clearable v-model="form.posts" style="width:150px" disabled >
                            <Option v-for="item in posts" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="籍贯">
                        <Input v-model="form.native" disabled />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <FormItem label="详细信息">
                        <Input v-model="form.message" :maxlength="255" type="textarea" disabled />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem>
                        <Button @click="cancel" style="margin-right: 20px;">
                            返回
                        </Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </section>
</template>

<script>
import { SEX, PROFESSIONAL, DEPARTMENT, POSTS } from "../../../lib/enums";
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
            form: {},
        };
    },
    created() {
        this.getDetail()
        this.changeData()
    },
    methods: {
        getDetail() {
            this.$http.post("/user/getUserData", { id: this.$route.query.id }).then((res) => {
                this.form = res.data.data[0]
            });
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
        }
    },
};
</script>

<style>
</style>