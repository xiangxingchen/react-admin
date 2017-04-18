import React, {PropTypes} from 'react';
import {Form, Input, Button, Row, Col} from 'antd';

class Publish extends React.Component {

    handleSubmit = (e) => {
        const {form,dispatch,id} = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((error, {commentInput}) => {
            if (!error) {
                form.resetFields();
                dispatch({
                    type: 'posts/createComment',
                    payload: {commentInput,id}
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {
                        getFieldDecorator('commentInput', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your comment...'
                                }
                            ]
                        })(<Input type="textarea" placeholder="Add Comment..." rows={3}/>)
                    }
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col span={4} offset={20}>
                            <Button
                                type='primary'
                                size='large'
                                icon='plus-square-o'
                                htmlType='submit'>Publish</Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create({})(Publish);