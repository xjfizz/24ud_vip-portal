<template>
  <div class="box">
    <el-card class="box-card">
      
      <div slot="header" class="clearfix">
        <span style="font-size:18px;color:#000000">后台管理登录</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>

      <!--form表单-->
      <el-form ref="form" :model="form" label-width="80px" :rules="rules" status-icon>
        <!--用户名-->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"  type="text"></el-input>
        </el-form-item>

        <!--密码-->
        <el-form-item label="密码" prop="password" >
          <el-input v-model="form.password" placeholder="请输入密码" type="password" @keyup.enter.native="onSubmit('form')"></el-input>
        </el-form-item>
        <!-- 选择管理员或客户 -->
        <!-- <el-radio-group v-model="form.type" style="margin-left:150px;margin-bottom:15px">
          <el-radio :label="0">管理员</el-radio>
          <el-radio :label="1">客户</el-radio>
        </el-radio-group> -->

        <!--登录按钮-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即登录</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
          <!-- <el-button type="text" index="/admins2" @click="dialogFormVisible = true">点击注册</el-button> -->
          <!-- <el-link href="../register" type="primary" :underline="false" style="margin-left:5%">点击注册</el-link> -->
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 注册 -->
    <!-- <el-dialog title="用户注册" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="forms">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input style="width:260px" v-model="forms.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input type="password" style="width:260px" v-model="forms.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input style="width:260px" v-model="forms.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-radio-group v-model="forms.type" label="type" style="margin-left:150px;margin-bottom:15px">
          <el-radio :label="0">管理员</el-radio>
          <el-radio :label="1">客户</el-radio>
        </el-radio-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adds()">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import loginmet from "../../api/register";
let { logins } = loginmet;
import Add from "../../api/register";
let { adds } = Add;
export default {
  name: "Login",
  data() {
    return {
      forms: {
        username: "",
        password: "",
        tel: "",
        type: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          // { min: 11, max: 11, message: "长度在 11 位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在6到12个字符", trigger: "blur" }
        ],

      },
      dialogFormVisible: false,
      form: {
        username: "",
        password: "",
        type: 5
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    onSubmit(formName) {



      const loading = this.$loading({
        lock: true,
        target: ".box",
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
      }, 400);
      this.$refs[formName].validate(valid => {
        if (valid) {
          logins(this.form).then(res => {
            console.log("res",res)
            if (res.data.code == 200) {
              this.$notify({
                title: "成功",
                message: "恭喜您登录成功！",
                type: "success"
              });
              localStorage.setItem("userInfo", JSON.stringify(res.data.data));
              //this.$store.dispatch("initadmin", res.data.data);
              setTimeout(() => {
                this.$router.push("/welcome");
              },1000)
            } else {
              this.$notify.error({
                title: "错误",
                message:res.data.message
              });
            }
          });
        } else {
          this.$notify.error({
            title: "错误",
            message: "抱歉用户名或密码错误！"
          });
          return false;
        }
      });
    },
    onSubmits() {
      alert("1");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.form = {
      //   username: "",
      //   password: ""
      // };
    },
    // 添加用户
    add() {
      adds(this.forms).then(res => {
        if (res.data.code == 0) {
          this.forms.id = res.data.id;
          this.tableData.push(this.forms);
          this.forms = {
            username: "",
            password: "",
            tel: "",
            type: ""
          };
        }
        this.$message.success("添加成功");
        this.dialogFormVisible = false;
      });
    },
    adds() {
      this.dialogFormVisible = false;
      this.forms = {};
    }
  },
  created() {
    // let userInfo = localStorage.getItem('userInfo');
    // if(userInfo) {
    //   this.$router.push("/index");
    // }
  }
};
</script>

<style scoped>
.box {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: url("./image/timg8.jpg") center / cover;
}
span {
  margin-left: 165px;
}
.box-card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /*background: rgba(255, 255, 255, 0.5) url("./image/timg1.jpg");*/
  background: rgba(255, 255, 255, 0.5) ;
}
.el-button {
  margin-left: 30px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style> 