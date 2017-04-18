import React, { PropTypes } from 'react'
import { routerRedux, Link } from 'dva/router'
import { connect } from 'dva'
import moment from 'moment';
import { Table, Dropdown, Menu, Button, Icon, Modal } from 'antd';
import styles from './list.less'
import classnames from 'classnames'
import TableBodyWrapper from '../../../components/admin/common/TableBodyWrapper'
const confirm = Modal.confirm;

class UserList extends React.Component {

    componentWillMount() {
        this.props.dispatch({
            type: 'user/getUserList',
            payload: {currentPage: 0}
        });
    }

    handleMenuClick = (record, e) => {
        const that = this;
        if (e.key === '1') {
            this.props.dispatch({
                type: 'user/userInfo',
                payload: {id: record._id}
            })
        } else if (e.key === '2') {
            confirm({
                title: '您确定要删除这条记录吗?',
                onOk () {
                    that.props.dispatch({
                        type: 'user/delete',
                        payload: {id: record._id}
                    })
                }
            })
        }
    }

    render() {
        const { userList, loading  }= this.props.users;
        const columns = [{
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname'
        }, {
            title: '创建时间',
            dataIndex: 'created',
            key: 'created',
            render: (text) => {
                return moment(text).format("dddd, MMMM Do YYYY, h:mm:ss a");
            }
        }, {
            title: '更新时间',
            dataIndex: 'updated',
            key: 'updated',
            render: (text) => {
                return moment(text).format("dddd, MMMM Do YYYY, h:mm:ss a");
            }
        }, {
            title: '角色',
            dataIndex: 'role',
            key: 'role'
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email'
        }, {
            title: '操作',
            key: 'operation',
            width: 100,
            render: (text, record) => {
                return (
                    <Dropdown overlay={<Menu onClick={(e) => this.handleMenuClick(record, e)}>
                            <Menu.Item key='1'><Link to={`/users/edituser/${record._id}`} >编辑</Link></Menu.Item>
                            <Menu.Item key='2'>删除</Menu.Item>
                            </Menu>}>
                        <Button style={{ border: 'none' }}>
                            <Icon style={{ marginRight: 2 }} type='bars'/>
                            <Icon type='down'/>
                        </Button>
                    </Dropdown>)
            }
        }]

        return (
            <Table
                bordered
                scroll={{ x: 1200 }}
                columns={columns}
                dataSource={userList}
                loading={loading}
                simple
                rowKey={record => record._id}
            />
        )
    }
}

UserList.propTypes = {
    userList: PropTypes.array,
}

function mapStateToProps(state, ownProps) {
    return {
        users: state.user,
    };
}

export default connect(mapStateToProps)(UserList);
