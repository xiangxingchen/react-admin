import { request } from '../utils/index'
import {stringify} from 'qs';
import {storageTokenKey} from '../utils/constant';

export function fetchPosts({pageInfo}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/getArticleList?${stringify({...pageInfo })}`, {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}
export function getAllCommentList({pageInfo}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/comment/getAllCommentList?${stringify({...pageInfo })}`, {
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
export function updatePost({id,title, content}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/updateArticle/${id}`, {
        method: 'PUT',
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

export function deletePost({id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/deleteArticle/${id}`, {
        method: 'DELETE',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
        })
    });
}
export function delComment({id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/comment/delComment/${id}`, {
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

export function changeComment({checked, id}){
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/changeComment/${id}`, {
        method: 'POST',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
        }),
        body: JSON.stringify({checked})
    });
}
export function searchArticle({search}){
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/searchArticle`, {
        method: 'POST',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
        }),
        body: JSON.stringify({search})
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
export function createCategory({category}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/tags/addTagCat`, {
        method: 'post',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }),
        body: stringify({category})
    });
}
export function getTagCatList() {
    const token = window.localStorage.getItem(storageTokenKey);
    return request('/api/tags/getTagCatList', {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
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

