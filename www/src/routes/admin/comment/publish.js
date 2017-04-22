import React, {PropTypes} from 'react';
import {Form, Input, Button, Row, Col} from 'antd';
import style from './comment.less';
class Publish extends React.Component {
    state= {
        showButton: false,
    };

    handleSubmit = (e) => {
        const {form,dispatch,id} = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((error, {commentInput}) => {
            if (!error) {
                form.resetFields();
                dispatch({
                    type: 'posts/createComment',
                    payload: {commentInput, id}
                });
            }
        });
    };
    onFocus = () => {
       this.setState({showButton:true});
    };
    onBlur= () => {
        this.setState({showButton:false});
    };
    render() {
        const {getFieldDecorator,getFieldValue} = this.props.form;
        const {user} = this.props;
        return (
            <div>
                <div className={style.comment_title}>评论</div>
                <Row className={style.comment}>
                    <Col span="1">
                        <img src={`http://localhost:9000/avatar/${user.avatar}`} className={style.img}/>
                    </Col>
                    <Col span="22"  offset="1">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {
                                    getFieldDecorator('commentInput', {
                                        rules: [{required: true, message: '请输入评论'}]
                                    })(<Input
                                        type="textarea"
                                        placeholder="说说你的看法"
                                        rows={3}
                                        onFocus={this.onFocus}
                                        onBlur={this.onBlur}
                                    />)
                                }
                            </Form.Item>
                            <Form.Item>
                                {getFieldValue('commentInput')||this.state.showButton ? <Row>
                                    <Col span={3} offset={21}>
                                        <Button type='primary' size='large' htmlType='submit'>评论</Button>
                                    </Col>
                                </Row> : ''}
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create({})(Publish);