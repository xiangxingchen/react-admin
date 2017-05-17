import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import PostsList from './routes/admin/article/list';
import PostsDetail from './routes/admin/article/detail';
import AddPost from './routes/admin/article/add';
import EditPost from './routes/admin/article/edit';
import Add from './routes/front/content/add';
import adminApp from './routes/admin/app';
import Error from './routes/admin/error';
import Dashboard from './routes/admin/dashboard';
import Comment from './routes/admin/comment';
import PictureList from './routes/admin/picture/list';
import AddPicture from './routes/admin/picture/add';
import AddUser from './routes/admin/user/add';
import UserList from './routes/admin/user/list';
import Ico from './routes/admin/ui/ico';
import Search from './routes/admin/ui/search';
import MenuHeader from './routes/front/header/header';
import Content from './routes/front/content/content';
import Book from './routes/front/content/book';
import Setting from './routes/front/content/setting';
import Tags from './routes/front/content/tags';
import userCenter from './routes/front/content/userCenter';

function RouterConfig({ history, app }) {

    function requireAuth(nextState, replace, callback) {
        app._store.dispatch({
            type: 'user/enterAuth',
            payload: {},
            onComplete: callback
        });
    }

    return (
        <Router history={history}>
            <Route path="/f" component={MenuHeader} onEnter={requireAuth}>
                <IndexRoute component={Content}/>
                <Route path="home" component={Content}/>
                <Route path="book" component={Book}/>
                <Route path="user/setting" component={Setting}/>
                <Route path="tags/:id" component={Tags}/>
                <Route path="post/:id" component={PostsDetail}/>
                <Route path="user/:id" component={userCenter}/>
                <Route path="add" component={Add}/>
            </Route>
            <Route path="/menu" component={MenuHeader}/>
            <Route path="/login" component={Login}/>
            <Route path="/" component={adminApp} onEnter={requireAuth}>
                <IndexRoute component={Dashboard}/>
                <Route path="dashboard" component={Dashboard}/>
                <Route path="picture/addpic" component={AddPicture}/>
                <Route path="ui">
                    <Route path="ico" component={Ico}/>
                    <Route path="search" component={Search}/>
                </Route>
                <Route path="picture">
                    <Route path="addpic" component={AddPicture}/>
                    <Route path="piclist" component={PictureList}/>
                </Route>
                <Route path="article">
                    <Route path="add" component={AddPost}/>
                    <Route path="editArticle/:id" component={EditPost}/>
                    <Route path="list" component={PostsList}/>
                    <Route path="detail/:id" component={PostsDetail}/>
                </Route>
                <Route path="users">
                    <Route path="adduser" component={AddUser}/>
                    <Route path="edituser/:id" component={AddUser}/>
                    <Route path="userlist" component={UserList}/>
                </Route>
                <Route path="comment" component={Comment}/>
                <Route path="*" component={Error}/>
            </Route>
            <Route path="/register" component={Register}/>
            <Route path="*" breadcrumbName="Not Found" component={props => <h1> Not Found</h1>}/>
        </Router>
    );
}

export default RouterConfig;
