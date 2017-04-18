import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Icon, Input, Form, Row, Col, Button, Spin, Collapse, Tree, Tag, Card } from 'antd';
import Editor from '../../../components/Editor/Editor';
import styles from './PostEditor.css';
const Panel = Collapse.Panel;
const TreeNode = Tree.TreeNode;

class PostEditor extends React.Component {

    componentWillMount() {
        const { dispatch, params } = this.props
        //dispatch({
        //    type: 'editor/getArticle',
        //    payload: {id: params.id}
        //});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {isCreator,dispatch,form}=this.props;
        form.validateFields((error, values) => {
            console.log(values);
            const {title, content} = values;
            if (!error) {
                if (isCreator) {
                    dispatch({
                        type: 'posts/createPost',
                        payload: {title, content}
                    });
                } else {
                    dispatch({
                        type: 'posts/patchPost',
                        payload: {title, content, post_id: post.post_id}
                    });
                }
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
        const {form,post,dispatch,isCreator,loadingSubmit,loadingEditorContent}= this.props;
        const {getFieldDecorator,getFieldValue} =form;
        const tags = <Tag closable onClose={(e)=>console.log(e)} color="pink">React</Tag>;

        return (<div>
            <div className={styles.title}>
                <h1><Icon type="edit" className={styles.icon}/>
                    {isCreator ? '添加文章' : 'Edit Post'}
                </h1>
            </div>
            <Spin spinning={isCreator ? false : loadingEditorContent} tip="Loading Editor...">
                <Form className={styles.wrapper} onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={20}>
                            <Form.Item>
                                {
                                    getFieldDecorator('title', {
                                        initialValue: isCreator ? 'Example title' : post.title,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input title!'
                                            }
                                        ]
                                    })(<Input placeholder="请输入标题."/>)
                                }
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('content', {
                                        initialValue:  isCreator ? '# 内容区' : post.content,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input content!'
                                            }
                                        ]
                                    })(<Editor />)
                                }
                            </Form.Item>
                        </Col>
                        <Col span={4} className={styles.right} >
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
                            <Button.Group className={styles.group}>
                                <Button type="ghost" onClick={() => dispatch(routerRedux.goBack())}>Back</Button>
                                <Button icon={isCreator ? 'plus-square-o' : 'edit'}
                                        htmlType="submit"
                                        type="primary"
                                        loading={loadingSubmit}
                                >{isCreator ? 'Create' : 'Edit'}</Button>
                            </Button.Group>
                        </Form.Item>
                    </Row>
                </Form>
            </Spin>
        </div>);
    }
}

PostEditor.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isCreator: PropTypes.bool.isRequired,
    post: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        isCreator: state.posts.isCreator,
        post: state.posts.post,
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