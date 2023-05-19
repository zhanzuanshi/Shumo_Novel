import axios from "axios";
import axiosRetry from "axios-retry";
 const server=axios.create({
    baseURL:'https://apis.netstart.cn/yunyuedu/',
    timeout:10000
 })
//  请求超时自动发起第二次请求
 axiosRetry(server, {//传入axios实例
   retries: 5,              // 设置自动发送请求次数
   retryDelay: (retryCount) => {
     return retryCount * 1500;      // 重复请求延迟（毫秒）
   },
   shouldResetTimeout: true,       //  重置超时时间
   retryCondition: (error) => {
     //true为打开自动发送请求，false为关闭自动发送请求
     if (error.message.includes('timeout') || error.message.includes("status code")) {
       return true;
     } else {
       return false;
     };
   }
 });
 

 export default server