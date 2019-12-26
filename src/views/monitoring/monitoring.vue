<template>
    <div v-loading="loading"  element-loading-text="拼命打印中"
    element-loading-spinner="el-icon-loading">
        <el-card class="box-card">
            <!-- 一 -->
            <div   >
                <!--                <el-select v-model="value" clearable placeholder="请选择" disabled>-->
                <!--                    <el-option-->
                <!--                            v-for="item in options"-->
                <!--                            :key="item.value"-->
                <!--                            :label="item.label"-->
                <!--                            :value="item.value"-->
                <!--                    ></el-option>-->
                <!--                </el-select>&nbsp;-->
                <el-input style="width:260px;" placeholder="请输入订单号" v-model="input" clearable
                          @keyup.enter.native="searchByKey"></el-input>&nbsp;
                <el-button type="primary" plain @click="searchByKey">搜索</el-button>
                <!--                &lt;!&ndash; 账户选择 &ndash;&gt;-->
                <!--                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账户选择-->
                <!--                <el-select v-model="value1" clearable placeholder="请选择" disabled>-->
                <!--                    <el-option-->
                <!--                            v-for="item in options1"-->
                <!--                            :key="item.value1"-->
                <!--                            :label="item.label1"-->
                <!--                            :value="item.value1"-->
                <!--                    ></el-option>-->
                <!--                </el-select>-->
                 <el-upload     style="float:right"
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
                <div class="newjian">
                   

                    <el-button type="success" plain @click="dialogFormVisible = true">手工新建</el-button>&nbsp;
                    <!--                    <el-select v-model="value2" clearable placeholder="请选择">-->
                    <!--                        <el-option-->
                    <!--                                v-for="item in options2"-->
                    <!--                                :key="item.value2"-->
                    <!--                                :label="item.label2"-->
                    <!--                                :value="item.value2"-->
                    <!--                        ></el-option>-->
                    <!--                    </el-select>-->
                </div>
            </div>

            <!-- 二 -->
            <div style="width:100%;margin-top:15px">
                <!--                <div style="font-size:14px">-->
                <!--                    运单号-->
                <!--                    <el-input style="width:200px " placeholder="请输入完整运单号" v-model="input1" clearable></el-input>&nbsp;&nbsp;&nbsp;-->
                <!--                    订单号-->
                <!--                    <el-input style="width:200px " placeholder="请输入完整订单号" v-model="input2" clearable></el-input>&nbsp;&nbsp;&nbsp;-->
                <!--                    收件人-->
                <!--                    <el-input style="width:100px " placeholder v-model="input2" clearable></el-input>-->
                <!--                    <div style="width:460px;float:right;font-size:14px;">-->
                <!--                        <span style="line-height:40px">时间查询</span>-->
                <!--                        <div class="block" style="float:right">-->
                <!--                            &lt;!&ndash;              <el-date-picker&ndash;&gt;-->
                <!--                            &lt;!&ndash;                v-model="values"&ndash;&gt;-->
                <!--                            &lt;!&ndash;                type="datetimerange"&ndash;&gt;-->
                <!--                            &lt;!&ndash;                range-separator="至"&ndash;&gt;-->
                <!--                            &lt;!&ndash;                start-placeholder="开始日期"&ndash;&gt;-->
                <!--                            &lt;!&ndash;                end-placeholder="结束日期"&ndash;&gt;-->
                <!--                            &lt;!&ndash;              ></el-date-picker>&ndash;&gt;-->
                <!--                            <el-date-picker-->
                <!--                                    v-model="searchForm.value2"-->
                <!--                                    type="daterange"-->
                <!--                                    align="right"-->
                <!--                                    unlink-panels-->
                <!--                                    range-separator="至"-->
                <!--                                    start-placeholder="开始日期"-->
                <!--                                    end-placeholder="结束日期"-->
                <!--                                    format="yyyy 年 MM 月 dd 日"-->
                <!--                                    value-format="yyyy-MM-dd"-->
                <!--                            >-->
                <!--                            </el-date-picker>&nbsp;&nbsp;-->
                <!--                        </div>-->
                <!--                    </div>-->
                <!--                </div>-->
                <!--                <div style="padding-left:42%;">-->
                <!--                    <el-button type="primary" plain disabled>查询</el-button>-->
                <!--                    <el-button plain disabled>重置</el-button>-->
                <!--                    <el-button type="info" plain disabled>展开</el-button>-->
                <!--                </div>-->
            </div>
            <!-- 三 -->
            <div style="margin-top:40px">
                <el-button plain @click="print()">
                    <i class="el-icon-icon9"></i>
                    提交打印
                </el-button>
                    
                <!--                <el-button type="primary" plain>-->
                <!--                    <i class="el-icon-icon13"></i>-->
                <!--                    通知揽收-->
                <!--                </el-button>-->
                <!--                <el-button type="info" plain disabled>-->
                <!--                    <i class="el-icon-icon11"></i>-->
                <!--                    撤销订单-->
                <!--                </el-button>-->
                <!--                <el-button type="danger" plain disabled>-->
                <!--                    <i class="el-icon-icon8"></i>-->
                <!--                    删除订单-->
                <!--                </el-button>-->
                <!--                <el-button type="success" plain disabled>-->
                <!--                    <i class="el-icon-icon10"></i>-->
                <!--                    复制订单-->
                <!--                </el-button>-->
                <!--                <el-button type="primary" plain disabled>-->
                <!--                    <i class="el-icon-icon12"></i>-->
                <!--                    编辑订单-->
                <!--                </el-button>-->
                <!--                <el-button type="warning" plain>-->
                <!--                    <i class="el-icon-icon9"></i>-->
                <!--                    打印历史-->
                <!--                </el-button>-->
            </div>
            <!-- 四 -->
            <div style="margin-top:15px">
                <!--                <el-button disabled>订单数</el-button>-->
                <!--                <el-button type="primary" disabled>未提交</el-button>-->
                <!--                <el-button type="success">未打印</el-button>-->
                <!--                <el-button type="warning">已打印</el-button>-->
                <!--                <el-button type="info" disabled>已撤销</el-button>-->

                <div style="float:right">
                    <!--          <el-button plain>导出</el-button>-->
                    <export-excel
                            :list="exportList"
                            :tHeader="tHeader"
                            :tValue="tValue"
                    >导出
                    </export-excel>
                    <!--                    <el-button plain disabled>显示设置</el-button>-->
                </div>
            </div>
            <!-- 表格 -->
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%;margin-top:15px"
                    @selection-change="handleSelectionChange"
            >
                <!--展开行-->
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="派件人" style="width:45%">
                                <span>{{ props.row.sender }}</span>
                            </el-form-item>
                     
                            <el-form-item label="货物信息" style="width:45%">
                                <span>{{ props.row.goodsInfo }}</span>
                            </el-form-item>
                           
                            <el-form-item label="计费重量" style="width:45%">
                                <span>{{ props.row.goodsWeight }}</span>
                            </el-form-item>
                            
                            <el-form-item label="付款方式" style="width:45%">
                                <span v-if="props.row.payType == 1">到付</span>
                                <span v-else-if="props.row.payType == 2">寄付</span>
                            </el-form-item>
                            <el-form-item label="运单状态" style="width:45%">
                                <span v-if="props.row.state == 0">问题件</span>
                                <span v-else-if="props.row.state == 1">待取件</span>
                                <span v-else-if="props.row.state == 2">待入库</span>
                                <span v-else-if="props.row.state == 3">待运输</span>
                                <span v-else-if="props.row.state == 4">运输中</span>
                                <span v-else-if="props.row.state == 5">待出库</span>
                                <span v-else-if="props.row.state == 6">派送中</span>
                                <span v-else-if="props.row.state == 7">已签收</span>
                                <span v-else-if="props.row.state == 8">异常件</span>
                            
                            </el-form-item>
                            <el-form-item label="运单来源" style="width:45%">
                                <span v-if="props.row.sourceType == 0">代下单</span>
                                <span v-else-if="props.row.sourceType == 1">客户下单</span>
                                <span v-else-if="props.row.sourceType == 2">第三方导入</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="tdNo" label="订单编号"></el-table-column>
                <el-table-column prop="sender" label="寄件人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="senderPhone" label="寄件人电话"></el-table-column>
                <el-table-column prop="senderAddress" label="寄件人地址"></el-table-column>
                <el-table-column prop="receiver" label="收件人"></el-table-column>
                <el-table-column prop="receiverPhone" label="收件人电话"></el-table-column>
                <el-table-column prop="receiverAddress" label="收件人地址" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTime" label="创建时间" ></el-table-column>

      
        
            </el-table>
        </el-card>
        <!-- 新建-->
        <el-dialog title="添加订单" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules">
                <el-form-item label="寄件人" :label-width="formLabelWidth" prop="sender">
                    <el-input v-model="form.sender" autocomplete="off">
                        <el-button slot="append" icon="el-icon-search" @click="choice">选择联系人</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="寄件地址" :label-width="formLabelWidth" prop="senderAddress">
                    <el-cascader v-model="form.senderAddress" :options="options" clearable></el-cascader>
                    <el-input v-model="form.senderDetailed" autocomplete="off"
                              style="width: 300px;margin-left: 10px"></el-input>
                </el-form-item>
        
                <el-form-item label="寄件人电话" :label-width="formLabelWidth" prop="senderPhone">
                    <el-input v-model="form.senderPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收件人姓名" :label-width="formLabelWidth" prop="receiver">
                    <el-input v-model="form.receiver" autocomplete="off">
                        <el-button slot="append" icon="el-icon-search" @click="choices">选择联系人</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="收件人地址" :label-width="formLabelWidth" prop="receiverAddress">
                    <el-cascader v-model="form.receiverAddress" :options="options1" clearable></el-cascader>
                    <el-input v-model="form.receiverDetailed" autocomplete="off"
                              style="width: 300px;margin-left: 10px"></el-input>
                </el-form-item>
                <el-form-item label="收件人电话" :label-width="formLabelWidth" prop="receiverPhone">
                    <el-input v-model="form.receiverPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="货物信息" :label-width="formLabelWidth" prop="goodsInfo">
                    <el-input v-model="form.goodsInfo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="计费重量" :label-width="formLabelWidth" prop="goodsWeight">
                    <el-input v-model="form.goodsWeight" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="付款方式" :label-width="formLabelWidth" prop="paymentType">
                    <el-select v-model="form.payType" placeholder="请选择">
                        <el-option label="到付" value="1"></el-option>
                        <el-option label="寄付" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="运单来源" :label-width="formLabelWidth" prop="sourceType">
                    <el-select v-model="form.sourceType" placeholder="请选择">
                        <el-option label="代下单" value="1"></el-option>
                        <el-option label="客户下单" value="2"></el-option>
                        <el-option label="第三方导入" value="3"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="additions()">确 定</el-button>
            </div>
        </el-dialog>

        <!--        通讯录弹出框-->
        <el-dialog title="通讯录姓名" :visible.sync="dialogTableVisible" width="800px">
            <el-table :data="gridData">
                <el-table-column prop="name" label="收/寄件人姓名"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column prop="tel" label="电话"></el-table-column>
                <el-table-column prop="" label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button @click="pitch(scope.row)" type="primary" round size="small">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <template>
                <el-pagination
                        small
                        layout="prev, pager, next"
                        :total=count>
                </el-pagination>
            </template> -->
        </el-dialog>

        <!--        弹框2-->
        <el-dialog title="通讯录姓名" :visible.sync="dialogTableVisibles" width="800px">
            <el-table :data="gridDatas">
                <el-table-column prop="name" label="收/寄件人姓名"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column prop="tel" label="电话"></el-table-column>
                <el-table-column prop="" label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button @click="pitchs(scope.row)" type="primary" round size="small">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--            分页-->
            <!-- <template>
                <el-pagination
                        small
                        layout="prev, pager, next"
                        :total=count>
                </el-pagination>
            </template> -->
        </el-dialog>

        <!-- 分页 -->
        <div style="margin-top:15px;text-align:center">
            <el-pagination
                    @current-change="handleCurrentChange"
                    layout="total, prev, pager, next, jumper"
                    :total="count"
            ></el-pagination>
            </div>

    </div>
</template>

<script>
    import getP from "../../api/print";
    import ExportExcel from "../../components/ExportExcel";
    import { Loading } from 'element-ui';


    import excelConfig from '../../units/excel.config'
    import excelEditConfig from '../../units/excel.edit'
    import excel from '../../units/excel'

    import Print from "../../api/print.js";
    import Address from "../../api/register"
    import {citys} from "../../units/city"

    let {adds} = Print;
    let {querys2} = Address
    let {getPdf, printPdf, importOrder} = getP;
    export default {
        components: {
            ExportExcel
        },
        data() {
            return {
                // 时间选择
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                // options: [
                //     {
                //         value: "选项1",
                //         label: "黄金糕"
                //     }
                // ],
                // options1: [
                //     {
                //         value1: "选项1",
                //         label1: "黄金糕"
                //     }
                // ],
                // options2: [
                //     {
                //         value2: "选项1",
                //         label2: "批量导入"
                //     }
                // ],
                //选择联系人
                gridData: [{
                    name: "",
                    address: "",
                    tel: ""
                }],
                gridDatas: [{
                    name: "",
                    address: "",
                    tel: "",
                    userId:""
                }],
                dialogTableVisible: false,
                dialogTableVisibles: false,
                options: [{
                    value: '江苏',
                    label: '江苏',
                    children: [{
                        value: '苏州',
                        label: '苏州',
                        children: [{
                            value: '姑苏区',
                            label: '姑苏区'
                        }, {
                            value: '虎丘区',
                            label: '虎丘区'
                        }, {
                            value: '相城区',
                            label: '相城区'
                        }, {
                            value: '吴中区',
                            label: '吴中区'
                        }, {
                            value: '吴江区',
                            label: '吴江区'
                        }]
                    }]
                }],
                options1: [{
                    value: '江苏',
                    label: '江苏',
                    children: [{
                        value: '苏州',
                        label: '苏州',
                        children: [{
                            value: '姑苏区',
                            label: '姑苏区'
                        }, {
                            value: '虎丘区',
                            label: '虎丘区'
                        }, {
                            value: '相城区',
                            label: '相城区'
                        }, {
                            value: '吴中区',
                            label: '吴中区'
                        }, {
                            value: '吴江区',
                            label: '吴江区'
                        }]
                    }]
                }],
                value: "",
                input: "",
                input1: "",
                input2: "",
                value1: "",
                value2: "批量导入",
                values: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                tableData: [
                    {
                        tdNo: "",
                        senderId: "",
                        sourceType: "",
                        sender: "",
                        senderPhone: "",
                        senderAddress: "",
                        sendDate: "",
                        receiver: "",
                        receiverPhone: "",
                        receiverAddress: "",
                        pickerSendTime: "",
                        signState: "",
                        deliver: "",
                        deliverId: "",
                        goodsInfo: "",
                        goodsWeight: "",
                        orderTime: "",
                        paymentType: "",
                        state: "",
                    }
                ],
                multipleSelection: [],
                tHeader: [
                    "订单编号",
                    "寄件人ID",
                    "寄件人",
                    "寄件人电话",
                    "寄件人地址",
                    "寄件日期",
                    "收件人",
                    "收件人电话",
                    "收件人地址",
                    "签收状态",
                    "签收时间",
                    "签收类型",
                    "派件人",
                    "派件人ID",
                    "货物信息",
                    "计费重量",
                    "接单时间",
                    "付款方式",
                    "运单状态",
                    "运单来源"
                ],
                tValue: [
                    "tdNo",
                    "senderId",
                    "sender",
                    "senderPhone",
                    "senderAddress",
                    "sendDate",
                    "receiver",
                    "receiverPhone",
                    "receiverAddress",
                    "signState",
                    "signTime",
                    "signType",
                    "deliver",
                    "deliverId",
                    "goodsInfo",
                    "goodsWeight",
                    "orderTime",
                    "paymentType",
                    "state",
                    "sourceType"
                ],
                form: {
                    sender: "",
                    senderAddress: "",
                    senderDetailed: "",
                    receiverDetailed: "",
                    senderLocation: {},
                    sendDate: "",
                    senderPhone: "",
                    receiver: "",
                    receiverAddress: "",
                    receiverLocation: {},
                    receiverPhone: "",
                    goodsInfo: "",
                    goodsWeight: "",
                    paymentType: "",
                    sourceType: "",
                    state: -1,
                    orderTime: "",
                    pickerSendTime: "",
                    deliver: ""
                    // cheapMoney: "",
                    // closeTime: "",
                    // conditionMoney: "",
                    // name: "",
                    // number: "",
                    // detailMsg: {}
                },
                formLabelWidth: "150px",
                dialogFormVisible: false,
                exportList: [],
                searchForm: {
                    value2: "",
                    input: "",
                },

                // 分页
                count: 10,
                page: 1,
                loading: false,
                userInfo: {},
                rules: {
                    sender: [
                        {required: true, message: '请填写寄件人', trigger: 'blur'},
                    ],
                    senderAddress: [
                        {required: true, message: '请填写地址', trigger: 'blur'},
                    ],
                    sendDate: [
                        {required: true, message: '请选择寄件时间', trigger: 'blur'},
                    ],
                    senderPhone: [
                        {required: true, message: '请填写寄件人电话', trigger: 'blur'},
                    ],
                    receiver: [
                        {required: true, message: '请填入收件人姓名', trigger: 'blur'},
                    ],
                    receiverAddress: [
                        {required: true, message: '请填入收件人地址', trigger: 'blur'},
                    ],
                    receiverPhone: [
                        {required: true, message: '请填写收件人电话', trigger: 'blur'},
                    ],
                    goodsInfo: [
                        {required: true, message: '请填入货物信息', trigger: 'blur'},
                    ],
                    goodsWeight: [
                        {required: true, message: '请填写货物重量', trigger: 'blur'},
                    ],
                    paymentType: [
                        {required: true, message: '请选择付款方式', trigger: 'blur'},
                    ],
                    sourceType: [
                        {required: true, message: '请选择运单来源', trigger: 'blur'},
                    ],
                    orderTime: [
                        {required: true, message: '请选择接单时间', trigger: 'blur'},
                    ],
                    pickerSendTime: [
                        {required: true, message: '请选择发件时间', trigger: 'blur'},
                    ],
                    deliver: [
                        {required: true, message: '请填写派件人', trigger: 'blur'},
                    ],

                }

            };
        },
        methods: {
            //初始化
            init() {
                this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
                console.log('userInfo', this.userInfo, citys)
                this.options = citys
                this.options1 = citys
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                console.log('val', val)
                this.exportList = val
                let ids = []
                val.map(item => {
                    ids.push(item.id)
                })
                this.multipleSelection = ids;
                console.log('multipleSelection', this.multipleSelection)
            },
            //搜索
            searchByKey() {
                this.page = 0
                let params = {
                    id: this.input || '',
                    page: this.page || 0,
                    sendId: this.userInfo.userId || '',
                    state: -1,
                    level: this.userInfo.level || 0
                }
                console.log('params', params)
                getP.querys(params).then(res => {
                    console.log('----', res)
                    if (res.data.code === 200) {
                        this.tableData = res.data.data.rows;
                        this.count = res.data.data.total
                    }
                })

            },
            // 分页
            handleCurrentChange(val) {
                this.page = val;
                this.getOrderList();
            },
            //获取订单列表
            getOrderList() {
                this.page = this.page - 1
                let params = {
                    id: this.input || '',
                    page: this.page || 0,
                    sendId: this.userInfo.userId || '',
                    state: -1,
                    level: this.userInfo.level || 0
                }
                getP.querys(params).then(res => {
                    if (res.data.code === 200) {
                        this.tableData = res.data.data.rows;
                        this.count = res.data.data.total;
                    }


                    console.log("res-----", res)
                })
            },
            //添加
            additions() {
               this.form.senderId = this.userInfo.id
                // this.form.senderLocation = this.getPosition(this.form.senderAddress)
                this.form.senderAddress = this.form.senderAddress.join()
                this.form.receiverAddress = this.form.receiverAddress.join()
                console.log('this.form', this.form)
                Print.getLocation(this.form.senderAddress).then(res => {
                    if (res.status === 200) {
                        let x = 0
                        let y = 0
                        let location = res.data.geocodes[0].location
                        x = location.split(',')[0]
                        y = location.split(',')[1]
                        let Address = {
                            x: x || 0,
                            y: y || 0
                        }
                        console.log('this.location', Address)
                        this.form.senderLocation = Address
                        let city = res.data.geocodes[0].city
                        let district = res.data.geocodes[0].district
                        console.log('----city-', city)
                        console.log('----district-', district)
                      //  this.getMoney(city, district)
                        // return Address
                    }
                })
                // this.form.receiverLocation = this.getPosition(this.form.receiverAddress)
                Print.getLocation(this.form.receiverAddress).then(res => {
                    if (res.status === 200) {
                        let x = 0
                        let y = 0
                        let location = res.data.geocodes[0].location
                        x = location.split(',')[0]
                        y = location.split(',')[1]
                        let Address = {
                            x: x || 0,
                            y: y || 0
                        }
                        console.log('this.location', Address)
                        this.form.receiverLocation = Address
                        // return Address
                    }
                })
                console.log('添加---', this.form);
                setTimeout(() => {
                    console.log('添加--', this.form, this.location);
                    console.log('添加', this.form);
                    this.form.senderAddress = this.form.senderAddress + this.form.senderDetailed;
                    this.form.receiverAddress = this.form.receiverAddress + this.form.receiverDetailed
                    this.form.autoAssign = false
                    this.form.openId = this.userInfo.userId
                    this.form.sourceType = 3
                    adds(this.form).then(res => {
                        console.log('res', res);
                        if (res.data.code === 200) {
                             this.$message.success("添加成功");
                             this.page = 1
                            this.getOrderList()
                             this.dialogFormVisible = false;
                
                            //this.form.id = res.data.id;
                            //this.tableData.push(this.form);
                            //  this.form = {};
                            this.form = {
                                sender: "",
                                senderAddress: "",
                                senderLocation: {},
                                sendDate: "",
                                senderPhone: "",
                                receiver: "",
                                receiverAddress: "",
                                receiverLocation: {},
                                receiverPhone: "",
                                goodsInfo: "",
                                goodsWeight: "",
                                paymentType: "",
                                sourceType: "",
                                state: "",
                                orderTime: "",
                                pickerSendTime: "",
                                deliver: "",
                                senderDetailed: "",
                                receiverDetailed: ""
                                // cheapMoney: "",
                                // closeTime: "",
                                // conditionMoney: "",
                                // name: "",
                                // number: "",
                                // detailMsg: {}

                            }
                        } else {
                            this.$message.success(res.data.message);
                        }
                       
                    });
    
                }, 500)

            },
            //选择联系人
            choice() {
                this.dialogTableVisible = true;
                this.querys()
            },
            choices() {
                this.dialogTableVisibles = true;
                this.querys1()
            },
            querys() {
                this.gridData.userId = this.userInfo.userId
                querys2(this.gridData.userId).then(res => {
                    if (res.data.code == 200) {
                        this.gridData = res.data.data.rows
                    }
                });

            },
            querys1() {
                this.gridData.userId = this.userInfo.userId
                querys2(this.gridData.userId).then(res => {
                    if (res.data.code == 200) {
                        this.gridDatas = res.data.data.rows
                    }
                });

            },
            //选中
            pitch(row) {
                this.form.sender = row.name;
                this.form.senderAddress = row.address;
                this.form.senderPhone = row.tel;
                this.dialogTableVisible = false;
            },
            pitchs(row) {
                this.form.receiver = row.name;
                this.form.receiverAddress = row.address;
                this.form.receiverPhone = row.tel;
                this.dialogTableVisibles = false;
            },
            // 获取快递费
            getMoney(city, district) {
                let params = {
                    category: 1,
                    city: city || '',
                    district: district || '',
                    weight: this.form.goodsWeight || ''
                }
                getP.getMoney(params).then((res) => {
                    console.log('res---', res)
                    if (res.status === 200) {
                        this.form.charges = {
                            total: res.data.totalAmount
                        }
                    }
                })
            },
            // 监听打印
            print() {
                console.log('multipleSelection', this.multipleSelection)
                if (this.multipleSelection.length > 0) {
                    let options = {
                        id: this.multipleSelection || [],
                        state: 6
                    }


                    getP.printRecord(options).then(res => {
                        console.log('res-----', res)
                        // this.tableData = res
                    })
                    let params = {
                        ids: this.multipleSelection || '',
                    }
                    getPdf(params.ids).then(res => {
                        console.log('res-----', res)
                        this.printPdfs(res.data.data)
                        // this.tableData = res
                    })


                } else {
                    this.$message({
                        type: 'warning',
                        message: "当前未选中任何订单!"
                    })
                }

            },
            // 打印pdf
            printPdfs(url) {
                // let options = {
                //         lock: true,
                //         text: '打印进行中……',
                //         background: 'rgba(0, 0, 0, 0.7)'
                //     }
                // let loadingInstance = Loading.service();
                this.loading = true
                printPdf(url).then(res => {
                    console.log("res+++++", res)
                    // this.tableData = res
                    if (res.status == 200) {
                        // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        //     loadingInstance.close();
                        //  });
                          this.loading = false
                        this.$message({
                            message: "打印成功！",
                            type: 'success'
                        })
                    }
                    console.log(res)
                })
                this.page = 1
                this.getOrderList()
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




                    Print.getLocation(item.receiverAddress).then(res => {
                    if (res.status === 200) {
                        let x = 0
                        let y = 0
                        let location = res.data.geocodes[0].location
                        x = location.split(',')[0]
                        y = location.split(',')[1]
                        let Address = {
                            x: x || 0,
                            y: y || 0
                        }
                        console.log('this.location', Address)
                        // item.receiverLocation = Address
                       this.$set(item, 'receiverLocation', Address)
                        // return Address
                    }
                })


                      Print.getLocation(item.senderAddress).then(res => {
                    if (res.status === 200) {
                        let x = 0
                        let y = 0
                        let location = res.data.geocodes[0].location
                        x = location.split(',')[0]
                        y = location.split(',')[1]
                        let Address = {
                            x: x || 0,
                            y: y || 0
                        }
                        console.log('this.location', Address)
                       // item.receiverLocation = Address
                       this.$set(item, 'senderLocation', Address)
                        // return Address
                    }
                })

                    this.$set(item, 'openId', this.userInfo.userId)
                    this.$set(item, 'souceType', 3)
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


                        //   this.uploadExcel(item)
                    })
                    setTimeout(() => {
                        this.uploadExcel(results)
                    }, 500)

                }
            },
            uploadExcel(params) {
                console.log(params)
                importOrder(params).then(response => {
                    console.log('MediaAPI.upload')
                    console.log(response)
                    this.page = 1
                    this.getOrderList();
                    // this.query();
                   // this.$message.info('文件上传成功')
                })
            }


        },
        created() {
            this.init()
            this.getOrderList()
            // this.querys()
        }
    };
</script>

<style>
    @import "../icon.css";

    .newjian {
        float:right;

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
</style>
