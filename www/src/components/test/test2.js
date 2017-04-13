import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Row,Col } from 'antd';
import Dragula from 'react-dragula';

class Test1 extends React.Component {
    dragula1Decorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
            let options = {
                isContainer: function (el) {
                    return false; // only elements in drake.containers will be taken into account
                },
                moves: function (el, source, handle, sibling) {
                    return true; // elements are always draggable by default
                },
                accepts: function (el, target, source, sibling) {
                    return true; // elements can be dropped in any of the `containers` by default
                },
                invalid: function (el, handle) {
                    return false; // don't prevent any drags from initiating by default
                },
                direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
                copy: false,       // elements are moved by default, not copied
                copySortSource: false,             // elements in copy-source containers can be reordered
                revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
                removeOnSpill: false,              // spilling will `.remove` the element, if this is true
                mirrorContainer: document.body,    // set the element that gets mirror elements appended
                ignoreInputTextSelection: true     // allows users to select input text, see details below
            };

            Dragula([document.getElementById('container66'),
                    document.getElementById('container76'),
                    document.getElementById('container3')],
                options);
        }
    };

    render() {
        const { children } = this.props;

        const style={
            border:'5px solid #000',
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
            <Row style={style} >
                <Col span="10" style={style1} id="container66" ref={this.dragula1Decorator}>{children}</Col>
                <Col span="10" style={style1} id="container76">{children}</Col>
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
