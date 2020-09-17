import createRequest, { setPosHeaders } from './request'
import { dfs, bfs } from './search'
import common from './common'
import { getToken, setToken, getRefreshToken, setRefreshToken, getPosId, setPosId, clear } from './auth'
const JuneUtil = {
    ...common,
    createRequest,
    getToken,
    setToken,
    getRefreshToken,
    setRefreshToken,
    getPosId,
    setPosId,
    setPosHeaders,
    clear,
    
    dfs,
    bfs,
};

(function (window) {
    if (window.$jutil) return
    window.$jutil = JuneUtil
}(window))

export default JuneUtil