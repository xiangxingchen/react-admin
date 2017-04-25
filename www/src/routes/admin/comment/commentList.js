import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Table, Icon, Alert,Row,Col,Form,Input,Button} from 'antd';
import Publish from './publish';
import moment from 'moment';
import style from './comment.less';

moment.locale(window.navigator.language);
class CommentsList extends React.Component {
    state = {
        visitable:false,
        currentIndex:0,
        id:undefined,
    };
    componentWillMount() {
        const { dispatch,id } = this.props;
        dispatch({
            type: 'posts/getCommentList',
            payload:{id}
        });
    }
    handleSubmit = (e) => {
        const {form,dispatch} = this.props;
        const {id} = this.state;
        e.preventDefault();
        form.validateFieldsAndScroll((error, {reply}) => {
            if (!error) {
                dispatch({
                    type: 'posts/addNewReply',
                    payload: {id,reply}
                });
            }
        });
    };
    onClick = (index,id) => {
        this.setState({visitable:true,currentIndex:index,id})
    }
    onCancel = (index) => {
        this.setState({visitable:false,currentIndex:index})
    }

    render() {
        const that = this;
        const { commentsList, dispatch, article,user } = this.props;
        const {getFieldDecorator,getFieldValue} = this.props.form;
        const {visitable,currentIndex} = this.state;
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
                        {article.author_id === user._id ? <Col span="2">
                            <a onClick={()=>{that.onClick(index,record._id)}}>回复</a>
                        </Col> : ''}
                        {
                            visitable && currentIndex === index ? <Form onSubmit={that.handleSubmit}>
                                <Form.Item>{getFieldDecorator('reply', {
                                            rules: [{required: true, message: '请输入评论'}]
                                        })(<Input
                                            type="textarea"
                                            placeholder="回复"
                                            rows={3}
                                        />)}
                                </Form.Item>
                                <Form.Item>
                                    <Row>
                                        <Col span="3" offset={18}>
                                            <Button size='large'onClick={()=>{that.onCancel(index)}}>取消</Button>
                                        </Col>
                                        <Col span="1">
                                            <Button type='primary' size='large' htmlType='submit'>回复</Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Form> :''
                        }
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

export default connect(mapStateToProps)(Form.create({})(CommentsList));