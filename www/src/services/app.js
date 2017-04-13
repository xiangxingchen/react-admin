import { request } from '../utils/index';
import {storageTokenKey} from '../utils/constant';
import {stringify} from 'qs';

export function auth(payload) {
    return request('/api/auth/local', {
        method: 'post',
        headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }),
        body: stringify({
            ...payload,
            grant_type: 'password'
        })
    });
}


export function fetchUser() {
    const token = window.localStorage.getItem(storageTokenKey);
    return request('/api/users/user', {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}
export function getUserList({currentPage}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/users/getUserList?currentPage=${currentPage}`, {
        method: 'GET',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}