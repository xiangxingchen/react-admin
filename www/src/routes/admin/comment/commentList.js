import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Table, Icon, Alert,Row,Col} from 'antd';
import Publish from './publish';
import moment from 'moment';
import style from './comment.less';

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
                    <Row key={index} className={style.commentsList}>
                        <Col span="1">
                            <img src={`http://localhost:9000/avatar/default.jpg`} className={style.img}/>
                        </Col>
                        <Col span='20' offset="1">
                            <p className={style.commentList_author}>
                                <Link to={`/user/${record.user_id._id}`}>
                                    <em>{record.user_id.nickname}</em>
                                </Link>, {moment(record.created).fromNow()}
                            </p>
                            <div className={style.commentList_content}>{record.content}</div>
                        </Col>
                    </Row>
                );
            });
        return (
            <div>
                <Publish {...this.props}/>
                {commentsList.length > 0 ? commentTable : ''}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        commentsList: state.posts.descendants,
        user:state.user.account,
    };
}

export default connect(mapStateToProps)(CommentsList);