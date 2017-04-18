import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import PostsList from './routes/admin/article/list';
import PostsDetail from './routes/admin/article/detail';
import PostEditor from './routes/admin/article/add';
import adminApp from './routes/admin/app';
import Error from './routes/admin/error';
import Test from './routes/admin/test';
import PictureList from './routes/admin/picture/list';
import AddPicture from './routes/admin/picture/add';
import AddUser from './routes/admin/user/add';
import UserList from './routes/admin/user/list';
import Ico from './routes/admin/ui/ico';
import Search from './routes/admin/ui/search';

function RouterConfig({ history, app }) {
    //console.log(history, app);
    history.listen((location) => {
        console.log(location.pathname);
    });
    function requireAuth(nextState, replace, callback) {
        app._store.dispatch({
            type: 'user/enterAuth',
            payload: {},
            onComplete: callback
        });
    }

    return (
        <Router history={history}>
            <Route path="/login" component={Login}/>
            <Route path="/" component={adminApp} onEnter={requireAuth}>
                <IndexRoute component={Test}/>
                <Route path="dashboard" component={Test}/>
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
                    <Route path="add" component={PostEditor}/>
                    <Route path="list" component={PostsList}/>
                    <Route path="detail/:id" component={PostsDetail}/>
                </Route>
                <Route path="users">
                    <Route path="adduser" component={AddUser}/>
                    <Route path="edituser/:id" component={AddUser}/>
                    <Route path="userlist" component={UserList}/>
                </Route>
                <Route path="*" component={Error}/>
            </Route>
            <Route path="/register" component={Register}/>
            <Route path="*" breadcrumbName="Not Found" component={props => <h1> Not Found</h1>}/>
        </Router>
    );
}

export default RouterConfig;
