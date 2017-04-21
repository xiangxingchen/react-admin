import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import moment from 'moment';
import {Button, Icon,Table, Dropdown, Menu, Modal,Form,Row,Col,Input,Switch } from 'antd';
const confirm = Modal.confirm;

class PostsListPage extends React.Component {

    componentWillMount() {
        this.props.dispatch({
            type: 'posts/getPostsList',
            payload: {pageInfo: {limit: 10, page: 1}}
        });
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
        const {postsList,dispatch,form}= this.props;
        const {getFieldDecorator} =form;
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => {
                return <Link to={`/article/detail/${record._id}`}>{text}</Link>
            }
        }, {
            title: '作者',
            dataIndex: 'author',
            key: 'author'
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                return record.status === 0 ? '草稿' : '发布';
            }
        }, {
            title: '浏览数',
            dataIndex: 'visit_count',
            key: 'visit_count',
            render: (text) => {
                return <span><Icon type="eye"/>{text}</span>;
            },
            sorter: (a, b) => a.visit_count - b.visit_count,
        }, {
            title: '评论数',
            dataIndex: 'comment_count',
            key: 'comment_count',
            render: (text) => {
                return <span ><Icon type="message"/>{text}</span>;
            }
        }, {
            title: '喜欢',
            dataIndex: 'like_count',
            key: 'like_count',
            render: (text) => {
                return <span ><Icon type="heart" style={{color:'red'}}/>{text}</span>;
            }
        }, {
            title: '评论开关',
            dataIndex: 'allow_comment',
            key: 'allow_comment',
            render: (text,record) => {
                const id =record._id;
                return <Switch defaultChecked={text} onChange={(checked) =>{this.onChange(checked,id)}} />;
            }
        }, {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags'
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
            total: postsList.count,
            current: postsList.currentPage,
            showTotal: total => `共 ${total} 条`,
            //pageSizeOptions: ['5', '10', '15', '20'],
            //showSizeChanger: true,
            //onShowSizeChange: (current, pageSize) => {
            //    this.props.dispatch({
            //        type: 'posts/getPostsList',
            //        payload: {pageInfo: {limit: pageSize, page: current}}
            //    });
            //},
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
                    dataSource={postsList.data}
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
        postsList: state.posts.postsList,
    };
}

PostsListPage = Form.create()(PostsListPage);
export default connect(mapStateToProps)(PostsListPage);
