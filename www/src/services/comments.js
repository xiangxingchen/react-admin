import { request } from '../utils/index'
import {stringify} from 'qs';
import {storageTokenKey} from '../utils/constant';

export function createComment({aid, commentInput}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/comment/addNewComment`, {
        method: 'post',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }),
        body: stringify({
            aid,
            content: commentInput
        })
    });
}

export function deleteComment({comment_id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/comments/${comment_id}`, {
        method: 'delete',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}

export function setVisibilityOfComment({comment_id, visible}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/comments/${comment_id}`, {
        method: 'PATCH',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
        }),
        body: JSON.stringify({
            visible
        })
    });
}

export function patchComment({comment_id, updatedContent}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/comments/${comment_id}`, {
        method: 'PATCH',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
        }),
        body: JSON.stringify({
            content: updatedContent
        })
    });
}

export function getCommentList({aid}){
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/comment/getCommentList/${aid}`, {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}