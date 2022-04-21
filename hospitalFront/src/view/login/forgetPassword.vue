<template>
    <section class="formAll">
        <div class="form">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <h1>找回密码</h1>
                <FormItem label="手机号" prop="tel">
                    <Input v-model="formValidate.tel" placeholder="请输入手机号" :maxlength="11"></Input>
                </FormItem>
                <FormItem label="证件号" prop="idCard">
                    <Input v-model="formValidate.idCard" placeholder="请输入证件号" :maxlength="18"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="formValidate.password" placeholder="请输入密码" type="password"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="password2">
                    <Input v-model="formValidate.password2" placeholder="请再次输入密码" type="password"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="register('formValidate')" style="width: 240px;">确定</Button>
                </FormItem>
                <div style="text-align: center;">
                    <a @click="login">返回登录</a>
                </div>
            </Form>
        </div>
    </section>
</template>
<script>
import { sessionStorage } from '@/lib/until'
import { SEX } from "../../lib/enums";
export default {
    data () {
        return {
            formValidate: {
                tel: '',
                password: '',
                password2: '',
                idCard: '',
            },
            ruleValidate: {
                tel: [
                    { required: true, message: '手机号码不能为空' },
                    {
                        message: '请输入正确的手机号码',
                        trigger: 'blur',
                        validator: this.$validate.isMobile
                    }
                ],
                idCard: [
                    { required: true, message: '证件号不能为空' },
                    {
                        message: '请输入正确的证件号',
                        trigger: 'blur',
                        validator: this.$validate.isCard
                    }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                password2: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                ]
            },
            SEX,
            sex: []
        }
    },
    created() {
        sessionStorage.clear()
        this.changeData()
    },
    methods: {
      login() {
          this.$router.push('/login')
      },
      register (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                if (this.formValidate.password !== this.formValidate.password2) {
                    return this.$Message.error('两次密码不一样');
                }
                this.$http.post("/user/getUserData", Object.assign({tel: this.formValidate.tel})).then((res) => {
                    console.log('res.data :>> ', res.data);
                    let data = res.data.data
                    if (data.length == 0) {
                        return this.$Message.error('用户不存在');
                    } else {
                        if (data[0].idCard !== this.formValidate.idCard) {
                            return this.$Message.error('证件号有误');
                        }
                        this.$http.post("/user/editUserData", Object.assign({ id: data[0].id, password: this.formValidate.password })).then((res) => {
                            this.$Message.success('修改密码成功');
                            this.$router.push('/login')
                        });
                    }
                });
            }
        })
      },
      changeData() {
        for (let key in this.SEX) {
            this.sex.push({
                value: key,
                label: this.SEX[key]
            })
        }
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
    h1 {
        text-align: center;
        margin-bottom: 16px;
    }
    .ivu-input-wrapper {
        width: 240px;
    }
}
</style>
