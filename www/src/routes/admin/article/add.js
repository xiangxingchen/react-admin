import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Icon, Input, Form, Row, Col, Button, Spin, Collapse, Tree, Tag} from 'antd';
import styles from './PostEditor.css';
import marked from 'marked';
const Panel = Collapse.Panel;
const TreeNode = Tree.TreeNode;

class PostEditor extends React.Component {


    handleSubmit(e) {
        e.preventDefault();
        validateFields((error, {postTitle, postContent}) => {
            if (!error) {
                if (isCreator) {
                    dispatch({
                        type: 'editor/createPost',
                        payload: {
                            title: postTitle,
                            content: postContent
                        }
                    });
                } else {
                    dispatch({
                        type: 'editor/patchPost',
                        payload: {
                            title: postTitle,
                            content: postContent,
                            post_id: post.post_id
                        }
                    });
                }
            }
        });
    }

    onSelect (selectedKeys, info){
        console.log('selected', selectedKeys, info);
    }
    onCheck (checkedKeys, info) {
        console.log('onCheck', checkedKeys, info);
    }
    render(){
        const {form,post,dispatch,isCreator,loadingSubmit,loadingEditorContent}= this.props;
        const {getFieldDecorator,validateFields,getFieldValue} =form;
        const tags = <Tag closable onClose={(e)=>console.log(e)}color="pink">React</Tag>;
        const customPanelStyle = {
            background: '#fff',
            borderRadius: 4,
            marginBottom: 24,
            border: 0,
            hover:'#fff',
        };

        return (<div>
            <div className={styles.title}>
                <h3 className={styles.group}>
                    <Icon type="smile-o" className={styles.icon}/>P.S. MarkDown supported!
                </h3>
                <h1><Icon type="edit" className={styles.icon}/>
                    {isCreator ? 'Create New Post' : 'Edit Post'}
                </h1>
            </div>
            <Spin spinning={isCreator ? false : loadingEditorContent} tip="Loading Editor...">
                <Form className={styles.wrapper} onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={10}>
                            <Form.Item>
                                {
                                    getFieldDecorator('postTitle', {
                                        initialValue: isCreator ? 'Example title' : post.title,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input title!'
                                            }
                                        ]
                                    })(<Input placeholder="Title..."/>)
                                }
                            </Form.Item>
                            <Form.Item>
                                {
                                    getFieldDecorator('postContent', {
                                        initialValue: isCreator ? '## this is a example \n\n wow~~' : post.content,
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input content!'
                                            }
                                        ]
                                    })(<Input type="textarea" placeholder="Content..." autosize={{minRows: 18}}/>)
                                }
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <h2 className={styles.previewLeading}>{getFieldValue('postTitle')}</h2>
                            <div dangerouslySetInnerHTML={{__html: marked(getFieldValue('postContent'),{sanitize: true})}}/>
                        </Col>
                        <Col span={4}>
                            <Collapse bordered={false}  >
                                <Panel header="分类目录" key="1" style={customPanelStyle}>
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
                                                <TreeNode title="App项目文档" key="0-0-0-0" />
                                                <TreeNode title="App" key="0-0-0-1" />
                                            </TreeNode>
                                            <TreeNode title="WEB公共开发规范" key="0-0-1">
                                                <TreeNode title="WEB技术储备" key="0-0-1-0" />
                                            </TreeNode>
                                            <TreeNode title="leaf" key="0-0-2" />
                                        </TreeNode>
                                    </Tree>
                                </Panel>
                                <Panel header="标签" key="2" style={customPanelStyle}>
                                    <Form.Item>
                                        <Input placeholder="多个标签请用英文逗号（,）分开"/>
                                        <Button type="ghost" onClick={() => dispatch(routerRedux.goBack())}>添加</Button>
                                        <div>{tags}</div>
                                    </Form.Item>
                                </Panel>
                                <Panel header="发布状态" key="3" style={customPanelStyle}>
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
        isCreator: state.editor.isCreator,
        post: state.editor.post,
        loadingSubmit: state.loading.effects['posts/createNewPost'] || state.loading.effects['posts/patchPost'],
        loadingEditorContent: state.loading.effects['editor/initializeEditorContent']
    };
}

export default connect(mapStateToProps)(Form.create({})(PostEditor));
