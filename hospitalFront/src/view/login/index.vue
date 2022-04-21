<template>
    <section class="formAll">
        <div class="form">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <h1>医院信息管理平台</h1>
                <FormItem label="用户名" prop="username">
                    <Input v-model="formValidate.username" placeholder="请输入工号或者手机号"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="formValidate.password" placeholder="请输入密码" type="password"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="login('formValidate')" style="width: 240px;">登录</Button>
                </FormItem>
                <div style="text-align: center;">
                    <a @click="register">患者注册</a>
                    <a @click="forget" style="margin-left: 40px;">忘记密码？</a>
                </div>
            </Form>
        </div>
    </section>
</template>
<script>
import { sessionStorage } from '@/lib/until'
export default {
    data () {
        return {
            formValidate: {
                username: '',
                password: '',
            },
            ruleValidate: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    created() {
        sessionStorage.clear()
    },
    methods: {
        login (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$http.post('/login', this.formValidate).then(res => {
                        if (res.data.code === '0001') {
                            this.$Message.error(res.data.msg);
                        } else {
                            this.$Message.success(res.data.msg);
                            sessionStorage.set('hospital_user', res.data)
                            this.$router.push('/welcome')
                        }
                    })
                    // this.$Message.success('登录成功!');
                    // this.$router.push('/home')
                }
            })
        },
        register() {
            this.$router.push('/register')
        },
        forget() {
            this.$router.push('/forgetPassword')
        }
    }
}
</script>
<style scoped lang="less">
    .formAll {
        background-image: url(../../assets/img/bg.jpg);
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
    }
    .form {
        width: 400px;
        margin: auto;
        padding-top: 25vh;
        height: 100%;
        
        h1 {
            text-align: center;
            margin-bottom: 16px;
        }
        .ivu-input-wrapper {
            width: 240px;
        }
    }
</style>
