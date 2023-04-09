import axios from 'axios'

// 创建一个axios实例，封装一些会多次用到的数据
const instance = axios.create({
  // 会自动将baseURL和输入的url拼接在一起！！！
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd'
})
// get请求
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then(
      response => {
        // 只返回需要的东西，可以更直接地看到数据、提取数据
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

// 对axios的二次封装---现在还只是封装了一些简单的东西
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        response => {
          // 只返回需要的东西，可以更直接地看到数据、提取数据
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
  })
}
