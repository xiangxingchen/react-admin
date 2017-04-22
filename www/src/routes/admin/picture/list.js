import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Card, Col } from 'antd';
import style from './list.less';
class PictureList extends React.Component {

    componentWillMount() {
        this.props.dispatch({
            type: 'profile/initImageList',
        });
    }

    render() {
        const files = this.props.files;
        console.log(files);
        return (
            <div>
                {files.map((file, index)=> {
                    return (<Col span="3" key={index}>
                        < Card className={style.card} bodyStyle={{padding:0}}>
                            <img alt="example" src={`http://localhost:9000/avatar/${file}`} className={style.img}/>
                        </Card>
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
