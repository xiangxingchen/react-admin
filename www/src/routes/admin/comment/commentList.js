import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Table, Icon, Alert} from 'antd';
import Publish from './publish';
import moment from 'moment';
const {Column} = Table;

class CommentsList extends React.Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'post_detail/getCommentList'
        });
    }

    render() {
        const { commentsList, dispatch } = this.props;
        console.log(commentsList);
        const columnProps = {
            title: 'Comments',
            key: 'descendants',
            render: (text, record) => {
                return (
                    <div>
                        <div>{record.content}</div>
                        <p>by <Link to={`/user/${record.user_id._id}`}><em>{record.user_id.nickname}</em></Link>, {moment(record.created).fromNow()}
                        </p>
                    </div>
                );
            }
        };
        const commentTable = <Table
            showHeader={false}
            dataSource={commentsList.descendants}
            rowKey={record => record._id}
            title={() => <h2><Icon type="message"/>{commentsList.descendants.length} Comment(s)</h2>}
        >
            <Column {...columnProps}/>
        </Table>;
        return (
            <div>
                {commentsList.descendants.length > 0 ? commentTable : ''}
                <Publish dispatch={dispatch}/>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        commentsList: state.post_detail.currentPost,
    };
}

export default connect(mapStateToProps)(CommentsList);