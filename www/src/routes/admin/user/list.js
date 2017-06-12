import React, { PropTypes } from 'react'
import { routerRedux, Link } from 'dva/router'
import { connect } from 'dva'
import moment from 'moment';
import { Table, Dropdown, Menu, Button, Icon, Modal,Row,Col,Form,Input } from 'antd';
const confirm = Modal.confirm;

class UserList extends React.Component {
    state={
        selectedRowKeys:[]
    }

    componentWillMount() {
        this.props.dispatch({
            type: 'user/getUserList',
            payload: {currentPage: 0}
        });
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        console.log(1)
        const {dispatch,form}=this.props;
        form.validateFields((error, values) => {
            const { search } = values;
            if (!error) {
                dispatch({
                    type: 'user/searchUser',
                    payload: {search}
                });
            }
        });
    }
    handleMenuClick = (record, e) => {
        const that = this;
        if (e.key === '1') {
            // this.props.dispatch({
            //     type: 'user/userInfo',
            //     payload: {id: record._id}
            // })
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
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    delSelect = ()=> {
        const {selectedRowKeys} = this.state;
        this.props.dispatch({
            type: 'user/destroyAllSelect',
            payload: {id:selectedRowKeys}
        });
    }

    render() {
        const { userList, loading  }= this.props.users;
        const {selectedRowKeys} = this.state;
        const {getFieldDecorator} =this.props.form;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
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
            <div>
            <Row>
                <Col span={2}>
                    <Button disabled={!selectedRowKeys.length > 0} onClick={this.delSelect}>批量删除</Button>
                </Col>
                <Form onSubmit={this.handleSubmit}>
                    <Col span={6} offset="13">
                        <Form.Item>
                            {getFieldDecorator('search')(<Input type="text" placeholder="请输入标题或作者名字"/>)}
                        </Form.Item>
                    </Col>
                    <Col span={1} offset="1">
                        <Form.Item>
                            <Button htmlType="submit" type="primary">搜索</Button>
                        </Form.Item>
                    </Col>
                </Form>
            </Row>
            <Table
                bordered
                scroll={{ x: 1100 }}
                columns={columns}
                dataSource={userList}
                loading={loading}
                simple
                rowKey={record => record._id}
                rowSelection={rowSelection}
            />
            </div>
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
UserList = Form.create()(UserList);
export default connect(mapStateToProps)(UserList);
