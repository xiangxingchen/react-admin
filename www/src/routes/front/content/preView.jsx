import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import moment from 'moment';
import style from '../header/header.less';
import { Row, Col, Card, Icon } from 'antd';
moment.locale(window.navigator.language);

class preView extends React.Component {

    render() {
        const {data}=this.props;
        console.log(this.props);
        return (
            <div>
                <Row>
                    <Col span={20}>
                        <div>{data && data.author} {data && moment(data.publish_time).fromNow()} {data && data.tags[0]}</div>
                        <Link to={data && data._id}>
                            <h1>{data && data.title}</h1>
                        </Link>
                        <ul>
                            <li>
                                <a><Icon type="like" /><span>{data && data.like_count}</span></a>
                                <a><Icon type="message" /><span>{data && data.comment_count}</span></a>
                            </li>
                        </ul></Col>
                    <Col span={4}>
                        {data && data.images[0] && <img src={data.images[0].url} className={style.contentImage}/>}
                    </Col>
                </Row>
            </div>
        );
    }
}

preView.propTypes = {
    data: PropTypes.object
};
export default preView;