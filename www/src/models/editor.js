import {
    fetchContent,
    fetchPostInfo,
    createPost,
    patchPost
} from '../services/posts';
import {message} from 'antd';
import pathToRegExp from 'path-to-regexp';
import {routerRedux} from 'dva/router';

export default {
    namespace: 'editor',
    state: {
        post: {
            title: undefined,
            post_id: undefined,
            content: undefined,
            author: {},
            created_at: undefined
        },
        isCreator: true
    },
    subscriptions: {},
    effects: {
        initializeEditor: function *({payload, onComplete}, {call, put}) {
            const {post_id} = payload;
            const {data} = yield call(fetchPostInfo, {post_id});
            if (data) {
                yield put({
                    type: 'saveEditorInitialValue',
                    payload: {post: data}
                });
                onComplete(); // Enter the Editor Component
                yield put({type: 'initializeEditorContent'});
            }
        },
        initializeEditorContent: function*({payload}, {call, put, select}) {
            const post_id = yield select(state => state.editor.post.post_id);
            const {data} = yield call(fetchContent, {post_id});
            if (data) {
                const {content} = data;
                yield put({
                    type: 'saveEditorInitialContent',
                    payload: {content}
                });
            }
        },
        initializeCreator: function *({onComplete}, {put}) {
            yield put({type: 'saveCreatorInitialValue'});
            onComplete();
        },
        createPost: function*({payload}, {call, put}) {
            const {title, content} = payload;
            const {data} = yield call(createPost, {title, content});

            if (data.success) {
                const {success} = data;
                message.success('create post successfully :)');
                yield put(routerRedux.push(`/article/list`));
            }
        },
        patchPost: function *({payload}, {call, put}) {
            const {title, content, post_id} = payload;
            const {data} = yield call(patchPost, {title, content, post_id});
            if (data) {
                message.success('patch post successfully :)');
                yield put(routerRedux.push(`/posts/${post_id}`));
            }
        }
    },
    reducers: {
        saveEditorInitialValue: function (state, {payload}) {
            const {post} = payload;
            return {
                ...state,
                post: {
                    ...state.post,
                    ...post,
                    content: ''
                },
                isCreator: false
            };
        },
        saveEditorInitialContent: function (state, {payload}) {
            const {content} = payload;
            return {
                ...state,
                post: {
                    ...state.post,
                    content
                }
            };
        },
        saveCreatorInitialValue: function (state, {payload}) {
            return {
                isCreator: true
            };
        },
        changeFields: function (state, {payload}) {
            console.log('changeFields', payload);
            const { content, title } = payload;
            return {
                ...state,
                post: {
                    ...state.post,
                    content,
                    title
                }
            };
        }
    }
}
