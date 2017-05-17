import React, { PropTypes } from 'react';
import {connect} from 'dva';
import style from '../header/header.less';
import PreContent from './preView';
import { Row, Col, Carousel, Tabs, Card, Layout, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

class book extends React.Component {
    state={
        content:'',
        title:'',
    }
    componentWillMount() {
        this.getAll();
        this.props.dispatch({type: 'posts/getTagCatList'});
    }
    getAll=() => {
        this.props.dispatch({
            type: 'posts/getPostsList',
            payload: {pageInfo: {limit: 10, page: 1}}
        });
    };
    getContent=(id) => {
        if(id === 'all'){
            this.getAll();
        } else {
            this.props.dispatch({
                type: 'posts/getFrontArticleList',
                payload: {pageInfo: {limit: 10, page: 1},condition:{category:id}}
            });
        }
    }
    getContentView = (items,likeList) => {
        const {dispatch}=this.props;
        return (items||[]).map((data,index)=> {
            return <PreContent data={data} key={index} likeList={likeList} dispatch={dispatch}/>
        })
    };
    getTitle = (tagCat) => {
        const tags=[<a className={style.catTitle} onClick={() => {this.getContent('all')}} key="12">全部</a>];
        tagCat.map(tag => {
             tags.push(<a key={tag._id} className={style.catTitle} onClick={() => {this.getContent(tag._id)}}>{tag.desc}</a>)
        })
        return tags;
    }
    render() {
        const {posts,likeList,tagCat}=this.props;
        const content = this.getContentView(posts.data,likeList);
        const title=this.getTitle(tagCat);
        return (
            <Layout style={{ height: '100vh' }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Row className={style.content}>
                        <Col span={12} offset={3}>
                            <Row>
                                <Card title={title}>
                                    {posts.data && posts.data.length > 0 ? content : <div></div>}
                                </Card>
                            </Row>
                        </Col>
                        <Col span={5} offset={1}>
                            <Card title="友情链接" extra={<a href="#">更多</a>}>
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts.postsList,
        likeList:state.user.account.likeList,
        tagCat: state.posts.tagCat,
    };
}

export default connect(mapStateToProps)(book);

