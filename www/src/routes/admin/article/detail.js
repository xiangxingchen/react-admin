import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Button, Icon,Table, Dropdown, Menu} from 'antd';

class PostsListPage extends React.Component {

    componentWillMount() {

    }
    render(){
        const {postsList,dispatch}= this.props;
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '作者',
            dataIndex: 'author',
            key: 'author'
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                return record.status ===0 ? '草稿' : '发布';
            }
        }, {
            title: '浏览数',
            dataIndex: 'visit_count',
            key: 'visit_count',
            render: (text) => {
                return <span><Icon type="eye"/>{text}</span>;
            }
        }, {
            title: '评论数',
            dataIndex: 'comment_count',
            key: 'comment_count',
            render: (text) => {
                return <span ><Icon type="message" />{text}</span>;
            }
        }, {
            title: '喜欢',
            dataIndex: 'like_count',
            key: 'like_count',
            render: (text) => {
                return <span ><Icon type="heart" style={{color:'red'}} />{text}</span>;
            }
        },{
            title: '标签',
            dataIndex: 'tags',
            key: 'tags'
        }, {
            title: '创建时间',
            dataIndex: 'created',
            key: 'created',
        }, {
            title: '更新时间',
            dataIndex: 'updated',
            key: 'updated',
        },{
            title: '操作',
            key: 'operation',
            width: 100,
            render: (text, record) => {
                return (
                    <Dropdown overlay={<Menu onClick={(e) => this.handleMenuClick(record, e)}>
                            <Menu.Item key='1'><Link to={`/admin/users/edituser/${record._id}`} >编辑</Link></Menu.Item>
                            <Menu.Item key='2'>删除</Menu.Item>
                            </Menu>}>
                        <Button style={{ border: 'none' }}>
                            <Icon style={{ marginRight: 2 }} type='bars' />
                            <Icon type='down' />
                        </Button>
                    </Dropdown>)
            }
        }
        ]

        return (
            <div>
                <div>
                    <Link to="/article/add">
                        <Button type="primary"
                                size="large"
                                icon="addfile">
                            Add Post
                        </Button>
                    </Link>
                    <h1><Icon type="file-text"/>Posts</h1>
                </div>
                <Table
                    bordered
                    scroll={{ x: 1200 }}
                    columns={columns}
                    dataSource={postsList}
                    simple
                    rowKey={record => record._id}
                />
            </div>
        );
    }
}

PostsListPage.propTypes = {
    postsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state, ownProps) {
    return {
        postsList: state.posts.postsList,
    };
}

export default connect(mapStateToProps)(PostsListPage);
