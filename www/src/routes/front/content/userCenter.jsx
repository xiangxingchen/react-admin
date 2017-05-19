import React, { PropTypes } from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import style from '../header/header.less';
import { Row, Col, Carousel, Tabs, Card, Layout, Icon, Popover } from 'antd';
import PreContent from './preUserView';
const { Content } = Layout;
const TabPane = Tabs.TabPane;
moment.locale(window.navigator.language);

class userCenter extends React.Component {
    componentWillMount() {
        this.getAll(1);
    }
    getContent = (items) => {
        const {dispatch,likeList,params} = this.props;
        return (items||[]).map((data,index)=> {
            return <PreContent data={data} dispatch={dispatch} likeList={likeList} _id={params.id}/>
        })
    };
    getAll=(status) => {
        const {dispatch,params} = this.props;
        dispatch({
            type: 'posts/getArticleByUserId',
            payload: {id:params.id,status}
        });
    };
    render() {
        const {user,posts} = this.props;
        const datasource = posts.postsList.data;
        const content = this.getContent(datasource);
        const title=<div className={style.header}>
            <a onClick={() => {this.getAll(1)}} key="1">发布</a>
            <a onClick={() => {this.getAll(2)}} key="2">定时发布</a>
            <a onClick={() => {this.getAll(0)}} key="3">草稿</a>
        </div>
        return (
            <div className={style.user}>
                <div className={style.avatar}><img src={`http://localhost:9000/avatar/7.jpg`}/></div>
                <h1 className={style.name}>{user.account.nickname}</h1>
                <Card title={title}  bodyStyle={{ padding: 0 }}>
                    {datasource && datasource.length > 0 ? content : <div></div>}
                </Card>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        posts: state.posts,
        likeList:state.user.account.likeList
    };
}

export default connect(mapStateToProps)(userCenter);