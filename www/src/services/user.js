import { request } from '../utils/index';
import {storageTokenKey} from '../utils/constant';
import {stringify} from 'qs';

export function createUser({payload}) {
    return request('/api/users/addUser', {
        method: 'POST',
        headers: new Headers({
            "Content-Type": "application/json; charset=utf-8"
        }),
        body: JSON.stringify({...payload.values})
    });
}
export function updateUser({values,id}) {
    return request(`/api/users/updateUser/${id}`, {
        method: 'PUT',
        headers: new Headers({
            "Content-Type": "application/json; charset=utf-8"
        }),
        body: JSON.stringify({...values})
    });
}
export function updateAvatar({values,id}) {
    return request(`/api/users/updateAvatar/${id}`, {
        method: 'PUT',
        headers: new Headers({
            "Content-Type": "application/json; charset=utf-8"
        }),
        body: JSON.stringify({...values})
    });
}
export async function remove ({id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/users/${id}`, {
        method: 'DELETE',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}

export async function getUserInfo ({id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/users/getUserInfo/${id}`, {
        method: 'GET',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}

export function fetchUserDetail({user_id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/user/${user_id}`, {
        method: 'GET',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}
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