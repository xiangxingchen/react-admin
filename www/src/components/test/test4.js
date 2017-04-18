import React, { Component, PropTypes } from 'react';
import {Row, Col, Card} from 'antd'
import jquery from 'jquery';
//import jquery-ui from 'jquery-ui';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Test5 from './test5';
import Test6 from './test6';

class Test4 extends Component {

    componentDidMount() {
        $( "#sortable" ).sortable({
            revert: true
        });
        $( "#draggable" ).draggable({
            connectToSortable: "#sortable",
            helper: "clone",
            revert: "invalid"
        });
        $( "ul, li" ).disableSelection();
    }

    render() {
        const style={
            border:'1px solid #ccc',
            padding:'5px'
        }
        const style1={
            border:'1px solid #000',
            padding:'5px'
        }

        return (
            <div style={{
                width: '800px',
                height: '800px',
                display: 'flex',
                flexWrap: 'wrap',

              }} >
                <ul>
                    <li id="draggable" style={style1}>Drag me down</li>
                </ul>
                <ul id="sortable">
                    <li style={style}>Item 1</li>
                    <li style={style}>Item 2</li>
                    <li style={style}>Item 3</li>
                    <li style={style}>Item 4</li>
                    <li style={style}>Item 5</li>
                </ul>
            </div>
        );
    }
}

Test4.propTypes = {

};

export default DragDropContext(HTML5Backend)(Test4);