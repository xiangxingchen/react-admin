import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Icon, Input, Form, Row, Col, Button, Spin, Collapse, Tree, Tag, Card,Upload,message } from 'antd';
import Editor from '../../../components/Editor/Editor';
import styles from './PostEditor.css';
const Panel = Collapse.Panel;
const TreeNode = Tree.TreeNode;

class PostEditor extends React.Component {

    componentWillMount() {

    }

    handleSubmit = (e) => {
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

    onSelect(selectedKeys, info) {
        console.log('selected', selectedKeys, info);
    }

    onCheck(checkedKeys, info) {
        console.log('onCheck', checkedKeys, info);
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
            accept:"image/*",
            showUploadList:false,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    //console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    console.log(info.file.name);
                    dispatch({
                        type: 'posts/uploadImage',
                        payload: {name:info.file.name}
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
                                <Icon type="upload" />上传图片
                            </Button>
                        </Upload>
                    </Col>
                </Row>
            </div>
            <Form className={styles.wrapper} onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={20}>
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
                    </Col>
                    <Col span={4} className={styles.right}>
                        <Collapse bordered={false} className={styles.collapse}>
                            <Panel header="分类目录" key="1" className={styles.customPanelStyle}>
                                <Tree
                                    showIcon
                                    showLine
                                    checkable
                                    defaultExpandedKeys={['0-0-0', '0-0-1']}
                                    defaultSelectedKeys={['0-0-0', '0-0-1']}
                                    defaultCheckedKeys={['0-0-0', '0-0-1']}
                                    onSelect={this.onSelect}
                                    onCheck={this.onCheck}
                                >
                                    <TreeNode title="APP公共开发规范" key="0-0">
                                        <TreeNode title="App公共组件" key="0-0-0">
                                            <TreeNode title="App项目文档" key="0-0-0-0"/>
                                            <TreeNode title="App" key="0-0-0-1"/>
                                        </TreeNode>
                                        <TreeNode title="WEB公共开发规范" key="0-0-1">
                                            <TreeNode title="WEB技术储备" key="0-0-1-0"/>
                                        </TreeNode>
                                        <TreeNode title="leaf" key="0-0-2"/>
                                    </TreeNode>
                                </Tree>
                            </Panel>
                            <Panel header="标签" key="2" className={styles.customPanelStyle}>
                                <Form.Item>
                                    <Input placeholder="多个标签请用英文逗号（,）分开"/>
                                    <Button type="ghost"
                                            onClick={() => dispatch(routerRedux.goBack())}>添加</Button>
                                    <div>{tags}</div>
                                </Form.Item>
                            </Panel>
                            <Panel header="发布状态" key="3" className={styles.customPanelStyle}>
                                <p>dfgdfgdf</p>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>
                <Row>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">发布</Button>
                    </Form.Item>
                </Row>
            </Form>
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