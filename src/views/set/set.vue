<template>
    <div>
        <el-card class="box-card">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <!-- 通讯录 -->
                <el-tab-pane label="通讯录" name="second">
                    <div>
                        <el-upload
                                class='image-uploader'
                                :multiple='false'
                                :auto-upload='true'
                                list-type='text'
                                :show-file-list='true'
                                :before-upload="beforeUpload"
                                action=''
                                :limit="10"
                                :on-exceed="handleExceed"
                                :http-request="uploadFile">
                            <el-button type="info" plain>批量导入</el-button>
                        </el-upload>
                    </div>
                    <div style="margin-top:20px; display:flex;justify-content:space-between">
                        <div>
                            <!--                            <el-select v-model="value" clearable placeholder="请选择" disabled>-->
                            <!--                                <el-option-->
                            <!--                                        v-for="item in options"-->
                            <!--                                        :key="item.value"-->
                            <!--                                        :label="item.label"-->
                            <!--                                        :value="item.value"-->
                            <!--                                ></el-option>-->
                            <!--                            </el-select>&nbsp;-->
                            <el-input style="width:300px;" placeholder="请输入手机号" v-model="input" clearable @keyup.enter.native="sou"></el-input>&nbsp;
                            <el-button type="primary" plain @click="sou">搜索</el-button>
                        </div>
                        <!--                        <div>-->
                        <!--                            账户选择-->
                        <!--                            <el-select v-model="value1" clearable placeholder="请选择" disabled>-->
                        <!--                                <el-option-->
                        <!--                                        v-for="item in optionss"-->
                        <!--                                        :key="item.value1"-->
                        <!--                                        :label="item.label1"-->
                        <!--                                        :value="item.value1"-->
                        <!--                                ></el-option>-->
                        <!--                            </el-select>-->
                        <!--                        </div>-->
                        <div>
                            <el-button type="primary" plain @click="news">新建</el-button>
                            <el-button
                                    type="danger"
                                    @click="cancle()"
                                    :disabled="this.list.length===0"
                            >删除
                            </el-button>&nbsp;
                            <!--              <el-button type="info" plain>批量导入</el-button>&nbsp;-->
                            <!--                            <el-dropdown>-->
                            <!--                                <el-button type="primary" disabled>-->
                            <!--                                    更多-->
                            <!--                                    <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                            <!--                                </el-button>-->
                            <!--                                <el-dropdown-menu slot="dropdown">-->
                            <!--                                    <el-dropdown-item></el-dropdown-item>-->
                            <!--                                </el-dropdown-menu>-->
                            <!--                            </el-dropdown>-->
                        </div>
                    </div>
                    <!-- 表格 -->
                    <el-table
                            ref="multipleTable"
                            :data="tableDatas"
                            tooltip-effect="dark"
                            style="width: 100%;margin-top:15px"
                            @selection-change="handleSelectionChanges"
                    >
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column type="index" width="55"></el-table-column>
                         <el-table-column prop="name" label="收/寄件人姓名"></el-table-column>
                         <el-table-column prop="tel" label="收/寄件人电话"></el-table-column>
                        <el-table-column prop="address" label="寄/收件人地址" width="300"></el-table-column>
                        <el-table-column  prop="cardCode" label="收/寄件人证件号"></el-table-column>
                        <el-table-column prop="cardType" label="收/寄件人证件类型" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="scope.row.cardType == 0">身份证</span>
                                <span v-else-if="scope.row.cardType == 1">护照</span>
                                <span v-else-if="scope.row.cardType == 2">居住证</span>
                                <span v-else-if="scope.row.cardType == 3">签证</span>
                                <span v-else-if="scope.row.cardType == 4">港澳通行证</span>
                                <span v-else-if="scope.row.cardType == 5">户口本</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="city" label="收/寄件人国家/地区" width="300"></el-table-column>
                       
                        <el-table-column prop="postcode" label="收/寄件人邮编" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="remark" label="备注"></el-table-column>
              
                        <el-table-column prop="type" label="类型" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="scope.row.type == 1">收件人</span>
                                <span v-else-if="scope.row.type == 2">寄件人</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="date" label="证号码"></el-table-column>
                        <el-table-column prop="name" label="备注"></el-table-column>-->
                        <el-table-column prop="address" label="操作" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button @click="handleClicks(scope.row)" type="primary" round size="small">编辑
                                </el-button>
                                <!--                                <el-button type="danger" round size="small" @click="omit(scope.row.id)">删除</el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页1 -->
                    <div class="block">
                        <el-pagination
                                @current-change="handleCurrentChange"
                                layout="total, prev, pager, next, jumper"
                                :total="count"
                        ></el-pagination>
                    </div>
                </el-tab-pane>
                <!-- 批量模板 -->
                <!-- <el-tab-pane label="批量导入模板" name="first" disabled>
                    <i class="el-icon-icon7"></i>&nbsp;
                    <span class="pi" style="color:#409EFF;">批量导入模板</span>
                    <div class="news">
                        <div class="new">新建导入模板</div>&nbsp;&nbsp;
                        <div class="deletes">删除</div>
                    </div>
                    <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column label="模板名称" prop="date">
                            <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column prop="name" label="Excel名称"></el-table-column>
                        <el-table-column prop="address" label="备注" show-overflow-tooltip></el-table-column>
                        <el-table-column prop label="类型" show-overflow-tooltip></el-table-column>
                        <el-table-column prop label="操作" show-overflow-tooltip></el-table-column>
                    </el-table>
                    分页
                    <div class="block">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-size="100"
                        layout="total, prev, pager, next, jumper"
                        :total="400"
                      ></el-pagination>
                    </div>
                </el-tab-pane> -->
            </el-tabs>
        </el-card>

        <!-- 通讯录 新建 -->
        <el-dialog title="通讯录添加" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" :rules="rules">
                 <el-form-item label="收/寄件人姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="收/寄件人电话" :label-width="formLabelWidth" prop="tel">
                    <el-input v-model="form.tel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收/寄件人地址" :label-width="formLabelWidth" prop="address">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收/寄件人证件号" :label-width="formLabelWidth" prop="cardCode">
                    <el-input v-model="form.cardCode" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="收/寄件人证件类型" :label-width="formLabelWidth" prop="cardType">
                    <el-select v-model="form.cardType" placeholder="请选择类型">
                        <el-option label="身份证" value="0"></el-option>
                        <el-option label="护照" value="1"></el-option>
                        <el-option label="居住证" value="2"></el-option>
                        <el-option label="签证" value="3"></el-option>
                        <el-option label="港澳通行证" value="4"></el-option>
                        <el-option label="户口本" value="5"></el-option>
                    </el-select>
                </el-form-item>
               
                <el-form-item label="收/寄件人邮编" :label-width="formLabelWidth" prop="postcode">
                    <el-input v-model="form.postcode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收/寄件人国家/地区" :label-width="formLabelWidth" prop="city">
                    <el-input v-model="form.city" autocomplete="off"></el-input>
                </el-form-item>
               
                <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option label="收件人" value="1"></el-option>
                        <el-option label="寄件人" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('form')">取 消</el-button>
                <el-button type="primary" @click="addtion('form')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 通讯录 编辑 -->
        <el-dialog title="通讯录添加" :visible.sync="dialogFormVisibles">
            <el-form :model="forms">
                <el-form-item label="收/寄件人地址" :label-width="formLabelWidth">
                    <el-input v-model="forms.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收/寄件人证件号" :label-width="formLabelWidth">
                    <el-input v-model="forms.cardCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收/寄件人证件类型" :label-width="formLabelWidth">
                    <el-select v-model="forms.cardType" placeholder="请选择类型">
                        <el-option label="身份证" value="0"></el-option>
                        <el-option label="护照" value="1"></el-option>
                        <el-option label="居住证" value="2"></el-option>
                        <el-option label="签证" value="3"></el-option>
                        <el-option label="港澳通行证" value="4"></el-option>
                        <el-option label="户口本" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收/寄件人姓名" :label-width="formLabelWidth">
                    <el-input v-model="forms.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收/寄件人邮编" :label-width="formLabelWidth">
                    <el-input v-model="forms.postcode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收/寄件人国家/地区" :label-width="formLabelWidth">
                    <el-input v-model="forms.city" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收/寄件人电话" :label-width="formLabelWidth">
                    <el-input v-model="forms.tel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="forms.remark" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="forms.type" placeholder="请选择">
                        <el-option label="收件人" value="1"></el-option>
                        <el-option label="寄件人" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibles = false">取 消</el-button>
                <el-button type="primary" @click="redact()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Set from "../../api/register";
    import excelConfig from '../../units/excel.config'
    import excelEditConfig from '../../units/excel.edit'
    import excel from '../../units/excel'


    let {querys1, adds1, search, compile1, deletes1, deletes2, importExcel} = Set;
    export default {
        data() {
            return {
                // 分页1
                count: 0,
                page: 1,

                // 删除数组
                list: [],

                currentPage5: 5,
                currentPage6: 5,
                currentPage7: 5,
                currentPage8: 4,
                activeName: "second",
                tableData: [
                    {
                        date: "",
                        name: "",
                        address: ""
                    }
                ],
                // 通讯录
                tableDatas: [
                    {
                        address: "",
                        cardCode: "",
                        cardType: "",
                        city: "",
                        name: "",
                        postcode: "",
                        remark: "",
                        tel: "",
                        type: ""
                    }
                ],
                multipleSelections: [],
                multipleSelection: [],
                options: [
                    {
                        value: "收件人",
                        label: "收件人"
                    },
                    {
                        value: "寄件人",
                        label: "寄件人"
                    }
                ],
                dialogFormVisible: false,
                dialogFormVisibles: false,
                form: {
                    address: "",
                    cardCode: "",
                    cardType: "",
                    city: "",
                    name: "",
                    postcode: "",
                    remark: "",
                    tel: "",
                    type: ""
                },
                forms: {
                    address: "",
                    cardCode: "",
                    cardType: "",
                    city: "",
                    name: "",
                    postcode: "",
                    remark: "",
                    tel: "",
                    type: ""
                },
                formLabelWidth: "150px",
                options: [
                    {
                        value: "",
                        label: " "
                    }
                ],
                value: "",
                input: "",
                optionss: [
                    {
                        value1: "",
                        label1: " "
                    }
                ],
                value1: "",
                userInfo: {},
                rules: {
                    address: [
                        {required: true, message: '请输入地址', trigger: 'blur'},
                    ],
                    cardCode: [
                        {required: true, message: '请输入证件号', trigger: 'blur'},
                    ],
                    cardType: [
                        {required: true, message: '请选择证件类型', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    postcode: [
                        {required: true, message: '请输入邮编', trigger: 'blur'},
                    ],
                    // city: [
                    //     {required: true, message: '请输入国家或地区', trigger: 'blur'},
                    // ],
                    tel: [
                        {required: true, message: '请填写手机号', trigger: 'blur'},
                    ],
                    remark: [
                        {required: true, message: '请输入备注', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '请选择类型', trigger: 'blur'},
                    ],

                }
            };
        },
        methods: {
            getList() {
                let params = {
                    page: this.page - 1,
                    sendId: this.userInfo.userId || '',
                    input: this.input || ''
                }
                querys1(params).then(res => {
                    if (res.data.code == 200) {
                        this.tableDatas = res.data.data.rows;
                        this.count = res.data.data.total
                    }
                });
            },
            //初始化获取id
            init() {
                this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
    
            // 分页1
            handleCurrentChange(val) {
                this.page = val;
                this.getList()
            },
            // 分页2
            handleSizeChanges(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChanges(val) {
                console.log(`当前页: ${val}`);
            },
            // 通讯录
            // 查看
            query() {
                this.getList()
                // this.page = this.page - 1;
                // let params = {
                //     page: this.page - 1,
                //     sendId: this.userInfo.id || '',
                // }
                // querys1(params).then(res => {
                //     if (res.status == 200 && res.data.length != 0) {
                //         this.tableDatas = res.data;
                //         this.count = parseInt(res.headers["x-totalcount"]);
                //     }
                // });
            },
            // 搜索
            sou() {
                // if (this.input == "") {
                //     this.$message.warning("查询条件不能为空！");
                //     return;
                // }
                // search(this.input).then(res => {
                //     console.log(res);
                //     if (res.status == 200 && res.data.length > 0) {
                //         this.tableDatas = res.data;
                //         this.count = parseInt(res.headers["x-totalcount"]);
                //     }
                // });
                this.page = 1
                this.getList()
            },

            // 添加
            news() {
                this.dialogFormVisible = true;
            },
            addtion() {
                this.form.userId = this.userInfo.userId
                adds1(this.form).then(res => {
                    if (res.data.code == 200) {
                        this.form.id = res.data.id;
                        this.tableDatas.push(this.form);
                    }
                    this.$message.success("添加成功");
                    this.query()
                });
                this.form = {};
                this.dialogFormVisible = false;
                this.query();
            },
            resetForm(formName) {
                this.dialogFormVisible = false
                this.$refs[formName].resetFields();
            },
            // 编辑
            handleClicks(row) {
                this.dialogFormVisibles = true;
                this.forms = {
                    id: row.id,
                    address: row.address,
                    cardCode: row.cardCode,
                    cardType: String(row.cardType),
                    city: row.city,
                    name: row.name,
                    postcode: row.postcode,
                    remark: row.remark,
                    tel: row.tel,
                    type: String(row.type),
                    userId: row.userId
                };
            },
            redact() {
                compile1(this.forms).then(res => {
                    if (res.status == 200) {
                        this.$message.success("编辑成功");
                        this.dialogFormVisibles = false;
                    } else {
                        this.$message.error("编辑失败");
                    }
                    this.query();
                });
            },
            // 通讯录批量删除
            cancle() {
               console.log(this.list)
                let params = []  
                this.list.map(item => {
                    params.push(item.id)
               })
                deletes1(params).then(res => {
                    if(res.data.code == 200) {
                        this.$message.success('删除成功')
                        this.query();
                    }
                });
            },
            handleSelectionChanges(val) {
                this.list = val;
            },
            // 通讯录单条删除
            omit(id) {
                let obj = {id: id};
                let ids = [];
                ids.push(obj);
                deletes1(obj).then(res => {
                    // if (res.data.code == 0) {
                    //     this.tableDatas = this.tableDatas.filter(ele => ele.id != id);
                    // }
                    this.query();
                });
            },
            // 上传文件之前的钩子
            beforeUpload(file) {
                console.log('beforeUpload')
                console.log(file.type)
                const isText = file.type === 'application/vnd.ms-excel'
                const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                return (isText | isTextComputer)
            },
            // 上传文件个数超过定义的数量
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
            },
            // 上传文件
            uploadFile(item) {
                console.log(item)
                const fileObj = item.file
                this.readFile(fileObj)
                // // FormData 对象
                // const form = new FormData()
                // // 文件对象
                // form.append('file', fileObj)
                // // form.append('comId', this.comId)
                // console.log(JSON.stringify(form), form, fileObj)
                // // let formTwo = JSON.stringify(form)
                // importExcel(fileObj).then(response => {
                //     console.log('MediaAPI.upload')
                //     console.log(response)
                //     this.$message.info('文件：' + fileObj.name + '上传成功')
                // })
            },
            readFile(file) {
                const reader = new FileReader()
                reader.readAsArrayBuffer(file)
                reader.onloadstart = e => {

                }
                reader.onprogress = e => {
                    // this.progressPercent = Math.round((e.loaded / e.total) * 100)
                }
                reader.onerror = e => {
                    this.$message.error('文件读取出错')
                }
                reader.onload = e => {
                    this.$message.info('文件读取成功')
                    console.log('e', e)
                    const data = e.target.result
                    const {header, results} = excel.read(data, 'array', excelConfig)
                    // const tableTitle
                    const tableTitle = header.map(title => {
                        const dataIndex = excelConfig[title] || title
                        return {title, dataIndex}
                    })
                    const formItems = Object.keys(excelEditConfig)
                        .filter(key => {
                            return excelEditConfig[key]
                        })
                        .map(key => excelEditConfig[key])
                    console.log(formItems, results, tableTitle)
                    results.map(item => {

                    switch(item.cardType) {
                            case '身份证' :
                                item.cardType = 0;
                                break;
                            case '护照' :
                                item.cardType = 1;
                                break;
                            case '居住证':
                                item.cardType = 2;
                                break;
                            case '签证':
                                item.cardType = 3;
                                break;
                            case '港澳通行证':
                                item.cardType = 4;
                                break;
                            case '户口本':
                                item.cardType = 5;
                                break;
                        }

                         switch(item.type) {
                            case '收件人' :
                                item.type = 1;
                                break;
                            case '寄件人':
                                item.type = 2;
                                break;
                        }
                         item.userId = this.userInfo.userId

                          this.uploadExcel(item)
                    })
                }
            },
            uploadExcel(params) {
                importExcel(params).then(response => {
                    console.log('MediaAPI.upload')
                    console.log(response)
                     this.query();
                   // this.$message.info('文件上传成功')
                })
            }
        },
        created() {
            this.init();
            this.query();
        }
        
    };
</script>
<style>
    @import "../icon.css";

    .news {
        float: right;
    }

    .pi:hover {
        cursor: pointer;
    }

    .new {
        border: #409eff 1px solid;
        border-radius: 5px;
        font-size: 14px;
        padding-left: 5px;
        padding-right: 5px;
        color: #409eff;
        float: left;
    }

    .new:hover {
        cursor: pointer;
    }

    .deletes {
        float: right;
        border: #409eff 1px solid;
        border-radius: 5px;
        font-size: 14px;
        padding-left: 5px;
        padding-right: 5px;
        color: #409eff;
    }

    .deletes:hover {
        cursor: pointer;
    }

    .el-dropdown {
        vertical-align: top;
    }

    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>