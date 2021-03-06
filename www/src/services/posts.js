import { request } from '../utils/index'
import {stringify} from 'qs';
import {storageTokenKey} from '../utils/constant';

export function fetchPosts({pageInfo,sort,hotSort}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/getArticleList?${stringify({...pageInfo, ...sort,...hotSort })}`, {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}
export function getFrontArticleList({pageInfo,sort,hotSort,condition}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/getFrontArticleList?${stringify({...pageInfo, ...sort,...hotSort,...condition })}`, {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}
export function getAllCommentList({pageInfo}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/comment/getAllCommentList?${stringify({...pageInfo})}`, {
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
export function getArchivesArticle() {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/getArchivesArticle`, {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}


export function createPost(payload) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request('/api/article/addArticle', {
        method: 'POST',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
        }),
        body: JSON.stringify(payload)
    });
}
export function updatePost({value,id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/updateArticle/${id}`, {
        method: 'PUT',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
        }),
        body: JSON.stringify({...value})
    });
}
export function toggleLike({id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/toggleLike/${id}`, {
        method: 'PUT',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
        }),
    });
}

export function getFrontArticle({id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/getFrontArticle/${id}`, {
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
export function destroyAllSelect({id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/destroyAllSelect`, {
        method: 'POST',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
        }),
        body: JSON.stringify({id})
    });
}
export function destroyAllCommentSelect({id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/comment/destroyAllCommentSelect`, {
        method: 'POST',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8"
        }),
        body: JSON.stringify({id})
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
export function searchComment({search}){
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/comment/searchComment`, {
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
export function addNewReply({id, content}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/comment/addNewReply/${id}`, {
        method: 'post',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }),
        body: stringify({content})
    });
}

export function createCategory({values}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/tags/addTagCat`, {
        method: 'post',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }),
        body: stringify({...values})
    });
}
export function createTag({values}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/tags/addTag`, {
        method: 'post',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }),
        body: stringify({...values})
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
export function getFrontTagList() {
    const token = window.localStorage.getItem(storageTokenKey);
    return request('/api/tags/getFrontTagList', {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}
export function deleteTag({id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/tags/deleteTag/${id}`, {
        method: 'DELETE',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
        })
    });
}
export function delImg({file}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/file/delImg/${file}`, {
        method: 'DELETE',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
        })
    });
}
export function delTagCat({id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/tags/delTagCat/${id}`, {
        method: 'DELETE',
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
        })
    });
}
export function getImageList() {
    const token = window.localStorage.getItem(storageTokenKey);
    return request('/api/article/getImageList', {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}

export function getPrenext({id}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/getPrenext/${id}`, {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    });
}
export function getArticleByUserId({id,status}) {
    const token = window.localStorage.getItem(storageTokenKey);
    return request(`/api/article/getArticleByUserId/${id}?status=${status}`, {
        method: 'get',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        }),

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

