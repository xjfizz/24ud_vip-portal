<template>
    <div>
        <el-card class="box-card">
            <!-- 一 -->
            <div>
                <el-input style="width:300px;" placeholder="请输入订单号" v-model="input" clearable
                          @keyup.enter.native="sou"></el-input>&nbsp;
                <el-button type="primary" plain @click="sou">搜索</el-button>
                <!--                <div style="float:right">-->
                <!--                    账户选择-->
                <!--                    <el-select v-model="value" clearable placeholder="请选择" disabled>-->
                <!--                        <el-option-->
                <!--                                v-for="item in options"-->
                <!--                                :key="item.value"-->
                <!--                                :label="item.label"-->
                <!--                                :value="item.value"-->
                <!--                        ></el-option>-->
                <!--                    </el-select>-->
                <!--                </div>-->
            </div>
            <!-- 二 -->
            <!--            <div style="margin-top:15px;height:40px">-->
            <!--                <div style="width:600px;float:left">-->
            <!--                    发货时间：-->
            <!--                    <el-button type="info" plain disabled>30天</el-button>&nbsp;-->
            <!--                    <el-button type="info" plain disabled>15天</el-button>&nbsp;-->
            <!--                    <el-button type="info" plain disabled>7天</el-button>&nbsp;-->
            <!--                    <el-button type="info" plain disabled>3天</el-button>-->
            <!--                </div>-->
            <!--                <div style="float:right;width:500px">-->
            <!--                    <span style="line-height:40px">发布时间：</span>-->
            <!--                    <div class="block" style="float:right">-->
            <!--                        <el-date-picker-->
            <!--                                v-model="value1"-->
            <!--                                type="datetimerange"-->
            <!--                                range-separator="至"-->
            <!--                                start-placeholder="开始日期"-->
            <!--                                end-placeholder="结束日期"-->
            <!--                                disabled-->
            <!--                        ></el-date-picker>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->
            <!-- 三 -->
            <div style="margin-top:20px;display:flex;justify-content:space-between;">
                <div class="receive hover" :class="isHover === 1 ? 'countHover' : ''" @click="stateSearch([3],1)">
                    <div
                            style="text-align:center;margin-top:5%;display:flex;align-items:center;justify-content:center;"
                    >
                        <i class="el-icon-icon15"></i>
                        <span style="width:70px;display:block;">已揽收</span>
                        <span style="color:#13227A;font-size:32px">{{countList.received}}</span>
                    </div>
                </div>
                <div class="carriage hover" :class="isHover === 5 ? 'countHover' : ''" @click="stateSearch([2],5)">
                    <div
                            style="text-align:center;margin-top:5%;display:flex;align-items:center;justify-content:center;"
                    >
                        <i class="el-icon-icon16"></i>
                        <span style="width:70px;display:block;">运输中</span>
                        <span style="color:#1296DB;font-size:32px">{{countList.transfer}}</span>
                    </div>
                </div>
                <div class="dis hover" :class="isHover === 2 ? 'countHover' : ''" @click="stateSearch([6],2)">
                    <div
                            style="text-align:center;margin-top:5%;display:flex;align-items:center;justify-content:center;"
                    >
                        <i class="el-icon-icon17"></i>
                        <span style="width:70px;display:block;">派送中</span>
                        <span style="color:#D4237A;font-size:32px">{{countList.delivering}}</span>
                    </div>
                </div>
                <div class="sign hover" :class="isHover === 3 ? 'countHover' : ''" @click="stateSearch([7],3)">
                    <div
                            style="text-align:center;margin-top:5%;display:flex;align-items:center;justify-content:center;"
                    >
                        <i class="el-icon-icon18"></i>
                        <span style="width:70px;display:block;">已签收</span>
                        <span style="color:#78E4B4;font-size:32px">{{countList.signed}}</span>
                    </div>
                </div>
                <div class="abn hover" :class="isHover === 4 ? 'countHover' : ''" @click="stateSearch([0],4)">
                    <div
                            style="text-align:center;margin-top:5%;display:flex;align-items:center;justify-content:center;"
                    >
                        <i class="el-icon-icon19" style></i>
                        <span style="width:70px;display:block;">异常件</span>
                        <span style="color:#FFC66C;font-size:32px">{{countList.abnormal}}</span>
                    </div>
                </div>
            </div>
            <!-- 四 -->
            <div style="margin-top:20px">
                <div style="float:left">
                    <!--                    <el-button type="primary" plain disabled>转寄</el-button>-->
                    <!--                    <el-button type="success" plain disabled>退回</el-button>-->
                    <!--                    <el-button type="info" plain disabled>变更记录</el-button>-->
                    <!-- <el-button type="primary">添加</el-button> -->
                    <!--                    <el-button type="primary" plainf @click="dialogFormVisible = true">添加</el-button>-->
                </div>
                <div style="float:right">
                    <export-excel
                            v-if="tableData !== null"
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
                <!-- 展开行 -->
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                        
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
                           
                            <el-form-item label="运单来源" style="width:45%">
                                <span v-if="props.row.sourceType == 0">代下单</span>
                                <span v-else-if="props.row.sourceType == 1">客户下单</span>
                                <span v-else-if="props.row.sourceType == 2">第三方导入</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="60"></el-table-column>
                <el-table-column label="序号" type="index" width="60"></el-table-column>
                <el-table-column prop="tdNo" label="订单编号" width="200"></el-table-column>
               <el-table-column prop="sender" label="寄件人" width="106" show-overflow-tooltip></el-table-column>
                <el-table-column prop="senderPhone" label="寄件人电话" width="200"></el-table-column>
                <el-table-column prop="senderAddress" label="寄件人地址" width="300" ></el-table-column>
                 <el-table-column prop="state" label="运单状态"  width="100" >
                        <template slot-scope="scope"> 
                            <span v-if="scope.row.state == -1">预下单</span>
                            <span v-if="scope.row.state == 1">待取件</span>
                            <span v-else-if="scope.row.state == 2">待入库</span>
                            <span v-else-if="scope.row.state == 3">待入库</span>
                            <span v-else-if="scope.row.state == 4">待运输</span>
                            <span v-else-if="scope.row.state == 5">运输中</span>
                            <span v-else-if="scope.row.state == 6">派送中</span>
                            <span v-else-if="scope.row.state == 7">已签收</span>
                            <span v-else-if="scope.row.state == 0">问题件</span>
                        </template>

                 </el-table-column>
                <el-table-column prop="receiver" label="收件人" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="receiverPhone" label="收件人电话" width="200"></el-table-column>
                <el-table-column prop="receiverAddress" label="收件人地址"  width="300" ></el-table-column>
        
            
                <el-table-column prop label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="primary" round size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 添加 -->
            <el-dialog title="添加订单" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="寄件人" :label-width="formLabelWidth">
                        <el-input v-model="form.sender" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="寄件地址" :label-width="formLabelWidth">
                        <el-input v-model="form.senderAddress" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="寄件日期" :label-width="formLabelWidth">
                        <el-date-picker
                                v-model="form.sendDate"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions1"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="寄件人电话" :label-width="formLabelWidth">
                        <el-input v-model="form.senderTel" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.receiver" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人地址" :label-width="formLabelWidth">
                        <el-input v-model="form.receiverAddress" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人电话" :label-width="formLabelWidth">
                        <el-input v-model="form.receiverTel" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="货物信息" :label-width="formLabelWidth">
                        <el-input v-model="form.goodsInfo" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="计费重量" :label-width="formLabelWidth">
                        <el-input v-model="form.goodsWeight" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="付款方式" :label-width="formLabelWidth">
                        <el-select v-model="form.paymentType" placeholder="请选择">
                            <el-option label="0" value="0"></el-option>
                            <el-option label="1" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="运单来源" :label-width="formLabelWidth">
                        <el-select v-model="form.sourceType" placeholder="请选择">f
                            <el-option label="0" value="0"></el-option>
                            <el-option label="1" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="运单状态" :label-width="formLabelWidth">
                        <el-select v-model="form.state" placeholder="请选择">
                            <el-option label="0" value="0"></el-option>
                            <el-option label="1" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="接单时间" :label-width="formLabelWidth">
                        <el-input v-model="form.orderTime" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="发件时间" :label-width="formLabelWidth">
                        <el-input v-model="form.pickerSendTime" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="派件人" :label-width="formLabelWidth">
                        <el-input v-model="form.deliver" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="additions()">确 定</el-button>
                </div>
            </el-dialog>

            <!-- 编辑 -->
            <el-dialog title="修改订单" :visible.sync="dialogFormVisibles">
                <el-form :model="forms">
                    <el-form-item label="寄件人" :label-width="formLabelWidth">
                        <el-input v-model="forms.sender" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="寄件地址" :label-width="formLabelWidth">
                        <el-input v-model="forms.senderAddress" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="寄件日期" :label-width="formLabelWidth">
                        <el-date-picker
                                v-model="forms.sendDate"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions1"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                        ></el-date-picker>
                    </el-form-item> -->
                    <el-form-item label="寄件人电话" :label-width="formLabelWidth">
                        <el-input v-model="forms.senderPhone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人姓名" :label-width="formLabelWidth">
                        <el-input v-model="forms.receiver" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人地址" :label-width="formLabelWidth">
                        <el-input v-model="forms.receiverAddress" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人电话" :label-width="formLabelWidth">
                        <el-input v-model="forms.receiverPhone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="货物信息" :label-width="formLabelWidth">
                        <el-input v-model="forms.goodsInfo" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="计费重量" :label-width="formLabelWidth">
                        <el-input v-model="forms.goodsWeight" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="付款方式" :label-width="formLabelWidth">
                        <el-select v-model="forms.payType" placeholder="请选择">
                            <el-option label="寄付" value="1"></el-option>
                            <el-option label="到付" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="运单来源" :label-width="formLabelWidth">
                        <el-select v-model="forms.sourceType" placeholder="请选择">
                            <el-option label="客户下单" value="1"></el-option>
                            <el-option label="代下单" value="2"></el-option>
                             <el-option label="第三方导入" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="运单状态" :label-width="formLabelWidth">
                        <el-select v-model="forms.state" placeholder="请选择">
                             <el-option label="预下单" value="-1"></el-option>
                            <el-option label="待取件" value="1"></el-option>
                            <el-option label="待入库" value="2"></el-option>
                             <el-option label="待运输" value="3"></el-option>
                             <el-option label="运输中" value="4"></el-option>
                             <el-option label="待出库" value="5"></el-option>
                             <el-option label="派送中" value="6"></el-option>
                             <el-option label="已签收" value="7"></el-option>
                             <el-option label="问题件" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibles = false">取 消</el-button>
                    <el-button type="primary" @click="updatas()">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 分页 -->
            <div class="block">
                <el-pagination
                        @current-change="handleCurrentChange"
                        layout="total, prev, pager, next, jumper"
                        :total="count"
                ></el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    // 导出
    import ExportExcel from "../../components/ExportExcel";

    import Print from "../../api/print.js";

    let {querys, query1, adds, updata} = Print;
    export default {
        components: {
            ExportExcel
        },
        data() {
            return {
                // 分页
                count: 0,
                page: 1,

                // 时间选择
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                input: "",
                options: [
                    {
                        value: "全部",
                        label: "全部"
                    }
                ],
                tableData: [
                ],
                form: {
                    sender: "",
                    senderAddress: "",
                    senderLocation: {},
                    sendDate: "",
                    senderTel: "",
                    receiver: "",
                    receiverAddress: "",
                    receiverLocation: {},
                    receiverTel: "",
                    goodsInfo: "",
                    goodsWeight: "",
                    paymentType: "",
                    sourceType: "",
                    state: "",
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

                forms: {
                    sender: "",
                    senderAddress: "",
                    sendDate: "",
                    senderTel: "",
                    receiver: "",
                    receiverAddress: "",
                    receiverTel: "",
                    goodsInfo: "",
                    goodsWeight: "",
                    paymentType: "",
                    sourceType: "",
                    state: "",
                    orderTime: "",
                    pickerSendTime: "",
                    deliver: ""
                },
                formLabelWidth: "150px",
                multipleSelection: [],
                dialogVisible: false,
                dialogFormVisible: false,
                dialogFormVisibles: false,
                value: "",
                value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],

                tHeader: [
                    "订单编号",
                
                    "寄件人",
                    "寄件人电话",
                    "寄件人地址",
                  
                    "收件人",
                    "收件人电话",
                    "收件人地址",
                  
                    
                   
                    "货物信息",
                    "计费重量",
                  
                    "付款方式",
                    "运单状态",
                    "运单来源",
                    "创建时间",
                ],
                tValue: [
                    "tdNo",
                  
                    "sender",
                    "senderPhone",
                    "senderAddress",
                 
                    "receiver",
                    "receiverPhone",
                    "receiverAddress",
                   
                  
                    
                    
                   
                    "goodsInfo",
                    "goodsWeight",
                  
                    "paymentType",
                    "state",
                    "sourceType",
                    "createTime",
                ],
                userInfo: {},
                exportList: [],
                location: {
                    x: 0,
                    y: 0
                },
                senderLocation: {},
                receiverLocation: {},
                countList: {},
                states:3 ,
                isHover: 1,
                isState: true
            };
        },
        methods: {
            //初始化
            init() {
                this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
            },
            // 获取状态条数
            getOrderCount() {
                console.log('params', this.form)
                let params = {
                    senderId: this.userInfo.id || ''
                }
                Print.orderCount(params.senderId).then(res => {
                    if (res.status === 200) {
                        this.countList = res.data
                    }
                    console.log('res', res)
                })
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
                this.multipleSelection = val;
                this.exportList = val
            },
            // 分页
            handleCurrentChange(val) {
                this.page = val;
                this.query1();
            },
            // 获取列表
            getList() {
                let params = {
                    page: this.page,
                    sendId: this.userInfo.userId || '',
                    level: this.userInfo.level || 0,
                    states: this.states || '',
                    input: this.input || ''
                }
                Print.querysNo(params).then(res => {
                    console.log('tableData', res, this.tableData)
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.rows;
                        this.count = res.data.data.total
                    }
                });
            },
            // 搜索
            sou() {
                // if (this.input == "") {
                //     this.$message.warning("查询条件不能为空！");
                //     return;
                // }
                // query1(this.input).then(res => {
                //     if (res.status == 200) {
                //         this.tableData = res.data;
                //         this.count = parseInt(res.headers["x-totalcount"]);
                //     }
                // });
                this.page = 0
                this.getList()
            },
            // 点击状态查询
            stateSearch(states, isHover) {
                if (this.isState) {
                    this.isHover = isHover
                    this.page = 1
                    this.query1(states)
                } else {
                    this.isHover = 0
                    this.page = 1
                    this.query1()
                }
               // this.isState = !this.isState
            },
            // 查
            query1(states) {
                this.page = this.page - 1;
                this.states = states || 3
                this.getList()
                console.log('page', this.page)
            },
            // 添
            additions() {
                this.dialogFormVisible = false;
                this.form.senderId = this.userInfo.userId
                // this.form.senderLocation = this.getPosition(this.form.senderAddress)
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
                    adds(this.form).then(res => {
                        if (res.data.code == 0) {
                            this.query1()
                            //this.form.id = res.data.id;
                            //this.tableData.push(this.form);
                            //  this.form = {};
                            this.form = {
                                sender: "",
                                senderAddress: "",
                                senderLocation: {},
                                sendDate: "",
                                senderTel: "",
                                receiver: "",
                                receiverAddress: "",
                                receiverLocation: {},
                                receiverTel: "",
                                goodsInfo: "",
                                goodsWeight: "",
                                paymentType: "",
                                sourceType: "",
                                state: "",
                                orderTime: "",
                                pickerSendTime: "",
                                deliver: ""
                                // cheapMoney: "",
                                // closeTime: "",
                                // conditionMoney: "",
                                // name: "",
                                // number: "",
                                // detailMsg: {}
                            }
                        }
                        this.$message.success("添加成功");
                    });
                    this.form = {};
                }, 500)
            },

            // 改
            handleClick(row) {
                console.log('row', row)
                this.dialogFormVisibles = true;
                this.forms = {
                    tdNo: row.tdNo,
                    sender: row.sender,
                    senderAddress: row.senderAddress,
                    senderPhone: row.senderPhone,
                    receiver: row.receiver,
                    receiverAddress: row.receiverAddress,
                    receiverPhone: row.receiverPhone,
                    goodsInfo: row.goodsInfo,
                    goodsWeight: row.goodsWeight,
                    payType: String(row.payType),
                    sourceType: String(row.sourceType),
                    state: String(row.state),
                    id:row.id,
              
                };
            },
            updatas() {
                updata(this.forms).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success("编辑成功");
                        this.dialogFormVisibles = false;
                        this.page = 1
                        this.query1();
                    } else {
                        this.$message.error("编辑失败");
                    }
                    
                });
            },
            getPosition(address) {
                console.log('address', address)
                Print.getLocation(address).then(res => {
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
                        return Address
                    }
                })
            }
        },
        created() {
            this.init()
            this.query1();
          //  this.getOrderCount()
        }
    };
</script>

<style>
    @import url("../icon.css");

    .receive {
        width: 280px;
        height: 80px;
        border: #13227a 1px solid;
        border-radius: 10px;
        font-size: 20px;
    }

    .carriage {
        width: 280px;
        height: 80px;
        border: #1296db 1px solid;
        border-radius: 10px;
        font-size: 20px;
    }

    .dis {
        width: 280px;
        height: 80px;
        border: #d4237a 1px solid;
        border-radius: 10px;
        font-size: 20px;
    }

    .sign {
        width: 280px;
        height: 80px;
        border: #78e4b4 1px solid;
        border-radius: 10px;
        font-size: 20px;
    }

    .abn {
        width: 280px;
        height: 80px;
        border: #ffc66c 1px solid;
        border-radius: 10px;
        font-size: 20px;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
<style scoped>
    .countHover {
        background: #f5f4eb;
        transition: transform 0.2s;
        transform: scale(1.1);
    }
    .hover{
        cursor: pointer
    }

</style>