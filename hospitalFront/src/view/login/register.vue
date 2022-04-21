<template>
    <section class="formAll">
        <div class="form">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <h1>患者注册</h1>
                <FormItem label="用户名" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入用户名"></Input>
                </FormItem>
                <FormItem label="手机号" prop="tel">
                    <Input v-model="formValidate.tel" placeholder="请输入手机号" :maxlength="11"></Input>
                </FormItem>
                <!-- <FormItem label="年龄" prop="age">
                    <Input v-model="formValidate.age" placeholder="请输入年龄"></Input>
                </FormItem> -->
                <FormItem label="性别" prop="sex">
                    <Select clearable v-model="formValidate.sex" style="width:150px">
                        <Option v-for="item in sex" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
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
                    <Button type="primary" @click="register('formValidate')" style="width: 240px;">注册</Button>
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
                name: '',
                tel: '',
                password: '',
                password2: '',
                age: '',
                idCard: '',
                sex: '',
                jobNum: '',
                professional: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
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
                ],
                age: [
                    { required: true, message: '年龄不能为空' },
                    {
                        message: '请输入正确的年龄',
                        trigger: 'blur',
                        validator: this.$validate.isAge
                    }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur' },
                ],
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
              this.formValidate.jobNum = new Date().getTime()
              this.formValidate.professional = '99'
              let a = this.formValidate.idCard.slice(6)
              this.formValidate.age = (new Date().getFullYear()) - Number(a.slice(0,4))
              this.$http.post('/user/addUserData', this.formValidate).then(res => {
                  if (res.data.code === '0001') {
                      this.$Message.error('注册失败');
                  } else {
                    if (res.data.code == 1062) {
                      return this.$Message.error(res.data.msg);
                    }
                    this.$Message.success('注册成功');
                    this.$router.push('/login')
                  }
              })
                // this.$Message.success('登录成功!');
                // this.$router.push('/home')
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
    padding-top: 16vh;
    h1 {
        text-align: center;
        margin-bottom: 16px;
    }
    .ivu-input-wrapper {
        width: 240px;
    }
}
</style>
