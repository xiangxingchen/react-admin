import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Table, Modal,Form,Tag } from 'antd';

const color=['pink','red','orange','green','cyan','blue','purple'];
const confirm = Modal.confirm;
class tags extends React.Component {

    componentWillMount() {
        this.props.dispatch({
            type: 'posts/getFrontTagList',
            payload: {pageInfo: {limit: 10, page: 1}}
        });
    }

    onClick =(id, index)=>{
        const {dispatch}=this.props;
        confirm({
            title: `您确定要删除吗?`,
            onOk () {
                dispatch({
                    type: 'posts/deleteTag',
                    payload: {id, index}
                })
            }
        })
    };

    render() {
        const {tags}= this.props;

        const columns = [{
            title: '标签',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                let i=parseInt(Math.random()*7)
                return <Tag color={color[i]}>{text}</Tag>
            }
        },{
            title: '是否显示',
            dataIndex: 'is_show',
            key: 'is_show',
            render: (text, record) => {
                return text ? <div>是</div> : <div>否</div>
            }
        },{
            title: '操作',
            key: 'operation',
            width: 100,
            render: (text, record,index) => {
                return (<a onClick={()=>this.onClick(record._id,index)}>删除</a>)
            }
        }]

        return (
            <div>
                <Table
                    bordered
                    scroll={{ x: 1100 }}
                    columns={columns}
                    dataSource={tags}
                    simple
                    rowKey={record => record._id}
                />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        tags: state.posts.tags,
    };
}

tags = Form.create()(tags);
export default connect(mapStateToProps)(tags);
