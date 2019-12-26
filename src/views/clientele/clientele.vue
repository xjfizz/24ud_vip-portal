<template>
    <div>
        <el-card class="box-card">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="用户名称" prop="userName">
                    <el-input style="width:260px" v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input type="password" style="width:260px" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="tel">
                    <el-input style="width:260px" v-model="form.tel" autocomplete="off" @keyup.enter.native="add('form')"></el-input>
                </el-form-item>
                <!-- <el-radio-group
                  v-model="form.type"
                  label="type"
                  style="margin-left:150px;margin-bottom:15px"
                >
                  <el-radio :label="0">管理员</el-radio>
                  <el-radio :label="1">客户</el-radio>
                </el-radio-group>-->
                <el-form-item>
                    <el-button type="primary" @click="add('form')">创建</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import Add from "../../api/register";

    let {adds} = Add;
    export default {
        data() {
            return {
                form: {
                    userName: "",
                    password: "",
                    tel: "",
                    type: "1"
                },
                rules: {
                    userName: [
                        {required: true, message: '请输入用户名称', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请设置密码', trigger: 'blur'},
                        {min: 6, message: '长度在 6 位以上', trigger: 'blur'}
                    ],
                    tel: [
                        {required: true, message: '请填写手机号', trigger: 'blur'},
                        {min: 11, max: 11, message: '请填写11位手机号', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            add(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {type: 1, ...this.form}
                        adds(params).then(res => {
                            if (res.data.code ==200) {
                                this.form.id = res.data.id;
                              //  this.tableData.push(this.forms);
                                this.form = {
                                    userName: "",
                                    password: "",
                                    tel: "",
                                    type: ""
                                };
                            }
                            this.$message.success("添加成功");
                        });
                    } else {
                        this.$message.error("请填入完整信息");
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.form = {};
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>

<style>
</style>