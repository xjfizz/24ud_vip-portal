<template>
  <div>
    <el-card class="box-card">
      <!-- 查找 -->
      <el-input style="width:300px;" placeholder="手机号查询" v-model="input" clearable @keyup.enter.native="sou"></el-input>&nbsp;
      <el-button type="primary" plain @click="sou">搜索</el-button>
      <template>
        <el-table :data="tableData" stripe style="width: 100%; margin-top:20px; padding: 10px">
          <!-- <el-table-column prop="id" label="ID号" width="180"></el-table-column> -->
           <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="userName" label="用户名称"></el-table-column>
          <el-table-column prop="tel" label="电话"></el-table-column>
          <el-table-column prop="type" label="类型">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 0">管理员</span>
              <span v-else-if="scope.row.type == 1">客户</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="是否禁用">
            <template slot-scope="scope">
              <span v-if="scope.row.state == 0">禁用</span>
              <span v-else-if="scope.row.state == 1">启用</span>
            </template>
          </el-table-column>
          <el-table-column prop="createtime" label="创建时间" width="180"></el-table-column>
          <el-table-column prop label="操作"  align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="compile(scope.row)" round size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页1 -->
      <div class="block" style="margin-top:15px">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="客户" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否禁用" :label-width="formLabelWidth">
          <el-select v-model="form.state" placeholder="请选择">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="complices()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Query1 from "../../api/admins";
import { setTimeout } from "timers";
let { querys, compile, searchs } = Query1;
export default {
  data() {
    return {
      // 分页
      count: 0,
      page: 1,

      input:'',

      // 查找
      tableDataName: "",

      tableData: [
        {
          id: "",
          username: "",
          password: "",
          tel: "",
          createTime: "",
          type: "",
          state: ""
        }
      ],
      dialogFormVisible: false,
      form: {
        id: "",
        tel: "",
        type: 0,
        state: ""
      },
      formLabelWidth: "70px",
      userInfo: {}
    };
  },
  methods: {
    init() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val;
      this.querys();
    },
    // 搜索
    sou() {
     this.page = 1
     this.querys()
       
    },
    // 查看
    querys() {
      this.page = this.page - 1;
      let params = {
        pageIndex: this.page,
        type: 0,
        tel: this.input || ''
      }
      querys(params).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.rows;
          this.count = res.data.data.total
        }
      });
    },
    // 编辑
    compile(row) {
      this.dialogFormVisible = true;
      this.form = {
        tel: row.tel,
        vuserId: row.vuserId,
        type: String(row.type),
        state: String(row.state)
      };
    },
    checkPhone() {
      if (!/^1[3456789]\d{9}$/.test(this.form.tel)) {
        // alert("手机号码有误，请重填");
        this.$message.error("请重新输入");
        return false;
      } else {
        return true;
      }
    },
    complices() {
      let isSave = this.checkPhone();
      if (isSave) {
        compile(this.form).then(res => {
          console.log("res", res);
          if (res.status == 200) {
            this.$message.success("编辑成功");
            this.dialogFormVisible = false;
            this.page = 1
            this.querys();
          } else {
            this.$message.error("编辑失败");
          }
      
        });
      }
     
    }
  },
  created() {
    this.init()
    this.querys();
  }
};
</script>

<style>
</style>