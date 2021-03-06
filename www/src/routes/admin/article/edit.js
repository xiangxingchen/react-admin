import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Icon, Input, Form, Row, Col, Button, Spin, Collapse, Tree, Tag, Card,Upload } from 'antd';
import Editor from '../../../components/Editor/Editor';
import styles from './article.less';
const Panel = Collapse.Panel;
const TreeNode = Tree.TreeNode;

class PostEditor extends React.Component {

    componentWillMount() {
        const { dispatch, params } = this.props;
        dispatch({
            type: 'posts/getPost',
            payload: {id: params.id, isEdit: true}
        });
    }

    componentWillUnmount() {
        this.props.dispatch({type: 'posts/isNewTrue'});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {dispatch,form,params}=this.props;
        form.validateFields((error, values) => {
            const {title, content} = values;
            if (!error) {
                dispatch({
                    type: 'posts/updatePost',
                    payload: {title, content,id:params.id}
                });
            }
        });
    }

    onSelect(selectedKeys, info) {
    }

    onCheck(checkedKeys, info) {
    }

    render() {
        const {form,post,dispatch}= this.props;

        const {getFieldDecorator,getFieldValue} =form;
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
                }
                if (info.file.status === 'done') {
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
                <Col span='16'>
                    <h1><Icon type="edit" className={styles.icon}/>编辑文章</h1>
                </Col>
                <Col>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" />上传图片
                        </Button>
                    </Upload>
                </Col>
            </div>
            <Form className={styles.wrapper} onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={20}>
                        <Form.Item>
                            {getFieldDecorator('title', {
                                initialValue: post.title === undefined ? '标题' : post.title,
                                rules: [{required: true, message: 'Please input title!'}]
                            })(<Input type="text" placeholder="请输入标题."/>)
                            }
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('content', {
                                initialValue: post.content === undefined ? '# hello' : post.content,
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
                        <Button htmlType="submit" type="primary">更新</Button>
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