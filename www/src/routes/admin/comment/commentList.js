import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Table, Icon, Alert,Row,Col} from 'antd';
import Publish from './publish';
import moment from 'moment';
moment.locale(window.navigator.language);

class CommentsList extends React.Component {
    componentWillMount() {
        const { dispatch,id } = this.props;
        dispatch({
            type: 'posts/getCommentList',
            payload:{id}
        });
    }

    render() {
        const { commentsList, dispatch } = this.props;
        const commentTable = []
        commentsList.map((record, index) => {
            commentTable.push (
                    <Row key={index}>
                        <Col span="1">
                            <img width="40px" src={`http://localhost:9000/avatar/default.jpg`}
                                 style={{ boxShadow: '0 2px 6px 1px rgba(0, 0, 0, 0.4)',borderRadius: '50%'}}/>
                        </Col>
                        <Col>
                            <p style={{ fontSize:'16px',lineHeight:'30px',height:'30px'}}>
                                <Link to={`/user/${record.user_id._id}`}><em>{record.user_id.nickname}</em></Link>, {moment(record.created).fromNow()}
                            </p>
                            <div style={{ fontSize:'16px'}}>{record.content}</div>
                        </Col>
                    </Row>
                );
            });
        return (
            <div>
                {commentsList.length > 0 ? commentTable : ''}
                <Publish {...this.props}/>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        commentsList: state.posts.descendants,
    };
}

export default connect(mapStateToProps)(CommentsList);