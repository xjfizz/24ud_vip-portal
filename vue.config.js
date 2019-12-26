/*
 * @Author: your name
 * @Date: 2019-09-23 16:51:47
 * @LastEditTime: 2019-12-09 11:50:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web-vip\vue.config.js
 */
module.exports = {
    // baseUrl  type:{string} default:'/' 
    // 将部署应用程序的基本URL
    // 将部署应用程序的基本URL。
    // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
    // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集baseUrl到'/my-app/'.

    // baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
    baseUrl: '/vip',
    publicPath: '/vip',

    // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'

    // outputDir: 'dist',

    // pages:{ type:Object,Default:undfind } 
/*
  构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
  个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
  的字符串，
  注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
*/
    // pages: {
        // index: {
            // entry for the page
            // entry: 'src/index/main.js',
            // the source template
            // template: 'public/index.html',
            // output as dist/index.html
            // filename: 'index.html'
        // },
        // when using the entry-only string format,
        // template is inferred to be `public/subpage.html`
        // and falls back to `public/index.html` if not found.
        // Output filename is inferred to be `subpage.html`.
        // subpage: 'src/subpage/main.js'
    // },

    //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
    lintOnSave: true,
    // productionSourceMap：{ type:Bollean,default:true } 生产源映射
    // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    productionSourceMap: false,
    // devServer:{type:Object} 3个属性host,port,https
    // 它支持webPack-dev-server的所有选项

    devServer: {
        port: 8012, // 端口号
      //  host: 'localhost',
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            // '/api': {
            //     target: 'http://192.168.1.107:8080',
            //     ws: true,
            //     changeOrigin: true
            // },

            '/vip/api': {
                // target: 'http://192.168.1.151:8082',
                // target: 'http://192.168.1.166:8081',
                // target: 'https://api.24ud.cn',
                // target: 'http://192.168.1.128:8081',
                // target: 'http://39.98.153.56:443', // 线上
                 target:    'https://api.24ud.cn', // 服务器
                 //target: 'http://192.168.1.153:8080',//齐群
                // target: 'http://192.168.1.106:8080',// 思润
               // target: 'http://192.168.1.153:8080',// 思润
                ws: false,
                changeOrigin: true,
                onProxyReq: function (proxyReq, req) {
                  // convert all api requests (POST/PUT/DELETE) to GET so they work in webpack dev server for mocking
                  proxyReq.method = req.method
                  proxyReq.path = req.url.replace('/vip/api', '')
                }
              },
            //   '/order': { // 订单
            //     // target: 'http://192.168.1.151:8082',
            //     // target: 'http://192.168.1.166:8081',
            //     // target: 'https://api.24ud.cn',
            //     // target: 'http://192.168.1.128:8081',
            //     // target: 'http://39.98.153.56:443', // 线上
            //      target:    'https://api.24ud.cn', // 服务器
            //     // target: 'http://192.168.1.107:8080',//齐群
            //     // target: 'http://192.168.1.106:8080',// 思润
            //     ws: false,
            //     changeOrigin: true,
            //     onProxyReq: function (proxyReq, req) {
            //       // convert all api requests (POST/PUT/DELETE) to GET so they work in webpack dev server for mocking
            //       proxyReq.method = req.method
            //       proxyReq.path = req.url.replace('/order', '')
            //     }
            //   },
            // '/foo': {
            //     target: '<other_url>'
            // }
        },  // 配置多个代理
    }
}