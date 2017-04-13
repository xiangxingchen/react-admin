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
        //const id = this.props.routeParams.id;
        //if(id){
        //    this.props.dispatch({
        //        type: 'user/userInfo',
        //        payload: {id}
        //    })
        //}
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                this.props.dispatch({type: 'user/register', payload: {values}});
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
                    label="E-mail"
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        initialValue: userInfo.email === undefined ? '': userInfo.email,
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Password"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        initialValue: 0,
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Nickname"
                    hasFeedback
                >
                    {getFieldDecorator('nickname', {
                        initialValue: userInfo.nickname === undefined ? '': userInfo.nickname,
                        rules: [{ required: true, message: 'Please input your nickname!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Role"
                    hasFeedback
                >
                    {getFieldDecorator('Role', {
                        initialValue: userInfo.role === undefined ? 0: userInfo.role,
                        rules: [{ type: 'number', required: true }],
                    })(
                        <RadioGroup>
                            <Radio value={0}>user</Radio>
                            <Radio value={1}>super</Radio>
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
