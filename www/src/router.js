import React from 'react';
import {Router, Route, IndexRoute, IndexRedirect} from 'dva/router';
import App from './routes/app';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import PostsListPage from './routes/PostsListPage/PostsListPage';
import PostsList from './routes/admin/article/list';
import PostsDetail from './routes/admin/article/detail';
import PostPage from "./routes/PostPage/PostPage";
import PostEditor from './routes/admin/article/add';
import UserPage from './routes/UserPage/UserPage';
import adminApp from './routes/admin/app';
import Error from './routes/admin/error';
import Test from './routes/admin/test';
import PictureList from './routes/admin/picture/list';
import AddPicture from './routes/admin/picture/add';
import AddUser from './routes/admin/user/add';
import UserList from './routes/admin/user/list';
import Ico from './routes/admin/ui/ico';
import Search from './routes/admin/ui/search';

function RouterConfig({history, app}) {
    function requireAuth(nextState, replace, callback) {
        app._store.dispatch({
            type: 'user/enterAuth',
            payload: {},
            onComplete: callback
        });
    }

    function requirePostPrepared(nextState, replace, callback) {
        app._store.dispatch({
            type: 'post_detail/initializePostDetail',
            payload: {post_id: nextState.params.post_id},
            onComplete: callback
        });
    }

    function requireEditorPrepared(nextState, replace, callback) {
        const post_id = nextState.params.post_id;
        if (post_id) {
            app._store.dispatch({
                type: 'editor/initializeEditor',
                payload: {post_id},
                onComplete: callback
            });
        } else {
            app._store.dispatch({
                type: 'editor/initializeCreator',
                payload: {},
                onComplete: callback
            });
        }
    }

    function requireProfilePrepared(nextState, replace, callback) {
        const user_id = nextState.params.user_id;
        if (user_id) {
            app._store.dispatch({
                type: 'profile/initializeProfile',
                payload: {user_id},
                onComplete: callback
            });
        } else {
            replace('/posts');
            callback();
        }
    }

    return (
        <Router history={history}>
            <Route path="/" component={adminApp} onEnter={requireAuth}>
                <IndexRoute component={Test}/>
                <Route path="dashboard" component={Test}/>
                <Route path="picture/addpic" component={AddPicture} />
                <Route path="ui">
                    <Route path="ico" component={Ico} />
                    <Route path="search" component={Search} />
                </Route>
                <Route path="picture">
                    <Route path="addpic" component={AddPicture} />
                    <Route path="piclist" component={PictureList} />
                </Route>
                <Route path="article">
                    <Route path="add" component={PostEditor} onEnter={requireEditorPrepared}/>
                    <Route path="list" component={PostsList} />
                    <Route path="detail" component={PostsDetail} />
                </Route>
                <Route path="users">
                    <Route path="adduser" component={AddUser} />
                    <Route path="edituser/:id" component={AddUser} />
                    <Route path="userlist" component={UserList} />
                </Route>
                <Route path="*" component={Error} />
            </Route>
            <Route path="*" breadcrumbName="Not Found" component={props => <h1> Not Found</h1>}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Router>
    );
}

export default RouterConfig;

//<Route path="/" breadcrumbName="Home" icon="home" component={App} onEnter={requireAuth}>
//    <IndexRedirect to="posts"/>
//    <Route path="posts" breadcrumbName="Posts" icon="file-text" component={PostsListPage}/>
//    <Route path="posts/:post_id" breadcrumbName="Post Detail" icon="file-text" onEnter={requirePostPrepared} component={PostPage}/>
//    <Route path="editor" breadcrumbName="Editor - Create Post" icon="plus-square-o" component={PostEditor} onEnter={requireEditorPrepared}/>
//    <Route path="editor/:post_id" breadcrumbName="Editor - Edit Post" icon="edit" component={PostEditor} onEnter={requireEditorPrepared}/>
//    <Route path="user/:user_id" breadcrumbName="User Detail" icon="solution" onEnter={requireProfilePrepared} component={UserPage}/>
//</Route>
