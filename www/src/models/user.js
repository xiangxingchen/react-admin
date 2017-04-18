import { auth, fetchUser, getUserList, createUser, remove, getUserInfo } from '../services/user';
import {routerRedux} from 'dva/router';
import {message} from 'antd';

const storageTokenKey = 'blogDemoToken';
export default {
    namespace: 'user',
    state: {
        isLogin: false,
        user: {
            nickname: null,
            role: null,
            _id: null,
            email: null
        },
        userList:[],
        loading: false,
        loginButtonLoading: false,
        UserInfo:{
            email: undefined,
            role: undefined,
            nickname: undefined,
        },
    },
    subscriptions: {},
    effects: {
        auth: function *({payload}, {call, put}) {
            const {username, password, email} = payload;
            try {
                const {data} = yield call(auth, {username, password, email});
                // succeed to login
                if (data) {
                    const {token, user} = data;

                    // save the token to the local storage.
                    window.localStorage.setItem(storageTokenKey, token);
                    yield put({
                        type: 'authSuccess',
                        payload: {user}
                    });
                    if (user.role=='super'||user.role=='admin') {
                        yield put(routerRedux.push('/dashboard'));
                    } else {
                        yield put(routerRedux.push('/posts'));
                    }
                }
            } catch (error) {
                message.error('Wrong Username or Password.. :(', 4);
            }
        },
        enterAuth: function*({payload, onComplete}, {put, take}) {
            yield [put({type: 'checkToken'}), put({type: 'queryUser'})];
            yield [take('user/hasToken'), take('user/queryUserSuccess')];
            onComplete();
        },
        checkToken: function*({payload}, {put, call, select}) {
            // get the token from local storage.
            const token = window.localStorage.getItem(storageTokenKey);
            if (token) {
                yield put({type: 'hasToken'});
            } else {
                yield put({type: 'authFail'});
            }
        },
        logout: function *({payload}, {put}) {
            yield put({type: 'authFail'});
            window.localStorage.removeItem(storageTokenKey);
            yield put(routerRedux.push('/login'));
        },
        queryUser: function *({payload}, {put, call}) {
            const {data} = yield call(fetchUser);
            //console.log(data);
            if (data) {
                yield put({
                    type: 'queryUserSuccess',
                    payload: {account: data}
                });
            }
        },
        register: function *({payload}, {put, call}) {
            const {username, email, password, register} = payload;
            const {data} = yield call(createUser, {payload});
            if (data.success && register) {
                yield put({
                    type: 'auth',
                    payload: {username, password, email}
                });
            } else {
                yield put(routerRedux.push('/users/userlist'));
            }
        },
        *getUserList ({payload}, {put, call}) {
            yield put({ type: 'showLoading'});
            const { currentPage} = payload;
            const {data} = yield call(getUserList, {currentPage});
            if(data.data){
                yield put({ type: 'UserList',payload: {data}})
                yield put({ type: 'hideLoading'});
            }
        },
        *query ({ payload }, { call, put }) {
            yield put({ type: 'showLoading' })
            const data = yield call(query, parse(payload))
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data,
                        pagination: data.page
                    }
                })
            }
        },
        *delete ({ payload }, { call, put }) {
            yield put({ type: 'showLoading' });
            const { data }= yield call(remove, { id: payload.id });
            if (data && data.success) {
                yield put({ type: 'getUserList',payload: {currentPage:0}})
            }
            yield put({ type: 'hideLoading'});
        },
        *userInfo({ payload }, { call, put }) {
            const { data }= yield call(getUserInfo, { id: payload.id });
            if (data && data.success) {
                yield put({ type: 'UserInfo',payload: {data}})
            }
        }
    },
    reducers: {
        authSuccess: function (state, {payload}) {
            const {user} = payload;
            return {
                ...state,
                user,
                isLogin: true
            };
        },
        hasToken: function (state) {
            return {
                ...state,
                isLogin: true
            };
        },
        queryUserSuccess: function (state, {payload}) {
            const {account} = payload;
            return {
                ...state,
                account
            };
        },
        authFail: function (state) {
            return {
                ...state,
                isLogin: false,
                account: {
                    username: null,
                    ability: null,
                    user_id: null,
                    email: null
                }
            };
        },
        showLoginButtonLoading (state) {
            return {
                ...state,
                loginButtonLoading: true
            }
        },
        showLoading (state) {
            return {
                ...state,
                loading: true
            }
        },
        hideLoading (state) {
            return {
                ...state,
                loading: false
            }
        },
        UserList (state, {payload}) {
            const { data} = payload;
            return{
                ...state,
                userList:data.data,
            }
        },
        UserInfo (state, {payload}) {
            const { data} = payload;
            return{
                ...state,
                UserInfo:data.user,
            }
        }
    }

}
