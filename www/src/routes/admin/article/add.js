import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Icon, Input, Form, Row, Col, Button, Tag,Upload,message,Modal,Select,Radio,DatePicker  } from 'antd';
import Editor from '../../../components/Editor/Editor';
import styles from './article.less';
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckableTag = Tag.CheckableTag;

class PostEditor extends React.Component {
    state={
        visible:false,
        selectedTags: [],
    }

    componentWillMount() {
        this.props.dispatch({type: 'posts/getTagCatList'});
        this.props.dispatch({type: 'posts/getFrontTagList'});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({visible:false})
        const {dispatch,form}=this.props;
        const tags = this.state.selectedTags;
        form.validateFields((error, values) => {
            const value = {...values,tags};
            if (!error) {
                dispatch({
                    type: 'posts/createPost',
                    payload: value
                });
            }
        });
    }

    showModal= () => {
        this.setState({visible:true})
    };
    handleCancel= () => {
        this.setState({visible:false})
    };
    handleOk=()=>{
        this.setState({visible:false})
    }
    handleChange=(t, checked)=>{
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ?
            [...selectedTags, t] :
            selectedTags.filter(tag => tag !== t);
        this.setState({ selectedTags: nextSelectedTags });
    };
    onCheck=()=>{

    };

    render() {
        const {form,post,dispatch,tagCat,tags}= this.props;
        const {getFieldDecorator,getFieldValue} =form;
        const {selectedTags}=this.state;

        const selectedTag=[]
        const options=[];
        const tag=[];
        tagCat.map(cat=>{
            options.push(<Option value={cat._id} key={cat._id}>{cat.desc}</Option>)
        });
        tags.map(item=>{
            tag.push(<CheckableTag
                        key={item._id}
                        checked={selectedTags.indexOf(item.name) > -1}
                        onChange={checked => this.handleChange(item.name, checked)}
                    >
                        {item.name}
                    </CheckableTag>)
        });
        selectedTags.map((t,i)=>{
            selectedTag.push(<span><Tag color="#f50" key={i}>{t}</Tag></span>)
        })
        const props = {
            name: 'file',
            action: '/api/file/upload',
            headers: {
                authorization: 'authorization-text',
            },
            accept: "image/*",
            showUploadList: false,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    //console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    console.log(info.file.name);
                    dispatch({
                        type: 'posts/uploadImage',
                        payload: {name: info.file.name}
                    });
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (<div>
            <div className={styles.title}>
                <Row>
                    <Col span='16'>
                        <h1><Icon type="edit" className={styles.icon}/>添加文章</h1>
                    </Col>
                    <Col>
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload"/>上传图片
                            </Button>
                        </Upload>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col span={24}>
                    <Form className={styles.wrapper} onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('title', {
                                initialValue: post.title === undefined ? '' : post.title,
                                rules: [{required: true, message: 'Please input title!'}]
                            })(<Input type="text" placeholder="请输入标题."/>)
                            }
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('content', {
                                initialValue: post.content === undefined ? '' : post.content,
                                rules: [{required: true, message: 'Please input content!'}]
                            })(<Editor />)
                            }
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.showModal}>发布</Button>
                        </FormItem>
                        <Modal
                            width="800px"
                            visible={this.state.visible}
                            title="文章设置"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleSubmit}>
                                   保存
                                </Button>,
                            ]}
                        >
                            <FormItem
                                id="category"
                                label="文章分类："
                                hasFeedback
                                labelCol={ { span: 4 } }
                                wrapperCol={ { span: 16 } }
                            >
                                {getFieldDecorator('category', {
                                    initialValue: "1",
                                    rules: [{required: true, message: '请选择分类'}]
                                })( <Select style={{ width: 240 }} onChange={this.onCheck}>
                                    <Option value="1" key={1}>请选择分类</Option>
                                    {options}
                                </Select>)
                                }
                            </FormItem>
                            <FormItem
                                id="status"
                                label="发布状态："
                                hasFeedback
                                labelCol={ { span: 4 } }
                                wrapperCol={ { span: 16 } }
                            >
                                {getFieldDecorator('status', {
                                    initialValue: "1",
                                    rules: [{required: true, message: '请选择分类'}]
                                })( <RadioGroup>
                                    <Radio value="0">草稿</Radio>
                                    <Radio value="1">立即发布</Radio>
                                    <Radio value="2">定时发布</Radio>
                                </RadioGroup>)
                                }
                            </FormItem>
                            {
                                Number(getFieldValue('status'))===2 ? <FormItem
                                    id="publish_time"
                                    label="发布时间："
                                    hasFeedback
                                    labelCol={ { span: 4 } }
                                    wrapperCol={ { span: 16 } }
                                >
                                    {getFieldDecorator('publish_time', {
                                        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                                    })(  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>)
                                    }
                                </FormItem> : ''
                            }
                            <FormItem
                                id="tags"
                                label="推荐标签："
                                hasFeedback
                                labelCol={ { span: 4 } }
                                wrapperCol={ { span: 16 } }
                            >
                                {tag}
                            </FormItem>
                            <FormItem
                                id="tags"
                                label="标签："
                                hasFeedback
                                labelCol={ { span: 4 } }
                                wrapperCol={ { span: 16 } }
                            >
                                {getFieldDecorator('tags', {
                                    initialValue: '',
                                    rules: [{ message: '请选择分类'}]
                                })( <div>{selectedTag}<Input type="text" placeholder="请输入标题." /></div>)
                                }
                            </FormItem>

                        </Modal>
                    </Form>
                </Col>
            </Row>
        </div>);
    }
}

PostEditor.propTypes = {
    dispatch: PropTypes.func.isRequired,
    post: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        post: state.posts.post,
        isNew: state.posts.isNew,
        tagCat: state.posts.tagCat,
        tags: state.posts.tags,
    };
}

function onFieldsChange(props, fields) {
    console.log(fields);
    props.dispatch({
        type: 'posts/changeFields',
        payload: {fields}
    });
}

function mapPropsToFields(props) {
    return props.post;
}

PostEditor = Form.create({onFieldsChange, mapPropsToFields})(PostEditor);
PostEditor = connect(mapStateToProps)(PostEditor);

export default PostEditor;