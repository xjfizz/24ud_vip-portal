import instance from "../config/https";
import axios from 'axios';


// 查看
function querys(params){  
  if(params.level === 0) {
    return instance.get(`api/vip/waybill?page=${params.page}&state=-1&type=${params.level}`)
  } else if( params.level === 1) {
    return instance.get(`api/vip/waybill?page=${params.page}&vipUserId=${params.sendId}&state=-1&wbNo=${params.id}&type=${params.level}`)
  }

}
// 查看
function querysNo(params){
  if(params.level == 0){
    return instance.get(`api/vip/waybill?page=${params.page}&state=${params.states}&wbNo=${params.input}&type=${params.level}`)
  }else if(params.level == 1){
    return instance.get(`api/vip/waybill?page=${params.page}&vipUserId=${params.sendId}&state=${params.states}&wbNo=${params.input}&type=${params.level}`)
  }

}

// 搜索
function query1(id){
return instance.get("order/orders?id=" + id)
}
// 添加
function adds(val){
  return instance.post("api/vip/waybill",val)
}

// 编辑
function updata(val){
  return instance.put("api/todays/waybill", val)
}

// 打印
function getPdf(id){
  return instance.get('api/todays/waybill/print?ids=' + id)
}
function  printRecord(params){
  return instance.put('api/vip/waybill/batch/send', params.id)
}
//打印2
function printPdf(url) {
  // return instance.post("http://127.0.0.1:19996/")
  return axios({
    url: 'http://127.0.0.1:19996/',
    method: 'post',
    data: url,
    timeout: 0
  })
}
//计算费用
function getMoney(params){
  return instance.post(`/quote/quotes/calCharges`,params)
}
function  orderCount(params){
  return instance.get(`order/orders/groupByStateCount/${params}`)
}
// 调用地图获取经纬度
function getLocation(options) {
  // return instance.post("http://127.0.0.1:19996/")
  return axios({
    url: 'https://restapi.amap.com/v3/geocode/geo?key=677b3e3a3366f0b6cc298f0e89e6bd26&s=rsv3',
    method: 'get',
    params: {address: options},
  })
}
// 批量导入订单
function importOrder(params){
  return instance.post(`api/vip/waybill/import`,params)
}

export default{
  querys,query1,adds,updata,getPdf,printPdf,querysNo,getLocation,printRecord,orderCount,getMoney, importOrder

}