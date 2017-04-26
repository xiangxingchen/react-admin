import React, {PropTypes} from 'react';
import {connect} from 'dva';
import Publish from './publish';
import List from './List';

class CommentsList extends React.Component {
    render() {
        return (
            <div>
                <Publish {...this.props}/>
                <List {...this.props} />
            </div>
        )
    }
}
function mapStateToProps(state, ownProps) {
    return {
        commentsList: state.posts.descendants,
        user:state.user.account,
    };
}

export default connect(mapStateToProps)(CommentsList);