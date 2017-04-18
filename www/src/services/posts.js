import { request } from '../utils/index'
import {stringify} from 'qs';
import {storageTokenKey} from '../utils/constant';

export function fetchPosts({pageInfo, keyword, user_id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/getArticleList?${stringify({...pageInfo, keyword, user_id})}`, {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}

export function fetchContent({post_id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/${post_id}/content`, {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}

export function fetchComments({post_id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/comments?${stringify({post_id})}`, {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}

export function createPost({title, content}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request('/api/article/addArticle', {
        method: 'POST',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
        }),
        body: JSON.stringify({
            title, content
        })
    });
}

export function getArticle({id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/getArticle/${id}`, {
        method: 'GET',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
        }),
    });
}

export function setVisibilityOfPost({visible, post_id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/${post_id}`, {
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

export function deletePost({post_id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/${post_id}`, {
        method: 'DELETE',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
        })
    });
}

export function fetchPostInfo({post_id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/${post_id}`, {
        method: 'GET',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
        })
    });
}

export function fetchImageList() {
    const token = window.localStorage.getItem(storageTokenKey);
    return request('/api/file/getImageList', {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
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

