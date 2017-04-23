import {routerRedux} from 'dva/router';
import {message} from 'antd';
import {getLogsList} from '../services/app';
export default {
    namespace: 'app',
    state: {
        account: {ability:false,user_id:'drrr'},
        menuPopoverVisible: false,
        siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
        darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
        isNavbar: document.body.clientWidth < 769,
        navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]'),
        systemLogs:{data:[]},
    },
    subscriptions: {},
    effects: {
        *getLogsList ({ payload }, {call,put}) {
            const {logInfo} = payload;
            const data = yield call(getLogsList, {logInfo});
            if(data.data){
                yield put({ type: 'saveSysLogs',payload:data});
            }
        },
        *switchSider ({ payload }, {put}) {
            yield put({ type: 'handleSwitchSider'});
        },
        *changeTheme ({ payload }, {put}) {
            yield put({ type: 'handleChangeTheme'});
        },
        *changeNavbar ({ payload }, {put}) {
            if (document.body.clientWidth < 769) {
                yield put({type: 'showNavbar'})
            } else {
                yield put({type: 'hideNavbar'})
            }
        },
        *switchMenuPopver ({ payload }, {put}) {
            yield put({ type: 'handleSwitchMenuPopver' })
        },
        *switchMenuPopver ({ payload }, {put}) {
            yield put({ type: 'handleSwitchMenuPopver' })
        },
    },
    reducers: {
        handleSwitchSider (state) {
            localStorage.setItem('antdAdminSiderFold', !state.siderFold)
            return {
                ...state,
                siderFold: !state.siderFold
            }
        },
        handleChangeTheme (state) {
            localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
            return {
                ...state,
                darkTheme: !state.darkTheme
            }
        },
        showNavbar (state) {
            return {
                ...state,
                isNavbar: true
            }
        },
        hideNavbar (state) {
            return {
                ...state,
                isNavbar: false
            }
        },
        handleSwitchMenuPopver (state) {
            return {
                ...state,
                menuPopoverVisible: !state.menuPopoverVisible
            }
        },
        handleNavOpenKeys (state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        saveSysLogs(state,{payload}){
            return {
                ...state,
                systemLogs:payload.data,
            }
        }
    }
}
