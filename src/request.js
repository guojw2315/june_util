import axios from 'axios'
import { getToken, setToken, getRefreshToken, getTokenState, setTokenState, getPosId, setRefreshToken } from './auth'

// 刷新 access_token 的接口
const refreshToken = (instance, path = '/refresh/token', baseURL) => {
    return instance.post(path + `?refreshToken=${getRefreshToken()}`, { refreshToken: getRefreshToken() }, { baseURL })
    // return instance.request({
    //     baseURL,
    //     url: path + `?refreshToken=${getRefreshToken()}`,
    //     method: 'post',
    //     data: { refreshToken: getRefreshToken() }
    // })
}

// 给请求头添加 access_token
const setHeaderToken = (instance, isNeedToken, options = {}) => {
    const refreshToken = isNeedToken ? getRefreshToken() : null
    const accessToken = isNeedToken ? getToken() : null

    if (isNeedToken) { // api 请求需要携带 access_token
        let tokenLose = getTokenState()
        if (!refreshToken && !tokenLose) {
            console.log('不存在 access_token 则跳转回登录页')
            setTokenState(true)
            options.onTokenLose && options.onTokenLose()
        }
        instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        options.setHeaders && options.setHeaders(instance)
    }
}

export const setPosHeaders = (instance, key = 'x-shj-request-dept-pos-id') => {
    instance.defaults.headers.common[key] = getPosId()
}

export default function create(config = {}, options = {}) {
    // 创建 axios 实例
    const instance = axios.create({
        // baseURL: process.env.GATSBY_API_URL,
        // baseURL: '/api',
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
        },
        ...config
    })

    let isRefreshing = false // 标记是否正在刷新 token
    let requests = [] // 存储待重发请求的数组

    instance.interceptors.response.use(response => {
        return response
    }, error => {
        if (!error.response) {
            return Promise.reject(error)
        }
        if (/^417$|^401$/g.test(error.response.status) && !error.config.url.includes('/auth/refresh')) {
            const { config } = error
            if (!isRefreshing) {
                isRefreshing = true
                return refreshToken(instance, options.refreshTokenPath, options.refreshURL || config.baseURL)
                    .then(res => {
                        const access_token = res.data[options.tokenKey || 'data']
                        const refresh_token = res.headers[options.refreshTokenKey || 'refresh_token']
                        setToken(access_token)
                        setRefreshToken(refresh_token)
                        config.headers.Authorization = `Bearer ${access_token}`
                        // token 刷新后将数组的方法重新执行
                        requests.forEach((cb) => cb(access_token))
                        requests = [] // 重新请求完清空
                        return instance(config)
                    }).catch(err => {
                        console.log('抱歉，您的登录状态已失效，请重新登录！')
                        options.onTokenLose && options.onTokenLose()
                        return Promise.reject(err)
                    }).finally(() => {
                        isRefreshing = false
                    })
            } else {
                // 返回未执行 resolve 的 Promise
                return new Promise(resolve => {
                    // 用函数形式将 resolve 存入，等待刷新后再执行
                    requests.push(token => {
                        config.headers.Authorization = `Bearer ${token}`
                        resolve(instance(config))
                    })
                })
            }
        } else {
            options.onError && options.onError(error.response)
        }

        return Promise.reject(error)
    })


    // 有些 api 并不需要用户授权使用，则无需携带 access_token；默认不携带，需要传则设置第三个参数为 true
    const get = (url, params = {}, isNeedToken = false, headers = {}) => {
        setHeaderToken(instance, isNeedToken, options)
        return instance({
            method: 'get',
            url,
            params,
            headers: { ...instance.defaults.headers, ...headers },
        })
    }

    const post = (url, {
        data = {},
        params = {},
        headers = {},
    }, isNeedToken = false) => {
        setHeaderToken(instance, isNeedToken, options)
        return instance({
            method: 'post',
            url,
            params: params,
            data: data,
            headers: { ...instance.defaults.headers, ...headers },
        })
    }

    const put = (url, {
        data = {},
        params = {},
        headers = {},
    }, isNeedToken = false) => {
        setHeaderToken(instance, isNeedToken, options)
        return instance({
            method: 'put',
            url,
            params: params,
            data: data,
            headers: { ...instance.defaults.headers, ...headers },
        })
    }

    const deleteReq = (url, {
        data = {},
        params = {},
        headers = {},
    }, isNeedToken = false) => {
        setHeaderToken(instance, isNeedToken, options)
        return instance({
            method: 'delete',
            url,
            params: params,
            data: data,
            headers: { ...instance.defaults.headers, ...headers },
        })
    }

    return {
        instance,
        get,
        post,
        put,
        deleteReq,
        setHeaderToken: () => setHeaderToken(instance, true, options),
        refreshToken: (path) => refreshToken(instance, path || options.refreshTokenPath, options.refreshURL || config.baseURL),
    }
}


