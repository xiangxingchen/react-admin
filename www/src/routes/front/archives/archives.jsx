import React, { PropTypes } from 'react';
import {connect} from 'dva';
import moment from 'moment';
import _ from 'lodash';
import style from '../header/header.less';
import Years from './years';
import { Row, Col, Carousel, Tabs, Card, Layout, Icon } from 'antd';
const { Content } = Layout;

class archives extends React.Component {

  componentWillMount() {
    this.getAll();
    this.props.dispatch({type: 'posts/getTagCatList'});
  }
  getAll=() => {
    this.props.dispatch({
      type: 'posts/getArchivesArticle',
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

  getMore = () => {
    const postsList =this.props.posts;
    this.props.dispatch({
      type: 'posts/getPostsList',
      payload: {pageInfo: {limit: 10, page: ++ postsList.currentPage},type:'more'}
    });
  }

  render() {
    const {posts,likeList,tagCat}=this.props;
    const title=this.getTitle(tagCat);
    const data = posts.data||[]
    let archives={};
    data.map(item => {
      const year = moment(item.publish_time).get('year');
      const month = moment(item.publish_time).get('month');
      if (archives[year]) {
        if(archives[year][month]) {
          archives[year][month].push(item);
        } else {
          archives[year][month]=[];
          archives[year][month].push(item);
        }
      } else {
        archives[year] ={};
        archives[year][month]=[];
        archives[year][month].push(item);
      }
    });
    const component=[];
    _.forInRight(archives, function(value, key) {
      component.push(<Years year={key} month={value} key={key}/>);
    });


    return (
      <Layout style={{ height: '100vh' }}>
        <Content className={style.layout}>
          <Row className={style.content}>
            <Col span={17}>
              <Row>
                <Card title={title}>
                  {component}
                  <div className={style.more} onClick={this.getMore}><a>更多...</a></div>
                </Card>
              </Row>
            </Col>
            <Col span={6} offset={1}>
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

export default connect(mapStateToProps)(archives);

