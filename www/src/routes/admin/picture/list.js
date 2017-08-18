import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Card, Col,Modal } from 'antd';
import style from './list.less';

const confirm = Modal.confirm;

class PictureList extends React.Component {

    componentWillMount() {
        this.props.dispatch({
            type: 'profile/initImageList',
        });
    }
    onClick =(file, index)=>{
        const {dispatch}=this.props;
        confirm({
            title: `您确定要图片${file}吗?`,
            onOk () {
                dispatch({
                    type: 'profile/delImg',
                    payload: {file, index}
                })
            }
        })
    };

    render() {
        const files = this.props.files;
        return (
            <div>
                {files.map((file, index)=> {
                    return (<Col span="6" key={index}>
                        < Card className={style.card} bodyStyle={{padding:0}}>
                            <img alt="example" src={`http://localhost:9000/avatar/${file}`} className={style.img}/>
                        </Card>
                        <div>{file}<a onClick={()=>this.onClick(file,index)}>删除</a></div>
                    </Col>)
                })}
            </div>
        )
    }
}

PictureList.propTypes = {
    files: PropTypes.array,
}

function mapStateToProps(state, ownProps) {
    return {
        users: state.users,
        files: state.profile.files,
    };
}

export default connect(mapStateToProps)(PictureList);
