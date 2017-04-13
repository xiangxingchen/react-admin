import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Row,Col } from 'antd';
import Dragula from 'react-dragula';

class Test1 extends React.Component {

    render() {
        const { children } = this.props;

        const style={
            border:'5px solid #ccc',
            margin:'5px',
            padding:'10px',
        };
        const style1={
            border:'2px solid #000',
            margin:'5px',
            padding:'20px',
            backgroundColor: '#eee',
        };
        return (
            <Row style={style} id="test">
                <Col span="11" style={style1} id="container4">{children}</Col>
                <Col span="11" style={style1} id="container5">{children}</Col>
            </Row>
        );
    }
}

Test1.propTypes = {
    users: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
    return {
        users: state.user,
    };
}

export default connect(mapStateToProps)(Test1);
