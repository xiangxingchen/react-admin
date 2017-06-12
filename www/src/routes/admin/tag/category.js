import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Table, Modal,Form } from 'antd';

const confirm = Modal.confirm;
class category extends React.Component {

    componentWillMount() {
        this.props.dispatch({
            type: 'posts/getTagCatList',
            payload: {pageInfo: {limit: 10, page: 1}}
        });
    }

    onClick =(id, index)=>{
        const {dispatch}=this.props;
        confirm({
            title: `您确定要删除吗?`,
            onOk () {
                dispatch({
                    type: 'posts/delTagCat',
                    payload: {id, index}
                })
            }
        })
    };

    render() {
        const {tagCat}= this.props;
        console.log(tagCat);
        const columns = [{
            title: '分类',
            dataIndex: 'name',
            key: 'name'
        },{
            title: '描述',
            dataIndex: 'desc',
            key: 'desc'
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
                    dataSource={tagCat}
                    simple
                    rowKey={record => record._id}
                />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        tagCat: state.posts.tagCat,
    };
}

category = Form.create()(category);
export default connect(mapStateToProps)(category);
