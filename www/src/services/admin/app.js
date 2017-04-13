import request from '../../utils/request'
import {stringify} from 'qs';

export async function auth (payload) {
  return request('/api/v1/token', {
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

export async function logout (params) {
  return request('http://localhost:5858/api/v1/logout', {
    method: 'post',
    data: params
  })
}

export async function userInfo (params) {
  return request('http://localhost:5858/api/v1/token', {
    method: 'get',
    data: params
  })
}
