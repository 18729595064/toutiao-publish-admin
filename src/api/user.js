/**
 * 用户相关请求模块
 *
 * */
import request from "../utils/request";


//用户登录
export const login = data => {
  return request({
    method: 'POST',
    url:"/app/v1_0/authorizations",
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  const user = JSON.parse(window.localStorage.getItem("user")).token;
  // console.log(user);
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile',
    // 后端要求把需要授权的用户身份放到请求头
  //  axios可以通过headers选项设置请求头  现在我们在拦截器中实现该功能
  //   headers: {
  //     Authorization: `Bearer ${user}`
  //   }
  })
}

//修改用户信息
export const updateUser = () => {

}