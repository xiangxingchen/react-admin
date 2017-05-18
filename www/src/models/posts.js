import {
    fetchContent,
    fetchPostInfo,
    createPost,
    getFrontArticle,
    fetchPosts,
    deletePost,
    destroyAllSelect,
    createComment,
    deleteComment,
    getCommentList,
    updatePost,
    changeComment,
    searchArticle,
    createCategory,
    getTagCatList,
    getFrontTagList,
    getAllCommentList,
    delComment,
    addNewReply,
    getImageList,
    getPrenext,
    getArticleByUserId,
    toggleLike,
    getFrontArticleList,
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
        hotList:[],
        descendants: [],
        allComment:{data:[]},
        tagCat:[],
        tags:[],
        imagePostList:[],
        preNext:{next:{},prev:{}},
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
            const {type,value,id} = payload;
            console.log(type,value,id)
            const {data} = yield call(createPost, value);
            if (data.success) {
                if(type ==='f'){
                    yield put(routerRedux.push(`/f/user/${id}`));
                } else {
                    yield put(routerRedux.push(`/article/list`));
                }
                message.success('创建文章成功 :)');
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
        toggleLike: function*({payload}, {call, put}) {
            const {id} = payload;
            const {data} = yield call(toggleLike, {id});
            if (data.success) {
                const {id} = data;
                message.success('点赞👍');
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
        destroyAllSelect: function*({payload}, {call, put}) {
            const {id} = payload;
            const {data} = yield call(destroyAllSelect, {id});
            if (data.success) {
                message.success('删除文章成功 :)');
                yield put(routerRedux.push(`/article/list`));
            }
        },
        getPost: function *({payload}, {call, put}) {
            const {id, isEdit} = payload;
            const {data} = yield call(getFrontArticle, {id});
            if (isEdit) {
                yield put({type: 'savePost', payload: data})
            } else {
                yield put({type: 'saveArticle', payload: data})
            }
        },
        getImageList: function *({payload}, {call, put}) {
            const {data} = yield call(getImageList);
            if (data) {
                yield put({
                    type: 'saveImagePostsList',
                    payload: {data}
                });
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
            const {pageInfo,type} = payload;

            const hotSort={sortName:'visit_count',sortOrder:false};
            const sort={sortName:'publish_time',sortOrder:false};
            const {data} = yield call(fetchPosts, {pageInfo,sort});
            if(type === 'hot') {
                const hotData = yield call(fetchPosts, {pageInfo,hotSort});
                // console.log(hotData);
                yield put({
                    type: 'saveHotPostsList',
                    payload: {hotData}
                });
            }
            if (data) {
                yield put({
                    type: 'savePostsList',
                    payload: {data,type}
                });
            }
        },
        getFrontArticleList: function *({payload}, {call, put}) {
            const {pageInfo,condition} = payload;
            const sort={sortName:'publish_time',sortOrder:false};
            const {data} = yield call(getFrontArticleList, {pageInfo,sort,condition});
            if (data) {
                yield put({
                    type: 'savePostsList',
                    payload: {data}
                });
            }
        },
        getArticleByUserId:function *({payload}, {call, put}) {
            const {id,status} = payload;
            const {data} = yield call(getArticleByUserId, {id,status});
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
        createCategory: function*({payload}, {call, put, select}) {
            const {category} = payload;
            const {data} = yield call(createCategory, {category});
            if (data.success) {
                yield put({ type: 'savePostsList', payload: {data}});
            }
        },
        getTagCatList: function*({payload}, {call, put, select}) {
            const {data} = yield call(getTagCatList);
            if (data) {
                yield put({ type: 'saveTagCat', payload: {data}});
            }
        },
        getFrontTagList: function*({payload}, {call, put, select}) {
            const {data} = yield call(getFrontTagList);
            if (data) {
                yield put({ type: 'saveTags', payload: {data}});
            }
        },
        getAllCommentList: function *({payload}, {call, put}) {
            const {pageInfo} = payload;
            const data= yield call(getAllCommentList, {pageInfo});
            if (data) {
                yield put({
                    type: 'saveAllComment',
                    payload: {data}
                });
            }
        },
        delComment: function *({payload}, {call, put}) {
            const {id,index} = payload;
            const {data} = yield call(delComment, {id});
            if (data.success) {
                yield put({
                    type: 'afterDelComment',
                    payload: {index}
                });
                message.success('删除评论成功');
            }
        },
        addNewReply: function *({payload}, {call, put}) {
            const {id,content} = payload;
            const {data} = yield call(addNewReply, {id,content});
            if (data.success) {
                yield put({
                    type: 'afterDelComment',
                    payload: {index}
                });
                message.success('删除评论成功');
            }
        },
        getPrenext: function *({payload}, {call, put}) {
            const {id} = payload;
            const {data} = yield call(getPrenext, {id});
            if (data) {
                yield put({
                    type: 'savePrenext',
                    payload: {data}
                });
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
            const {data,type} = payload;
            const oldData = state.postsList.data||[];
            data.data.map(item=>{
                oldData.push(item);
            })
            if(type === 'more'){
                return {
                    ...state,
                    postsList: {
                        currentPage:data.currentPage,
                        count:data.count,
                        data: oldData,
                    },
                };
            } else{
                return {
                    ...state,
                    postsList: data,
                };
            }
        },
        saveHotPostsList: function (state, {payload}) {
            const {hotData} = payload;
            return {
                ...state,
                hotList: hotData.data,
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
        },
        saveAllComment(state, {payload}){
            return {
                ...state,
                allComment:payload.data.data
            }
        },
        afterDelComment(state, {payload}){
            const {index}=payload;
            const {allComment}=state;
            return {
                ...state,
                allComment:{
                    ...allComment,
                    count:allComment.count-1,
                    data:[
                        ...allComment.data.slice(0,index),
                        ...allComment.data.slice(index + 1),
                    ]
                }
            }
        },
        saveTagCat(state, {payload}){
            const {data}=payload;
            return {
                ...state,
                tagCat:data.data
            }
        },
        saveTags(state, {payload}){
            const {data}=payload;
            return {
                ...state,
                tags:data.data
            }
        },
        saveImagePostsList(state, {payload}){
            const {data}=payload;
            return {
                ...state,
                imagePostList:data.data
            }
        },
        savePrenext(state, {payload}){
            const {data}=payload;
            return {
                ...state,
                preNext:data.data
            }
        },
    }
}
