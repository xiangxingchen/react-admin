import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Row,Col } from 'antd';
import Dragula from 'react-dragula';
import Test2 from './test2';
import Test1 from './test1';
import style from './test3';
const options = {
    isContainer: function (el) {
        return false;
    },
    moves: function (el, source, handle, sibling) {
        return true;
    },
    accepts: function (el, target, source, sibling) {
        return true;
    },
    invalid: function (el, handle) {
        return false;
    },
    direction: 'vertical',
    copy: function (el, source) {
        if (el.id=='test') {
            source.firstChild.firstChild.id = 'container'.concat((Number(source.firstChild.firstChild.id.split('container')[1]) + 2).toString());
            source.firstChild.lastChild.id = 'container'.concat((Number(source.firstChild.lastChild.id.split('container')[1]) + 2).toString());
        }
        return true;
    },
    copySortSource: true,
};
let drag;
class Test3 extends React.Component {

    componentWillUnmount() {
        //console.log(drag);
        //console.log(drag.containers.slice(0,3));
        drag.containers = drag.containers.slice(0,3);
        //console.log(drag);
    }
    dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
             drag = Dragula([document.getElementById('container1'),
                    document.getElementById('container2'),
                    document.getElementById('container3')],
                options)
                .on('drag', function (el) {
                    //options.copy=false;
                }).on('drop', function (el, container) {
                    if (el.id=='test'){
                        const firstId = 'container'.concat((Number(el.firstChild.id.split('container')[1])-2).toString());
                        const lastId = 'container'.concat((Number(el.lastChild.id.split('container')[1])-2).toString());
                        el.firstChild.id =firstId;
                        el.lastChild.id =lastId;
                        drag.containers.push(document.getElementById(firstId));
                        drag.containers.push(document.getElementById(lastId));
                    }
                }).on('over', function (el, container) {
                    //console.log(container);
                    container.className += 'ex-over';
                }).on('out', function (el, container) {
                    container.className = container.className.replace('ex-over', '');
                }).on('cloned', function (el, original,type) {

                }).on('shadow', function (el, container,source) {
                    //console.log('shadow',container);
                });
            console.log(drag);
        }
    };

    render() {
        const style={
            border:'1px solid #ccc',
            margin:'5px',
            padding:'15px',
        }
        const style1={
            border:'1px solid #eee',
            backgroundColor: '#945666',
            margin:'5px',
            padding:'5px',
        }
        const style2={
            margin:'5px',
            padding:'25px',
        }

        return (
        <div className='container' ref={this.dragulaDecorator}>
            <Row>
                <Col span="20">
                <div id="container1" style={style}>
                    我是一个容器fffff
                </div>
                </Col>
                <Col span="4">
                    <div id="container2" >
                        <Test1 style={style2}  id="test"/>
                        <Test2 style={style2}  id="test1"/>
                    </div>
                    <div id="container3">
                        <div style={style1}>工作中经常用到github上优秀、实用、轻量级、无依赖的插件和库</div>
                        <div style={style1}>大家对CSS再次感到不安。现在是时候站在制高点 </div>
                        <div style={style1}>现在是时候站在制高点 </div>
                        <div style={style1}>实用、轻量级、无依赖的插件和库</div>
                        <div style={style1}>无依赖的插件和库</div>
                    </div>
                </Col>

            </Row>
        </div>
        );
    }
}

Test3.propTypes = {
    users: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
    return {
        users: state.user,
    };
}

export default connect(mapStateToProps)(Test3);
