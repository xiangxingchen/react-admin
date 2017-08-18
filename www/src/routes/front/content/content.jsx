import React, { PropTypes } from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import style from '../header/header.less';
import { Row, Col, Carousel, Tabs, Card, Layout, Tag } from 'antd';
import PreContent from './preView';
const { Content } = Layout;
const TabPane = Tabs.TabPane;
moment.locale(window.navigator.language);
const color=['pink','red','orange','green','cyan','blue','purple'];

class content extends React.Component {
    state = {
        current: 'mail',
    };
    componentWillMount() {
        this.props.dispatch({
            type: 'posts/getPostsList',
            payload: {pageInfo: {limit: 10, page: 1},type:'hot'}
        });
        this.props.dispatch({type: 'posts/getImageList'});
        this.props.dispatch({type: 'posts/getFrontTagList'});
    }
    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    };
    getContent = (items,likeList) => {
        const {dispatch}=this.props;
        return (items||[]).map((data,index)=> {
            return <PreContent data={data} key={index} likeList={likeList} dispatch={dispatch}/>
        })
    };
    getHotContent = (items) => {
        return (items||[]).slice(0,5).map((data,index)=> {
            return <div key={index} className={style.hot}>
                <Link to={`f/post/${data._id}`}>
                <span className={style.badge}>{data.visit_count}</span>
                {data.title.slice(0,10)}
                </Link>
            </div>
            }
        );
    };
    getNewContent = (items) => {
        return (items||[]).slice(0,5).map((data,index)=> {
                return <div key={index} className={style.new}>
                    <Link to={`/f/post/${data._id}`}>
                        {data.title.slice(0,9)}
                        {data.title.slice(9,20)? '...': ''}
                        <span className={style.time}>{moment(data.publish_time).format("YYYY-MM-DD")}</span>
                    </Link>
                </div>
            }
        );
    };
    getMore = () => {
        const postsList =this.props.posts.postsList;
        this.props.dispatch({
            type: 'posts/getPostsList',
            payload: {pageInfo: {limit: 10, page: ++ postsList.currentPage},type:'more'}
        });
    }

    render() {
        const {posts,likeList}=this.props;
        const {imagePostList,hotList,postsList,tags} = posts
        const datasource = postsList.data;
        const hotData = this.getHotContent(hotList.data);
        const content = this.getContent(datasource,likeList);
        const newcontent = this.getNewContent(datasource);

        const items=[];
        imagePostList.map(item => {
            items.push(<Link to={`/f/post/${item._id}`} key={item._id}>
                <img src={item.images[0].url} className={style.image}/>
                <div className={style.title}>
                <h3>{item.title}</h3>
                </div>
            </Link>)
        })
        const hotTag=[];
        tags.map(tag =>{
            let i=parseInt(Math.random()*7)
            hotTag.push(<Link to={{ pathname: `/f/tags/${tag._id}`, query: { name: tag.name } }} key={tag._id}><Tag color={color[i]} className={style.tag}>{tag.name}</Tag></Link>);
        })

        return (
            <Layout style={{ height: '100vh'}}>
                <Content className={style.layout}>
                    <Row className={style.content}>
                        <Col span={17}>
                            <Row>
                                <Card title="文章" bodyStyle={{ padding: 0 }}>
                                    {datasource && datasource.length > 0 ? content : <div></div>}
                                    <div className={style.more} onClick={this.getMore}><a>更多...</a></div>
                                </Card>
                            </Row>
                        </Col>
                        <Col span={6} offset={1}>
                            <Row>
                                <Tabs className={style.tabs}>
                                    <TabPane tab="最热动态" key="1">
                                        {hotList.data && hotList.data.length > 0 ? hotData : <div></div>}
                                    </TabPane>
                                    <TabPane tab="最新动态" key="2">
                                        {newcontent}
                                    </TabPane>
                                </Tabs>
                            </Row>
                            <Row>
                                <Card title="热门标签" bodyStyle={{ padding: '10px' }}>
                                    <div className={style.tagWrap}>
                                    {hotTag}
                                    </div>
                                </Card>
                            </Row>
                            <Row>
                                <Card title="友情链接">
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </Row>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts,
        likeList:state.user.account.likeList
    };
}

export default connect(mapStateToProps)(content);