import Cookies from 'js-cookie'

const TOKEN_KEY = 'access_token'
const REGRESH_TOKEN_KEY = 'refresh_token'
const POS_ID_KEY = 'x-shj-request-dept_pos_id'
let tokenLose = false

export const getToken = () => Cookies.get(TOKEN_KEY)

export const setToken = (token, params = {}) => {
    Cookies.set(TOKEN_KEY, token, params)
    setTokenState(false)
}

export const getRefreshToken = () => Cookies.get(REGRESH_TOKEN_KEY)

export const setRefreshToken = (token) => {
    Cookies.set(REGRESH_TOKEN_KEY, token)
}

export const getPosId = () => Cookies.get(POS_ID_KEY)

export const setPosId = (id) => {
    Cookies.set(POS_ID_KEY, id)
}

export const setTokenState = (flag = false) => {
    tokenLose = flag
}

export const getTokenState = () => {
    return tokenLose
}

export const clear = () =>{
    Cookies.remove(TOKEN_KEY)
    Cookies.remove(REGRESH_TOKEN_KEY)
    Cookies.remove(POS_ID_KEY)
}