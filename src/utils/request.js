/**
 * 基于axios封装的请求模块
 * */
import axios from 'axios'

// 创建一个axios实例，说白了就是复制了一个axios
// 我们通过这个实例去发请求，把需要的配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

//拦截器
request.interceptors.request.use(
    function (config) {
      const user = JSON.parse(window.localStorage.getItem("user"));
      if (user){
        config.headers.Authorization = `Bearer ${user.token}`
      }
      return config;
    },
    function (error) {
      return Promise.reject(error)
    }
)

export default request