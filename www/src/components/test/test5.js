import React, { Component, PropTypes } from 'react';
import Square from './Square';
import { canMoveKnight, moveKnight } from './Game';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
    canDrop(props) {
        return true;
    },
    drop(props) {
        console.log(props);
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

class Test5 extends Component {
    render() {
        const {  connectDropTarget, isOver, canDrop } = this.props;

        return connectDropTarget(
            <div style={{height: '400px', border: '1px solid #000',width:'400px' }}>

            </div>
        );
    }
}

Test5.propTypes = {
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(Test5);