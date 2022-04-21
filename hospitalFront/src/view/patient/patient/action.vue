<template>
    <section class="content">
        <h3 class="page-title">{{ modal ? '新增病患' : '编辑病患' }}</h3>
        <Form :model="form" :label-width="80" ref="message" style="margin-top: 20px;" :rules="formRules" inline>
            <Row>
                <Col span="8">
                    <FormItem label="病患姓名" prop="name">
                        <Input v-model="form.name" disabled />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="年龄" prop="age">
                        <Input v-model="form.age" disabled />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="性别" prop="sex">
                        <Select clearable disabled v-model="form.sex" style="width:150px">
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
                        <Input v-model="form.idCard" :maxlength="18" disabled />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="所在科室" prop="department">
                        <Select clearable disabled v-model="form.department" style="width:150px">
                            <Option v-for="item in department" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="籍贯" prop="native">
                        <Input v-model="form.native" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="居住地址" prop="address">
                        <Input v-model="form.address" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="入院时间">
                        <DatePicker v-model="form.startTime" type="date" :options="options" placeholder="Select date" style="width: 150px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="出院时间" prop="endTime">
                        <DatePicker v-model="form.endTime" type="date" :options="options1" placeholder="Select date" style="width: 170px"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="主治医生" prop="doctor">
                        <Select v-model="form.doctor" style="width:150px">
                            <Option v-for="item in doctor" :value="item.jobNum" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                
                <!-- <Col span="8">
                    <FormItem label="费别" prop="category">
                        <Select clearable disabled v-model="form.category" style="width:150px">
                            <Option v-for="item in category" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col> -->
                <Col span="8">
                    <FormItem label="诊断描述" prop="diagnosis">
                        <Input v-model="form.diagnosis" type="textarea" />
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="备注">
                        <Input v-model="form.remarks" type="textarea"/>
                    </FormItem>
                </Col>
                
                <Col span="8">
                    <FormItem label="医嘱">
                        <Input v-model="form.advice" type="textarea"/>
                    </FormItem>
                </Col>
                
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="用药">
                  <Row v-for="(items, index) in drugsNum" :key="index + 'mhs'" style="margin-bottom: 6px;">
                    <Col span="16">
                      <Select v-model="items.name" filterable clearable>
                        <Option v-for="item in drugs" :value="item.id.toString()" :key="item.id + 'x'">{{ item.name }}</Option>
                      </Select>
                    </Col>
                    <Col span="3" offset="1">
                      <Input v-model="items.num" type="text"/>
                    </Col>
                    <Col span="3">
                      <div style="display: flex;">
                        <span style="margin-left: 15px;font-size: 24px;cursor: pointer;" @click="addDrugs">+</span>
                        <span style="margin-left: 15px;font-size: 26px;cursor: pointer;" @click="deleteDrugs(index)" v-if="index > 0">-</span>
                      </div>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
            </Row>
            <Row style="margin-top: 20px;">
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
      options1: {
        disabledDate(date) {
          return date && date.valueOf() <= Date.now() - 60*60*24*1000;
        },
      },
      form: {
        name: "",
        age: "",
        sex: "",
        tel: "",
        department: "",
        startTime: "",
        endTime: "",
        native: "",
        address: "",
        doctor: "",
        diagnosis: "",
        advice: '',
        remarks: '',
        drugs: '',
        idCard: '',
        category: '',
        drugsNum: ''
      },
      formRules: {
        name: [{ required: true, message: "用户名称不能为空" }],
        age: [
          { required: true, message: "年龄不能为空" },
          {
            message: "请输入正确的年龄",
            trigger: "blur",
            validator: this.$validate.isAge
          },
        ],
        sex: [{ required: true, message: "请选择性别" }],
        tel: [
          { required: true, message: "手机号码不能为空" },
          {
            message: "请输入正确的手机号码",
            trigger: "blur",
            validator: this.$validate.isMobile
          },
        ],
        idCard: [
          { required: true, message: "请输入证件号" },
          {
            message: '请输入正确的证件号',
            trigger: 'blur',
            validator: this.$validate.isCard
          }
        ],
        department: [{ required: true, message: "请选择所在科室" }],
        category: [{ required: true, message: "请选择费别" }],
        startTime: [{ required: true, message: "请选择入院时间" }],
        native: [{ required: true, message: "请填写籍贯" }],
        doctor: [{ required: true, message: "请选择主治医生" }],
        diagnosis: [{ required: true, message: "请填写诊断描述" }],
        address: [{ required: true, message: "请填写居住地址" }],
        cost: [
          { required: true, message: "请填写费用" },
          {
            message: '请输入正确的费用',
            trigger: 'blur',
            validator: this.$validate.isPrice
          }
        ],
      },
      drugs: [],
      drugsObj: {},
      drugsNum: [
        {
          name: '',
          num: ''
        }
      ]
    };
  },
  created() {
    if (!this.modal) {
      this.getDetail();
    }
    this.changeData();
    this.$nextTick(() => {
      this.getDrugs()
    })
  },
  computed: {
    modal() {
      return this.$route.params.action === "add";
    },
  },
  methods: {
    addDrugs() {
      this.drugsNum.push({
        name: '',
        num: ''
      })
    },
    deleteDrugs(index) {
      this.drugsNum.splice(index, 1)
    },
    getDrugs() {
      this.$http.post("/pharmacy/getPharmacyData", {}).then((res) => {
          this.drugs = res.data.data;
          this.drugs.forEach(item => {
            this.drugsObj[item.id.toString()] = item.name
          })
      });
    },
    getDetail() {
      this.$http
        .post("/patient/getPatientData", { id: this.$route.query.id })
        .then((res) => {
          this.form = res.data.data[0];
          this.form.drugs = this.form.drugs.split(',')
          this.form.drugsNum = this.form.drugsNum.split(',')
          if (this.form.drugs.length > 0) {
            this.drugsNum[0].name = this.form.drugs[0]
            this.drugsNum[0].num = this.form.drugsNum[0]
            this.form.drugs.slice(1).forEach((item, index) => {
              this.drugsNum.push({
                name: item,
                num: this.form.drugsNum[index + 1]
              })
            })
          }
          this.changeDepartment(this.form.department)
        });
    },
    submit() {
      this.$refs.message.validate((valid) => {
        if (valid) {
          this.form.time = dateFormat(this.form.time);
          let d = []
          let dNum = []
          this.drugsNum.forEach(item => {
            if (item.name) {
              d.push(item.name)
              if (!item.num) {
                dNum.push('1')
              } else {
                dNum.push(item.num)
              }
            }
          })
          this.form.drugs = d.join(',')
          this.form.drugsNum = dNum.join(',')
          let http = "";
          if (this.modal) {
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
        this.$http.post("/user/getUserData", {department: val}).then((res) => {
            this.$nextTick(() => {
                this.doctor = []
                this.doctor = res.data.data
            })
        });
    }
  },
};
</script>

<style>
</style>