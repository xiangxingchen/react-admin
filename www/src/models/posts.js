import {
    fetchContent,
    fetchPostInfo,
    createPost,
    getArticle,
    fetchPosts,
    deletePost,
    createComment,
    deleteComment,
    getCommentList,
    updatePost,
    changeComment,
    searchArticle,
} from '../services/posts';
import {message} from 'antd';
import pathToRegExp from 'path-to-regexp';
import {routerRedux} from 'dva/router';

export default {
    namespace: 'posts',
    state: {
        post: {
            title:  undefined,
            post_id: undefined,
            content:  undefined,
            author: {},
            created_at: null
        },
        isNew: true,
        article: {},
        postsList: [],
        descendants: [],
    },
    subscriptions: {
        //setup: function ({history, dispatch}) {
        //    history.listen(location => {
        //        if (pathToRegExp('/article/list').exec(location.pathname)) {
        //            dispatch({
        //                type: 'getPostsList',
        //                payload: {pageInfo: {limit: 10, page: 1}}
        //            });
        //        }
        //    });
        //}
    },
    effects: {
        createPost: function*({payload}, {call, put}) {
            const {title, content} = payload;
            const {data} = yield call(createPost, {title, content});
            if (data.success) {
                const {success} = data;
                message.success('创建文章成功 :)');
                yield put(routerRedux.push(`/article/list`));
            }
        },
        updatePost: function*({payload}, {call, put}) {
            const {title, content,id} = payload;
            const {data} = yield call(updatePost, {title, content, id});
            if (data.success) {
                const {id} = data;
                message.success('创建文章成功 :)');
                yield put(routerRedux.push(`/article/detail/${id}`));
            }
        },
        deletePost: function*({payload}, {call, put}) {
            const {id} = payload;
            const {data} = yield call(deletePost, {id});
            if (data.success) {
                message.success('删除文章成功 :)');
                yield put(routerRedux.push(`/article/list`));
            }
        },
        getPost: function *({payload}, {call, put}) {
            const {id, isEdit} = payload;
            const {data} = yield call(getArticle, {id});
            if (isEdit) {
                yield put({type: 'savePost', payload: data})
            } else {
                yield put({type: 'saveArticle', payload: data})
            }
        },
        searchArticle: function *({payload}, {call, put}) {
            const {search} = payload;
            const {data} = yield call(fetchPosts, {search});
            if (data) {
                yield put({
                    type: 'savePostsList',
                    payload: {data}
                });
            }
        },
        getPostsList: function *({payload}, {call, put}) {
            const {pageInfo} = payload;
            const {data} = yield call(fetchPosts, {pageInfo});
            if (data) {
                yield put({
                    type: 'savePostsList',
                    payload: {data}
                });
            }
        },
        getCommentList: function*({payload}, {call, put}) {
            const {data} = yield call(getCommentList, {aid: payload.id});
            if (data) {
                yield put({
                    type: 'saveCurrentPostComment',
                    payload: {data}
                });
            }
        },
        createComment: function*({payload}, {call, put}) {
            const {commentInput,id} = payload;
            const {data} = yield call(createComment, {commentInput, aid: id});
            if (data) {
                yield put({
                    type: 'saveCreatedComment',
                    payload: {data}
                });
                message.success('create comment successfully. :)');
            }
        },
        changeComment: function*({payload}, {call}) {
            const {checked,id} = payload;
            const {data} = yield call(changeComment, {checked, id});
            if (data.success) {
                message.success('评论设置成功');
            }
        },
        searchArticle: function*({payload}, {call, put, select}) {
            const {search} = payload;
            const {data} = yield call(searchArticle, {search});
            if (data.success) {
                yield put({ type: 'savePostsList', payload: {data}});
            }
        },
    },
    reducers: {
        changeFields: function (state, {payload}) {
            return {
                ...state,
                post: {
                    ...state.post,
                    ...payload.fields
                }
            };
        },
        savePost: function (state, {payload}) {
            return {
                ...state,
                post: {
                    ...state.post,
                    ...payload.data,
                    title: {name: 'title', value: payload.data.title},
                    content: {name: 'content', value: payload.data.content},
                },
                isNew: false
            };
        },
        saveArticle: function (state, {payload}) {
            return {
                ...state,
                article: {
                    ...payload.data,
                },
            };
        },
        savePostsList: function (state, {payload}) {
            const {data} = payload;
            return {
                ...state,
                postsList: data,
            };
        },
        saveCurrentPostComment: function (state, {payload}) {
            const {data} = payload;
            return {
                ...state,
                descendants: data.data
            };
        },
        saveCreatedComment: function (state, {payload}) {
            const {data} = payload;
            return {
                ...state,
                descendants: [...state.descendants, data.data]
            };
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
        isNewTrue (state) {
            return {
                ...state,
                post: {
                    title: undefined,
                    content: undefined,
                },
                isNew: true
            }
        },
        isNewFalse (state) {
            return {
                ...state,
                isNew: false
            }
        },
        uploadImage(state, {payload}){
            const {name}=payload;
            const content = state.post.content;
            return {
                ...state,
                post: {
                    ...state.post,
                    content: {value: content === undefined ? `![](http://localhost:9000/avatar/${name})` : content.value.concat(`![](http://localhost:9000/avatar/${name})`)}
                },
            }
        }
    }
}
