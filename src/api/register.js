import instance from "../config/https";

// 查看
function query(params) {
  return instance.get(`api/vip/user/findUser?page=${params.pageIndex}&type=${params.type}&tel=${params.tel}`);
}



// 添加
function adds(val) {
  return instance.post("api/vip/user", val);
}

// 编辑
function compile(value) {
  return instance.put("api/vip/user", value);
}

// 删除
// function deletes(){
// return instance.get
// }

// 登录
function logins(value){
  return instance.post("api/login", value)
}

// 通讯录 查看
function querys1(params) {
  return instance.get(`api/vip/address/findAddressBooks?page=${params.page}&userId=${params.sendId}&tel=${params.input}&type=1`);
}

//弹框获取通讯录列表
function querys2(userId) {
  return instance.get(`api/vip/address/findAddressBooks?userId=${userId}&type=1`);
}
// 通讯录 搜索
function search(tels1) {
  return instance.get("api/vip/addresses?tel=" + tels1);
}

// 通讯录 添加
function adds1(vals) {
  return instance.post("api/vip/address", vals);
}

// 通讯录 编辑
function compile1(values) {
  return instance.put("api/vip/address", values);
}

// 通讯录 删除
function deletes1(params){
    return instance.delete(`api/vip/address`, {data:params})
}

// ？通讯录 单条删除
function deletes2(obj){
  return instance.delete("api/vip/addresses/id=" + obj.id )
}

//通讯录导出
function importExcel(form){
  return instance.post("api/vip/address", form )
}





export default {
  adds,
  query,
  compile,
  querys1,
  querys2,
  adds1,
  compile1,
  search,
  logins,
 
  deletes1,
  deletes2,
  importExcel
};
