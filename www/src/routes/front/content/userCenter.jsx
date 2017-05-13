import React, { PropTypes } from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import style from '../header/header.less';
import { Row, Col, Carousel, Tabs, Card, Layout, Icon, Popover } from 'antd';
import PreContent from './preView';
const { Content } = Layout;
const TabPane = Tabs.TabPane;
moment.locale(window.navigator.language);

class userCenter extends React.Component {
    componentWillMount() {
        const {dispatch,user} = this.props;
        dispatch({
            type: 'posts/getArticleByUserId',
            payload: {id:user.account._id}
        });
    }
    getContent = (items) => {
        return (items||[]).map((data,index)=> {
            return <PreContent data={data} />
        })
    };
    render() {
        const {user,posts} = this.props;
        const datasource = posts.postsList.data;
        const content = this.getContent(datasource);
        return (
            <div className={style.user}>
                <div className={style.avatar}><img src={`http://localhost:9000/avatar/7.jpg`}/></div>
                <h1>{user.account.nickname}</h1>
                <Card title="新闻" extra={<a href="#">更多</a>} bodyStyle={{ padding: 0 }}>
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
    };
}

export default connect(mapStateToProps)(userCenter);