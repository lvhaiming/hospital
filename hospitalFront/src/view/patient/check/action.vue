<template>
    <section class="content">
        <h3 class="page-title">{{ modal ? '新增挂号' : '编辑挂号' }}</h3>
        <Form :model="form" :label-width="150" ref="message" style="margin-top: 20px;" :rules="formRules" inline>
            <Row>
                <Col span="8">
                    <FormItem label="病患姓名" prop="name">
                        <Input v-model="form.name" />
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
                    <FormItem label="证件号" prop="idCard">
                        <Input v-model="form.idCard" :maxlength="18" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="所在科室" prop="department">
                        <Select clearable v-model="form.department" style="width:150px" @on-change="changeDepartment">
                            <Option v-for="item in department" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="入院时间" prop="startTime">
                        <DatePicker v-model="form.startTime" type="date" :options="options" placeholder="Select date" style="width: 200px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="主治医生" prop="doctor">
                        <Select v-model="form.doctor" style="width:150px">
                            <Option v-for="item in doctor" :value="item.jobNum" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="费别" prop="category">
                        <Select clearable v-model="form.category" style="width:150px">
                            <Option v-for="item in category" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="费用" prop="cost">
                        <Input v-model="form.cost" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="状态" prop="checkStatus">
                        <Select v-model="form.checkStatus" style="width:150px">
                            <Option value="1" key="checkStatus1">挂号</Option>
                            <Option value="2" key="checkStatus2">退号</Option>
                        </Select>
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
import { SEX, DEPARTMENT, CATEGORY } from "../../../lib/enums";
import { dateFormat } from "../../../lib/date";
export default {
  data() {
    return {
      DEPARTMENT,
      SEX,
      CATEGORY,
      department: [],
      sex: [],
      category: [],
      doctor: [],
      submitStatus: false,
      options: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        },
      },
      form: {
        name: "",
        age: "",
        sex: "",
        tel: "",
        department: "",
        startTime: "",
        doctor: "",
        idCard: '',
        category: '',
        cost: ''
      },
      formRules: {
        name: [{ required: true, message: "用户名称不能为空" }],
        age: [
          { required: true, message: "年龄不能为空" },
          {
            message: "请输入正确的年龄",
            trigger: "blur",
            validator(rule, value, callback) {
              if (value) {
                if (/^([1-9]\d?|1[01]\d|120)$/.test(value)) {
                  callback();
                } else {
                  return callback(new Error(rule.message));
                }
              }
            },
          },
        ],
        sex: [{ required: true, message: "请选择性别" }],
        tel: [
          { required: true, message: "手机号码不能为空" },
          {
            message: "请输入正确的手机号码",
            trigger: "blur",
            validator(rule, value, callback) {
              if (value) {
                if (/^1\d{10}$/.test(value)) {
                  callback();
                } else {
                  return callback(new Error(rule.message));
                }
              }
            },
          },
        ],
        idCard: [{ required: true, message: "请输入证件号" }],
        department: [{ required: true, message: "请选择所在科室" }],
        category: [{ required: true, message: "请选择费别" }],
        startTime: [{ required: true, message: "请选择入院时间" }],
        doctor: [{ required: true, message: "请输入主治医生" }],
        cost: [{ required: true, message: "请填写费用" }],
      },
    };
  },
  created() {
    if (!this.modal) {
      this.getDetail();
    }
    this.changeData();
  },
  computed: {
    modal() {
      return this.$route.params.action === "add";
    },
  },
  methods: {
    getDetail() {
      this.$http
        .post("/patient/getPatientData", { id: this.$route.query.id })
        .then((res) => {
          this.form = res.data.data[0];
          this.changeDepartment(this.form.department)
        });
    },
    submit() {
      this.$refs.message.validate((valid) => {
        if (valid) {
          this.form.time = dateFormat(this.form.time);
          let http = "";
          if (this.modal) {
            this.form.checkNum = new Date().getTime()
            http = "/patient/addPatientData";
          } else {
            this.form.id = this.$route.query.id;
            http = "/patient/editPatientData";
          }
          this.$http.post(http, this.form).then((res) => {
            if (res.data.code === "0000") {
              this.$Message.success(res.data.msg);
              this.cancel();
            } else {
              this.$Message.error(res.data.msg);
            }
          });
        } else {
          this.$Message.error("请填写完整信息");
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    changeData() {
      for (let key in this.DEPARTMENT) {
        this.department.push({
          value: key,
          label: this.DEPARTMENT[key],
        });
      }
      for (let key in this.SEX) {
        this.sex.push({
          value: key,
          label: this.SEX[key],
        });
      }
      for (let key in this.CATEGORY) {
        this.category.push({
          value: key,
          label: this.CATEGORY[key],
        });
      }
    },
    changeDepartment (val) {
        console.log('val :>> ', val);
        this.$http.post("/user/getUserData", {department: val}).then((res) => {
            this.$nextTick(() => {
                this.doctor = []
                this.doctor = res.data.data
                console.log('this.doctor :>> ', this.doctor);
                console.log('this.form :>> ', this.form);
            })
        });
    }
  },
};
</script>

<style>
</style>