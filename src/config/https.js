import axios from 'axios';


import { Loading,Message } from 'element-ui'; // 引入Loading服务
import Vue from 'vue'
import router from '../router'
import ElementUI from 'element-ui';

let instance = axios.create({
    //baseURL: 'https://api.24ud.cn/',
    //baseURL: 'http://192.168.1.107:8080',
    // baseURL: '/',
    timeout: 20000,
  // headers: {'content-type': 'application/json;charset=utf-8'}
});

instance.interceptors.request.use( config => {

    // Do something before request is sent
    console.log('=====config=====', config, config.url.indexOf('19996'))
  //  config.url =  '/api/' + config.url 
    if(config.url.indexOf('login') == -1) {
        let authorization = localStorage.getItem('authorization')
        config.headers.authorization = authorization
    }

    if(config.url.indexOf('19996') > -1) {
        delete config.headers.authorization
      }


  //  config.headers.Authorization = 'Bearer ' + '111'
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use( response => {
    console.log('===response======', response )
    // Do something with response data
    if(response.config.url.indexOf('login') > -1) {
        let authorization = response.headers.authorization 
        localStorage.setItem('authorization', authorization)
   }
       //  token过期强制退出
       if(response.data.code == 401 || response.data.code == 5002 || response.data.code == 5003  ) {
          // this.$message.warn(response.data.message)
        
        localStorage.clear()

        setTimeout( () => {
           // debugger
           //  router.replace({
           //      path: '/login',
           //  })
            window.location.reload()
        }, 500)
    }


    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});


export default instance