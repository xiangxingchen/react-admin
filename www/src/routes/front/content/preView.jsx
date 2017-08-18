import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import moment from 'moment';
import style from '../header/header.less';
import { Row, Col, Card, Icon, Popover } from 'antd';
import _ from 'lodash';
moment.locale(window.navigator.language);

class preView extends React.Component {
    state={
        isLike:false
    };
    componentWillMount() {
        const {data,likeList}=this.props;
        // data.like_count
        const like = _.indexOf(likeList, data._id) > -1;
        const count= data.like_count;
        this.setState({isLike:like,count});
    }

    like(id){
        const {isLike,count}=this.state;
        this.props.dispatch({
            type: 'posts/toggleLike',
            payload: {id}
        });
        const data = isLike ? count-1 : count+1;
        this.setState({isLike:!isLike,count:data});

    }

    render() {
        const {data}=this.props;
        const {isLike,count}=this.state;
        const that = this;
        const cont=(
            <div>
                <p>Content</p>
                <p>Content</p>
            </div>
        );
        return (<div className={style.preView}>
            <Row key={data._id} >
                <Col span={20}>
                    <Row>
                        <Col span={2} key={data.author}>
                            <Link to={`/f/user/${data.author_id._id}`}>{data.author_id.nickname}</Link>
                        </Col>
                        <Col span={2} key={data.tags[0] && data.tags[0].id}>
                            <Popover content={cont}>
                                {data.tags[0] && data.tags[0].name}
                            </Popover>
                        </Col>
                        <span>{moment(data.publish_time).fromNow()} </span>
                    </Row>
                    <a href={`/f/post/${data._id}`}>
                        <h1>{data.title}</h1>
                    </a>
                </Col>
                <Col span={4}>
                    {data.images[0] && <img src={data.images[0].url} className={style.contentImage}/>}
                </Col>
        </Row>
            <div className={style.like}>
                {isLike?
                    <a onClick={(e) => {that.like(data._id,e)}}><Icon type="like" className={style.red} />{count}</a>
                    :<a onClick={(e) => {that.like(data._id,e)}}><Icon type="like-o" />{count}</a>}
                <span><Icon type="message" />{data.comment_count}</span>
                <span><Icon type="eye" />{data.visit_count}</span>
            </div>
        </div>)
    }
}

export default preView;