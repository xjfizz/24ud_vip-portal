<template>
    <div class="content">
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <div class="UD">
                    <img class="ud" width="200px" src="../../image/5d22e2d66392d.png"/>
                </div>
                <el-row class="tac">
                    <el-col>
                        <el-menu
                                default-active="2"
                                class="el-menu-vertical-demo"
                                @open="handleOpen"
                                @close="handleClose"
                                background-color="#445ee9"
                                text-color="#fff"
                                active-text-color="#ffd04b"
                                router
                        >
                            <el-submenu v-if="menuPower === 0" index="1">
                                <template slot="title">
                                    <i class="el-icon-user" style="color:#ffffff"></i>
                                    <span>管&nbsp;&nbsp;理&nbsp;&nbsp;员</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/admins">添加</el-menu-item>
                                    <el-menu-item index="/admins2">用户信息</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu v-if="menuPower === 0" index="2">
                                <template slot="title">
                                    <i class="el-icon-s-custom" style="color:#ffffff"></i>
                                    <span>客户管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/clientele">添加</el-menu-item>
                                    <el-menu-item index="/clienteles">客户信息</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-menu-item v-if="menuPower === 1" index="/monitoring">
                                <i class="el-icon-icon4"></i>
                                <span slot="title">打印发货</span>
                            </el-menu-item>
                            <el-menu-item v-if="menuPower === 0 || menuPower === 1" index="/print">
                                <i class="el-icon-icon3"></i>
                                <span slot="title">物流监控</span>
                            </el-menu-item>
                            <el-menu-item v-if="menuPower === 0 || menuPower === 1 " index="/bull">
                                <i class="el-icon-icon5"></i>
                                <span slot="title">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单</span>
                            </el-menu-item>
                            <el-menu-item v-if="menuPower === 1" index="/set">
                                <i class="el-icon-icon6"></i>
                                <span slot="title">工&nbsp;&nbsp;具&nbsp;&nbsp;箱</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-container class="main">
                <!-- 头部 -->
                <el-header>
                    
                    <div class="exits" style="float:right" >
                       <div class="help" @click="amend">
                           <i class="el-icon-icon2" style="margin-right:5px"></i>
                           <span>修改密码</span>
                       </div>
                        <div class="tui" @click="exit">
                            <i class="el-icon-icon1"></i>
                            <span class="out">退出</span>
                        </div>
                        <!-- <div class="name">
                        <img style="width:40px;heigth:40px; border-radius: 15%;" src="./img/img.jpg" alt id="thumb"/>
                        <span>{{userInfo.username}}</span> 
                        </div> -->
                    </div>
                    <!-- <el-button plain style="float: left;margin-top: 30px" @click="amend">修改密码</el-button> -->
                </el-header>
                <!-- 内容 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

        <!--        修改密码-->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="新密码" :label-width="formLabelWidth" prop="pass">
                    <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="请确认" :label-width="formLabelWidth" prop="password">
                    <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="change('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Password from '../../api/admins'

    let {compile} = Password;
    export default {
        data() {
            // var validatePass = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入密码'));
            //     } else {
            //         if (this.ruleForm.password !== '') {
            //             this.$refs.ruleForm.validateField('checkPass');
            //         }
            //         callback();
            //     }
            // };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                activeIndex: "1",
                activeIndex2: "1",
                menuPower: 0,
                userInfo: {},
                dialogFormVisible: false,
                form: {
                    id: '',
                    username: '',
                    password: '',
                    pass: ''
                },
                formLabelWidth: '120px',
                rules: {
                    pass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码输入有误', validator: validatePass2, trigger: 'blur'}
                    ],

                }
            };
        },
        mounted() {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
            this.menuPower = this.userInfo.level // 0 // 管理员
            console.log('this.menuPower', this.menuPower)
        },
        methods: {
            //初始化
            init() {
                this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
                console.log('userInfo', this.userInfo)
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            exit() {
                localStorage.removeItem("userInfo");
                this.$router.go(0);
            },
            //修改密码
            amend() {
                this.dialogFormVisible = true;
                this.form = this.userInfo
            },
            change(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        compile(this.form).then(res => {
                            console.log(res)
                            if (res.status == 200) {
                                this.$message.success("修改成功");
                                this.dialogFormVisible = false;
                                this.exit();

                            } else {
                                this.$$message.error("修改失败")
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancel(){
                this.form = '';
                this.dialogFormVisible = false;
                history.go(0)
            }
        },
        created() {
            this.init()
        }
    };
</script>

<style>
    @import "../icon.css";

    * {
        margin: 0;
        padding: 0;
    }

    .el-header {
        background-color: #5772ff;
        color: #333;
        text-align: center;
        /* line-height: 60px; */
        height: 100px !important;
    }

    .el-aside {
        background-color: #445ee9;
        color: #333;
        text-align: center;
        /* line-height: 200px; */
    }

    /* .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
      line-height: 160px;
    } */
    .content {
        height: 100%;
    }

    .main {
        height: 100%;
    }

    .el-container {
        height: 100%;
    }

    .el-menu-vertical-demo {
        border-right: 0 !important;
    }

    .el-menu-item {
        padding-left: 0; 
    }

    .UD {
        width: 200px;
        height: 100px;
        position: relative;
        margin-bottom: 20px;
    }

    .ud {
        width: 150px;
        position: absolute;
        top: 25%;
        left: 10%;
    }

    /* .exits {
      width: 240px;
      height: 100px;
      color: #ffffff;
      line-height: 100px;
      margin-right: 20px;
      position: relative;
    } */
    .help {
        margin-top: 30px;
        margin-left: 55px;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        border: #ffffff 1px solid;
        width: 100px;
        height: 22px;
        float: left;
        color: #ffffff;
    }

    .tui {
        margin-top: 30px;
        width: 80px;
        height: 22px;
        float: left;
        color: #ffffff;
        position: relative;
    }

    .tui:hover {
        color: red;
        cursor: pointer;
    }

    .out {
        width: 32px;
        position: absolute;
        top: 1px;
    }

    .name {
         margin-top: 30px;
         margin-right: 30px;
        width: 150px;
        height: 40px;
        float: left;
        color: #ffffff;
        font-size: 20px;

    }

    .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #e6f7ff !important;
    }
</style>