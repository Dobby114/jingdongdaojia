import axios from 'axios'
import { useRouter } from 'vue-router'

// 创建一个axios实例，封装一些会多次用到的数据
const instance = axios.create({
  // 会自动将baseURL和输入的url拼接在一起！！！
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd'
})
// get请求---传入参数，参数就暴露在url中
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
// post传入数据--数据不暴露
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

const instance2 = axios.create({
  // 会自动将baseURL和输入的url拼接在一起！！！
  baseURL: 'https://www.fastmock.site/mock/df7c8c50d53a84efa5e5bd834559edd7/JD'
})
export const get2 = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance2.get(url, { params }).then(
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
export const post2 = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance2
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.isLoginToken || '0'
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

// http 请求 拦截器
// 本地localstorage中是否有token
// 如果没有的话就回到登录界面？
// router.replace无法回到上一页
const router = useRouter()
instance2.interceptors.request.use(
  config => {
    if (localStorage.isLoginToken) {
      config.headers.Authorization = localStorage.isLoginToken
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http 响应 拦截器
instance2.interceptors.response.use(
  response => {
    if (response.data.errno === 999) {
      router.replace('/login')
      alert('token过期')
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
