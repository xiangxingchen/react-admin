import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import moment from 'moment';
import {Button, Icon,Table, Dropdown, Menu, Modal,Form,Row,Col,Input,Switch,Tag } from 'antd';
import deepEqual from '../../utils/deepEqual';

const confirm = Modal.confirm;
class PostsListPage extends React.Component {

    componentWillMount() {
        this.props.dispatch({
            type: 'posts/getAllCommentList',
            payload: {pageInfo: {limit: 10, page: 1}}
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        const fields = ['allComment'];
        var b = deepEqual(this.props, nextProps, fields);
        if (b) {
            return false;
        }
        return true;
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        const {dispatch,form}=this.props;
        form.validateFields((error, values) => {
            const { search } = values;
            if (!error) {
                dispatch({
                    type: 'posts/searchArticle',
                    payload: {search}
                });
            }
        });
    }
    onChange(checked, id){
        this.props.dispatch({
            type: 'posts/changeComment',
            payload: {checked,id}
        });
    }

    handleMenuClick = (record, e) => {
        const { dispatch } = this.props
        if (e.key === '2') {
            confirm({
                title: '您确定要删除这条记录吗?',
                onOk () {
                    dispatch({
                        type: 'posts/deletePost',
                        payload: {id: record._id}
                    })
                }
            })
        }
    }

    render() {
        const {allComment,dispatch,form}= this.props;
        console.log(allComment);
        const {getFieldDecorator} =form;
        const columns = [{
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => {
                return <Link to={`/article/detail/${record.aid}`}>{text}</Link>
            }
        }, {
            title: '评论人',
            dataIndex: 'nickname',
            key: 'nickname'
        },{
            title: '评论开关',
            dataIndex: 'allow_comment',
            key: 'allow_comment',
            render: (text,record) => {
                const id =record.aid;
                return <Switch defaultChecked={text} onChange={(checked) =>{this.onChange(checked,id)}} />;
            }
        }, {
                title: '创建时间',
                dataIndex: 'created',
                key: 'created',
                render: (text) => {
                    return moment(text).format("YYYY-MM-DD hh:mm:ss");
                },
                sorter: (a, b) => {
                    const updateda = new Date(a.created);
                    const updatedb=new Date(b.created);
                    return updateda.getTime()-updatedb.getTime();
                },
            }, {
                title: '更新时间',
                dataIndex: 'updated',
                key: 'updated',
                render: (text) => {
                    return moment(text).format("YYYY-MM-DD hh:mm:ss");
                },
                sorter: (a, b) => {
                    const updateda = new Date(a.updated);
                    const updatedb=new Date(b.updated);
                    return updateda.getTime()-updatedb.getTime();
                },
            }, {
                title: '操作',
                key: 'operation',
                width: 100,
                render: (text, record) => {
                    return (
                        <Dropdown overlay={<Menu onClick={(e) => this.handleMenuClick(record, e)}>
                            <Menu.Item key='1'><Link to={`/article/editArticle/${record._id}`} >编辑</Link></Menu.Item>
                            <Menu.Item key='2'>删除</Menu.Item>
                            </Menu>}>
                            <Button style={{ border: 'none' }}>
                                <Icon style={{ marginRight: 2 }} type='bars'/>
                                <Icon type='down'/>
                            </Button>
                        </Dropdown>)
                }
            }
        ]

        const pagination = {
            total: allComment.count,
            current: allComment.currentPage,
            showTotal: total => `共 ${total} 条`,
            onChange: (current) => {
                this.props.dispatch({
                    type: 'posts/getPostsList',
                    payload: {pageInfo: {limit: 10, page: current}}
                });
            },
        };

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={6} offset="14">
                            <Form.Item>
                                {getFieldDecorator('search')(<Input type="text" placeholder="请输入标题或作者名字"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={1} offset="1">
                            <Form.Item>
                                <Button htmlType="submit" type="primary">搜索</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Table
                    bordered
                    scroll={{ x: 1200 }}
                    columns={columns}
                    dataSource={allComment.data}
                    simple
                    rowKey={record => record._id}
                    pagination={pagination}
                />
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        allComment: state.posts.allComment,
    };
}

PostsListPage = Form.create()(PostsListPage);
export default connect(mapStateToProps)(PostsListPage);
