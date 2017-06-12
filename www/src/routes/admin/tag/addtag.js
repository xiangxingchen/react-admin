import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Form, Input, Tooltip, Icon, Radio, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class Addtag extends React.Component {
    state = {
        confirmDirty: false,
    };

    componentWillMount() {
        this.props.dispatch({
            type: 'posts/getTagCatList',
            payload: {pageInfo: {limit: 10, page: 1}}
        });
    }

    handleSubmit = (e) => {
        const {dispatch} = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({type: 'posts/createTag', payload: {values}});
            }
        });
    }
    render() {
        const {tagCat}=this.props;
        const { getFieldDecorator } = this.props.form;
        const options=[];
        tagCat.map(cat=>{
            options.push(<Option value={cat._id} key={cat._id}>{cat.desc}</Option>)
        });

        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 6 },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    id="cid"
                    label="标签分类："
                    {...formItemLayout}
                    hasFeedback
                >
                    {getFieldDecorator('cid', {
                        initialValue: "1",
                        rules: [{required: true, message: '请选择分类'}]
                    })( <Select style={{ width: 240 }} onChange={this.onCheck}>
                        <Option value="1" key={1} disabled>请选择分类</Option>
                        {options}
                    </Select>)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="标签名称"
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
                <FormItem label="" {...formItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

Addtag = Form.create()(Addtag);
function mapStateToProps(state, props) {
    return {
        tagCat: state.posts.tagCat
    };
}
export default connect(mapStateToProps)(Addtag);
