/**
 * 文章相关接口
 * */

import request from "../utils/request";
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    params
  })
}

/**
 * 频道请求
 */
export const getArticlesChannels = ()=> {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

/**
 * 删除文章
 */
 export const deleteArticle = (target)=>{
    return request({
      method: 'DELETE',
      url: `/mp/v1_0/articles/${target}`
    })
}

/**
 * 发布文章
 */
export const publishArticle = (data, draft)=>{
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}

