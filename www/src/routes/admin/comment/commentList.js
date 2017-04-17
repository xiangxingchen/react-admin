import React, {PropTypes} from 'react';
import {Link} from 'dva/router';
import {Table, Icon, Alert} from 'antd';
import Publish from './publish';
import moment from 'moment';
const {Column} = Table;

class CommentsList extends React.Component {
    getCommentList
    componentWillMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'post_detail/getCommentList'
        });
    }

    render() {
        const { commentsList, onCreate, isSuper, currentAccountUserId,dispatch } = this.props;
        const columnProps = {
            title: 'Comments',
            key: 'descendants',
            render: (text, record) => {
                const isSelf = currentAccountUserId === record.author.user_id;
                return (
                    <div>
                        <div className={styles.content}>
                            {
                                record.visible
                                    ? record.content
                                    : <div>
                                    <Alert type="warning"
                                           message={"This Comment was hidden by the Super Admin..." +
                                           " Only the Author and Super Admin can see it."
                                           } showIcon/>
                                    {
                                        isSelf || isSuper
                                            ? record.content
                                            : null
                                    }
                                </div>
                            }
                        </div>
                        <p className={styles.meta}>
                            by <Link
                            to={`/user/${record.author.user_id}`}><em
                            className={styles.toUser}>{record.author.username}</em></Link>, {moment(record.created_at).fromNow()}
                        </p>
                    </div>
                );
            }
        };
        const commentTable = <Table
            rowKey="comment_id"
            size="small"
            showHeader={false}
            dataSource={commentsList}
            title={() => <h2><Icon type="message" className={styles.icon}/>{commentsList.length} Comment(s)</h2>}
        >
            <Column {...columnProps}/>
        </Table>;
        return (
            <div>
                <Publish dispatch={dispatch}/>
            </div>
        )
    }
}

export default CommentsList;