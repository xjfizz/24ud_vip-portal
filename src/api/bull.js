import instance from "../config/https";


// 查看
function querys(params){
  return instance.get(`api/vip/bill?page=${params.page}&openId=${params.sendId}`)
}
// 搜索
function seek(params){
  return instance.get(`api/vip/bill?userId=${params.userId}&startTime=${params.startDate}&endTime=${params.endDate}` )
}

// 编辑
function edit(val){
  return instance.patch("vip/bills", val)
}

// 添加
function add(value){
  return instance.post("vip/bills",value)
}

export default{
  querys ,edit,add,seek
}