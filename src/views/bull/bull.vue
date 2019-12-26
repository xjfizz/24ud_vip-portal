<template>
    <div>
        <el-card class="box-card">
            <div class="block">
                <!-- <span class="demonstration">月</span> -->
                <!-- <el-date-picker v-model="value2" type="month" placeholder="选择年月"></el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp; -->
                <el-input style="width:300px;" placeholder="请输入用户ID" v-model="searchForm.input" clearable></el-input>&nbsp;&nbsp;
                <el-date-picker
                        v-model="searchForm.value2"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                >
                </el-date-picker>&nbsp;&nbsp;
                <el-button type="primary" plain @click="sou">搜索</el-button>
                <!--         <el-button type="primary" style="float:right" @click="dialogFormVisibles = true">添加</el-button>-->
            </div>
            <!-- 表格 -->
            <el-table :data="tableData" stripe style="width: 100%; margin-top:20px">
                <el-table-column prop="id" label="账单号" width="350px"></el-table-column>
                <el-table-column prop="userId" label="用户ID" width="100px"></el-table-column>
                <el-table-column prop="amount" label="总金额"></el-table-column>
                <el-table-column prop="count" label="件数"></el-table-column>
                <el-table-column prop="paymentState" label="支付状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.paymentState == 1">已支付</span>
                        <span v-else-if="scope.row.paymentState == 0">未支付</span>
                    </template>
                </el-table-column>
                 <el-table-column prop="createTime" label="账单生成时间"></el-table-column>
                <!-- <el-table-column prop="userId" label="关联的用户"></el-table-column> -->
                <el-table-column prop="waybills" label="包含的订单列表">
                    <template slot-scope="scope">
                        <el-button type="text" @click="orderListBtn(scope.row)">
                            {{scope.row.waybills && scope.row.waybills.length > 0 ? scope.row.waybills[0] : '暂无订单'
                            }}
                        </el-button>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop label="操作">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="primary" round size="small">编辑</el-button>
                  </template>
                </el-table-column>-->
            </el-table>
            <!-- 分页 -->
            <div class="block" style="margin-top:20px">
                <el-pagination
                        @current-change="handleCurrentChange"
                        layout="total, prev, pager, next, jumper"
                        :total="count"
                ></el-pagination>
            </div>
        </el-card>

        <!-- 添加 -->
        <el-dialog title="添加账单" :visible.sync="dialogFormVisibles">
            <el-form :model="forms">
                <el-form-item label="总金额" :label-width="formLabelWidth">
                    <el-input v-model="forms.amount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="件数" :label-width="formLabelWidth">
                    <el-input v-model="forms.count" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="关联用户" :label-width="formLabelWidth">
                    <el-input v-model="forms.userId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="支付状态" :label-width="formLabelWidth">
                    <el-select v-model="forms.paymentState" placeholder="请选择支付状态">
                        <el-option label="已支付" value="1"></el-option>
                        <el-option label="未支付" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibles = false">取 消</el-button>
                <el-button type="primary" @click="adds">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog title="编辑账单" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="总金额" :label-width="formLabelWidth">
                    <el-input v-model="form.amount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="件数" :label-width="formLabelWidth">
                    <el-input v-model="form.count" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="关联用户" :label-width="formLabelWidth">
                    <el-input v-model="form.userId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="支付状态" :label-width="formLabelWidth">
                    <el-select v-model="form.paymentState" placeholder="请选择支付状态">
                        <el-option label="已支付" value="1"></el-option>
                        <el-option label="未支付" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="redact">确 定</el-button>
            </div>
        </el-dialog>
        <!--弹框-->
        <el-dialog title="订单详情" :visible.sync="dialogTableVisible" width="500px">
            <el-table :data="orderList">
                <el-table-column prop="orderName" label="订单" width="150"></el-table-column>
                <el-table-column prop="id" label="订单编号" width="200"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import Bull from "../../api/bull";

    let {querys, edit, add, seek} = Bull;
    export default {
        data() {
            return {
                //时间搜索
                // 分页
                count: 0,
                page: 1,
                value3: "",
                value4: "",

                tableData: [
                    {
                        amount: "",
                        count: "",
                        createTime: "",
                        paymentState: "",
                        userId: "",
                        orderIdList: []
                    }
                ],
              orderList: [],
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogFormVisibles: false,
                form: {
                    amount: "",
                    count: "",
                    paymentState: "",
                    userId: ""
                },
                forms: {
                    amount: "",
                    count: "",
                    paymentState: "",
                    userId: ""
                },
                formLabelWidth: "120px",
                searchForm: {
                    value2: "",
                    input: "",
                }
            };
        },
        methods: {
            //初始化
            init(){
                this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
            },
            // 分页
            handleCurrentChange(val) {
                this.page = val;
                this.query1();
            },

            // 查看
            query1() {
                // this.page = this.page - 1;
                let params = {
                    page: this.page - 1,
                    sendId: this.userInfo.userId|| '',
                }
                querys(params).then(res => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.rows;
                        this.count = res.data.data.total
                    }
                });
            },

            // 搜索
            sou() {
                console.log('searchForm', this.searchForm, this.searchForm.value2[0])
                // if (this.input == "") {
                //   this.$message.warning("查询条件不能为空！");
                //   return;
                // }
                if (this.searchForm.value2 === undefined) {
                    this.searchForm.value2 = []
                }
                let params = {
                    userId: this.searchForm.input || '',
                    startDate: this.searchForm.value2[0] || '',
                    endDate: this.searchForm.value2[1] || '',
                }
                seek(params).then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.rows;
                        this.count = res.data.data.total
                    }
                });
            },

            // 添加
            adds() {
                this.form.userId = this.userInfo.userId
                console.log(this.forms);
                this.dialogFormVisibles = false;
                add(this.forms).then(res => {
                    if (res.data.code == 0) {
                        this.form.id = res.data.id;
                        this.tableData.push(this.form);
                    }
                });
                this.query1();
            },

            // 编辑
            handleClick(row) {
                this.dialogFormVisible = true;
                this.form = {
                    id: row.id,
                    amount: row.amount,
                    count: row.count,
                    paymentState: row.paymentState,
                    userId: row.userId
                };
            },
            redact() {
                edit(this.form).then(res => {
                    if (res.status == 200) {
                        this.$message.success("编辑成功");
                        this.dialogFormVisible = false;
                    } else {
                        this.$message.error("编辑失败");
                    }
                    this.query1();
                });
            },
          // 点击订单
          orderListBtn(val) {
              this.dialogTableVisible = true
            this.orderList = []
            // val.orderIdList.map(item => {
            //   console.log(item)
            //   this.orderList.push({ id: item})
            // })
            this.orderList = val.waybills.map(item => {
              console.log(item)
              return {orderName: '订单', id: item}
            })
          }
        },
        created() {
            this.init();
            this.query1();
``
        }
    };
</script>

<style>
    /* .el-card__body {
      padding: 0 !important;
    } */
</style>