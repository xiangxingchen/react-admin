import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import moment from 'moment';
import style from '../header/header.less';
import { Row, Col, Card, Icon, Popover } from 'antd';
moment.locale(window.navigator.language);

class preView extends React.Component {

    render() {
        const {data}=this.props;
        console.log(this.props);
        const cont=(
            <div>
                <p>Content</p>
                <p>Content</p>
            </div>
        );
        return (<Row key={data._id} className={style.preView}>
            <Link to={`post/${data._id}`}>
                <Col span={20}>
                    <Row>
                        <Col span={2} key={data.author}>
                            <Popover content={cont}>
                                {data.author}
                            </Popover>
                        </Col>
                        <Col span={2} key={data.tags[0].id}>
                            <Popover content={cont}>
                                {data.tags[0].name}
                            </Popover>
                        </Col>
                        <span>{moment(data.publish_time).fromNow()} </span>
                    </Row>
                    <a href={`post/${data._id}`}>
                        <h1>{data.title}</h1>
                    </a>
                    <ul>
                        <li>
                            <a><Icon type="like" /><span>{data.like_count}</span></a>
                            <a><Icon type="message" /><span>{data.comment_count}</span></a>
                            <a><Icon type="eye" /><span>{data.visit_count}</span></a>
                        </li>
                    </ul></Col>
                <Col span={4}>
                    {data.images[0] && <img src={data.images[0].url} className={style.contentImage}/>}
                </Col>
            </Link>
        </Row>)
    }
}

export default preView;