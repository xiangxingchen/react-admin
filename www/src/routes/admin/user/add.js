import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Form, Input, Tooltip, Icon, Radio, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
    };

    componentWillMount() {
        const {dispatch,params} = this.props;
        if(params.id){
            dispatch({
                type: 'user/userInfo',
                payload: {id: params.id}
            })
        }
    }

    handleSubmit = (e) => {
        const {dispatch,params} = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if(params.id){
                    this.props.dispatch({type: 'user/updateUser', payload: {values,id:params.id}});
                } else {
                    this.props.dispatch({type: 'user/register', payload: {values}});
                }
            }
        });
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { userInfo } = this.props;

        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        initialValue: userInfo.email === undefined ? '': userInfo.email,
                        rules: [{
                            type: 'email', message: '邮箱格式不正确!',
                        }, {
                            required: true, message: '请输入邮箱!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        initialValue: '',
                        rules: [{
                            required: true, message: '请输入密码!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="昵称"
                    hasFeedback
                >
                    {getFieldDecorator('nickname', {
                        initialValue: userInfo.nickname === undefined ? '': userInfo.nickname,
                        rules: [{ required: true, message: '请输入昵称!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="角色"
                    hasFeedback
                >
                    {getFieldDecorator('role', {
                        initialValue: userInfo.role === undefined ? 'user': userInfo.role,
                        rules: [{ required: true }],
                    })(
                        <RadioGroup>
                            <Radio value='user'>普通用户</Radio>
                            <Radio value='admin'>管理员</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem label="" {...formItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}

const Add = Form.create()(RegistrationForm);


Add.propTypes = {
    userInfo: PropTypes.object,
}

function mapStateToProps(state, props) {
    return {
        userInfo: state.user.UserInfo,
        id: Number(props.params.id),
    };
}

export default connect(mapStateToProps)(Add);
