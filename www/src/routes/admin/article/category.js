import React, {PropTypes} from 'react';
import {connect} from 'dva';
import { Input, Form, Row, Col, Button } from 'antd';
import styles from './article.less';

class Category extends React.Component {
    componentWillMount() {
    }
    handleSubmit = (e) => {
        console.log()
        e.preventDefault();
        const {dispatch,form}=this.props;
        form.validateFields((error, values) => {
            const {category} = values;
            if (!error) {
                dispatch({
                    type: 'posts/createCategory',
                    payload: {category}
                });
            }
        });
    }

    render() {
        const {form,post,dispatch}= this.props;
        const {getFieldDecorator} =form;

        return (<div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('category', {
                        initialValue: post.title === undefined ? '' : post.title,
                        rules: [{required: true, message: 'Please input title!'}]
                    })(<Input type="text" placeholder="请输入标题."/>)
                    }
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" ghost>发布</Button>
                </Form.Item>
            </Form>
        </div>);
    }
}

Category.propTypes = {
    dispatch: PropTypes.func.isRequired,
    post: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        post: state.posts.post,
        isNew: state.posts.isNew
    };
}

function onFieldsChange(props, fields) {
    props.dispatch({
        type: 'posts/changeFields',
        payload: {fields}
    });
}

function mapPropsToFields(props) {
    return props.post;
}

Category = Form.create({onFieldsChange, mapPropsToFields})(Category);
export default connect(mapStateToProps)(Category);
