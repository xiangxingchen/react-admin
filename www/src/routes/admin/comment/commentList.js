import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Table, Icon, Alert,Row,Col} from 'antd';
import Publish from './publish';
import moment from 'moment';
moment.locale(window.navigator.language);
const {Column} = Table;

class CommentsList extends React.Component {
    componentWillMount() {
        const { dispatch,id } = this.props;
        dispatch({
            type: 'post_detail/getCommentList',
            payload:{id}
        });
    }

    render() {
        const { commentsList, dispatch } = this.props;
        const commentTable = []
        commentsList.descendants.map((record) => {
            commentTable.push (
                    <Row>
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
        //const commentTable = <Table
        //    showHeader={false}
        //    dataSource={commentsList.descendants}
        //    rowKey={record => record._id}
        //    title={() => <h2><Icon type="message"/>{commentsList.descendants.length} Comment(s)</h2>}
        //>
        //    <Column {...columnProps}/>
        //</Table>;
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