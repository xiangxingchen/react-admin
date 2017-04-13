import React, { Component, PropTypes } from 'react';
import {Row, Col, Card} from 'antd'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Test5 from './test5';
import Test6 from './test6';

class Test4 extends Component {
    render() {
        return (
            <div style={{
                width: '800px',
                height: '800px',
                display: 'flex',
                flexWrap: 'wrap'
              }}>
                <Row>
                    <Col span="10"><Test5/></Col>
                    <Col span="10"><Test6/></Col>
                </Row>
            </div>
        );
    }
}

Test4.propTypes = {

};

export default DragDropContext(HTML5Backend)(Test4);