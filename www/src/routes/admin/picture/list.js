import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Card } from 'antd';

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
                <Card style={{ width: 240, boxShadow: '0 2px 6px 1px rgba(0, 0, 0, 0.4)'}} bodyStyle={{ padding: 0 }}>
                    <img alt="example" width="100%" src={`http://localhost:9000/avatar/default.jpg`} />
                </Card>
                {
                    files.map(file => {
                        return (< Card style={{ width: 240, boxShadow: '0 2px 6px 1px rgba(0, 0, 0, 0.4)'}} bodyStyle={{ padding: 0 }}>
                            <div className="custom-image">
                                <img alt="example" width="100%" src={`http://localhost:9000/avatar/${file}`}/>
                            </div>
                            <div className="custom-card">
                                <h3>Europe Street beat</h3>
                                <p>www.instagram.com</p>
                            </div>
                        </Card>)
                    })
                }
            </div>
        )
    }
}

PictureList.propTypes = {
    files: PropTypes.array,
}

function mapStateToProps(state, ownProps) {
    console.log(state)
    return {
        users: state.users,
        files: state.profile.files,
    };
}

export default connect(mapStateToProps)(PictureList);
