import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Draggable from 'react-draggable';
import Test4 from '../../components/test/test4';
import Test3 from '../../components/test/test3';

class Test extends React.Component {
    render() {
        return (<Test4/>);
    }
}

Test.propTypes = {
    users: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
    return {
        users: state.users,
    };
}

export default connect(mapStateToProps)(Test);
