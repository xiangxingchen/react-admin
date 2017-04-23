import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Icon, Input, Form, Row, Col, Button, Spin, Collapse, Tree, Tag, Card,Upload,message,Modal } from 'antd';
import Editor from '../../../components/Editor/Editor';
import Category from './category';
import styles from './article.less';
const Panel = Collapse.Panel;
const TreeNode = Tree.TreeNode;

class PostEditor extends React.Component {
    state={
        visible:false,
    }

    componentWillMount() {
        this.props.dispatch({type: 'posts/getTagCatList'});
    }

    handleSubmit = (e) => {
        console.log()
        e.preventDefault();
        const {dispatch,form}=this.props;
        form.validateFields((error, values) => {
            const {title, content} = values;
            if (!error) {
                dispatch({
                    type: 'posts/createPost',
                    payload: {title, content}
                });
            }
        });
    }

    showModal= () => {
        this.setState({visible:true})
    }
    handleCancel= () => {
        this.setState({visible:false})
    }


    render() {
        const {form,post,dispatch}= this.props;

        const {getFieldDecorator} =form;
        const tags = <Tag closable onClose={(e)=>console.log(e)} color="pink">React</Tag>;
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
                        <Form.Item>
                            {getFieldDecorator('title', {
                                initialValue: post.title === undefined ? '' : post.title,
                                rules: [{required: true, message: 'Please input title!'}]
                            })(<Input type="text" placeholder="请输入标题."/>)
                            }
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('content', {
                                initialValue: post.content === undefined ? '' : post.content,
                                rules: [{required: true, message: 'Please input content!'}]
                            })(<Editor />)
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">发布</Button>
                        </Form.Item>
                    </Form>
                        <Button type="primary" onClick={this.showModal}>
                            Open modal dialog
                        </Button>
                        <Modal
                            visible={this.state.visible}
                            title="Title"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" size="large" onClick={this.handleCancel}>Return</Button>,
                                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
                                  Submit
                                </Button>,
                            ]}
                        >
                            <Form.Item>
                                {getFieldDecorator('category', {
                                    initialValue: post.content === undefined ? '' : post.content,
                                    rules: [{required: true, message: 'Please input content!'}]
                                })(<Editor />)
                                }
                            </Form.Item>
                            <Category />
                        </Modal>
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

PostEditor = Form.create({onFieldsChange, mapPropsToFields})(PostEditor);
PostEditor = connect(mapStateToProps)(PostEditor);

export default PostEditor;