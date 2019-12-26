import instance from "../config/https";

// 查看
function querys(params) {
  
  return instance.get(`api/vip/user/findUser?page=${params.pageIndex}&type=${params.type}&tel=${params.tel}`);
}

// 搜索
function searchs(params){
  return instance.get(`api/vip/users?tel=${params.tableDataName}&page=${params.pageIndex}&type=${params.type}`)
}

// 编辑
function compile(value) {
//  return instance.patch("vip/users", value);
  return instance.put("api/vip/user", value);
}

export default {
  querys,compile,searchs
};
