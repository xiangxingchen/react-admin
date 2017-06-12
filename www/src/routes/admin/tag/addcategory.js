import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Form, Input, Tooltip, Icon, Radio, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class Addcategory extends React.Component {
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
        const {dispatch} = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({type: 'posts/createCategory', payload: {values}});
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="名称"
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输入名称!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="描述"
                    hasFeedback
                >
                    {getFieldDecorator('desc', {
                        rules: [{
                            required: true, message: '请输入描述!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="" {...formItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

Addcategory = Form.create()(Addcategory);
export default connect()(Addcategory);
