import {
    fetchContent,
    fetchPostInfo,
    createPost,
    getArticle,
    fetchPosts,
    deletePost,
    createComment,
    deleteComment,
    getCommentList
} from '../services/posts';
import {message} from 'antd';
import pathToRegExp from 'path-to-regexp';
import {routerRedux} from 'dva/router';

export default {
    namespace: 'posts',
    state: {
        post: {
            title: undefined,
            post_id: undefined,
            content: undefined,
            author: {},
            created_at: undefined
        },
        isCreator: true,
        article: {},
        postsList: [],
        descendants: [],
    },
    subscriptions: {
        setup: function ({history, dispatch}) {
            history.listen(location => {
                if (pathToRegExp('/article/list').exec(location.pathname)) {
                    dispatch({
                        type: 'getPostsList',
                        payload: {pageInfo: {limit: 10, page: 1}}
                    });
                }
            });
        }
    },
    effects: {
        createPost: function*({payload}, {call, put}) {
            const {title, content} = payload;
            const {data} = yield call(createPost, {title, content});
            if (data.success) {
                const {success} = data;
                message.success('create post successfully :)');
                yield put(routerRedux.push(`/article/list`));
            }
        },
        getPost: function *({payload}, {call, put}) {
            const {id} = payload;
            const {data} = yield call(getArticle, {id});
            yield put({type: 'savePost', payload: data})
        },
        getPostsList: function *({payload}, {call, put}) {
            const {pageInfo, keyword} = payload;
            const {data} = yield call(fetchPosts, {pageInfo, keyword});

            if (data) {
                yield put({
                    type: 'savePostsList',
                    payload: data
                });
            }
        },
        getCommentList: function*({payload}, {call, put, select}) {
            const {data} = yield call(getCommentList, {aid: payload.id});
            if (data) {
                yield put({
                    type: 'saveCurrentPostComment',
                    payload: {data}
                });
            }
        },
        createComment: function*({payload}, {call, put, select}) {
            const {commentInput,id} = payload;
            const {data} = yield call(createComment, {commentInput, aid:id});
            if (data) {
                yield put({
                    type: 'saveCreatedComment',
                    payload: { data }
                });
                message.success('create comment successfully. :)');
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
                post: payload.data
            };
        },
        savePostsList: function (state, {payload}) {
            const {data} = payload;
            console.log(data);
            return {
                ...state,
                postsList: data,
            };
        },
        saveCurrentPostComment: function (state, {payload}) {
            const {data} = payload;
            return {
                ...state,
                descendants:data.data
            };
        },
        saveCreatedComment: function (state, {payload}) {
            const {data} = payload;
            return {
                ...state,
                descendants: [...state.descendants, data.data]
            };
        },
    }
}
