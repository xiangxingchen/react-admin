import React, { PropTypes } from 'react';
import style from '../header/header.less';
import { Row, Col, Card, Rate,Icon } from 'antd';

class about extends React.Component {
    render() {
        return (
            <div className={style.aboutme}>
                <Card title="关于我">
                    <div className={style.base}>
                        <h2><Icon type="solution" /> 基本信息</h2>
                        <Row><Col span={3} offset={1}>姓名:</Col><Col span={8}>陈祥</Col></Row>
                        <Row><Col span={3} offset={1}>学校:</Col><Col span={8}>江苏大学</Col></Row>
                        <Row><Col span={3} offset={1}>学历:</Col><Col span={8}>本科</Col></Row>
                    </div>
                    <div className={style.base}>
                        <h2><Icon type="star-o" /> 技能点</h2>
                        <Row><Col span={3} offset={1}>React:</Col><Col span={8}><Rate disabled defaultValue={4} /></Col></Row>
                        <Row><Col span={3} offset={1}>Redux:</Col><Col span={8}><Rate disabled defaultValue={3} /></Col></Row>
                        <Row><Col span={3} offset={1}>git:</Col><Col span={8}><Rate disabled defaultValue={3} /></Col></Row>
                        <Row><Col span={3} offset={1}>node:</Col><Col span={8}><Rate disabled defaultValue={3} /></Col></Row>
                        <Row><Col span={3} offset={1}>mongodb:</Col><Col span={8}><Rate disabled defaultValue={3} /></Col></Row>
                        <Row><Col span={3} offset={1}>webpack:</Col><Col span={8}><Rate disabled defaultValue={2} /></Col></Row>
                    </div>
                    <div className={style.base}>
                        <h2><Icon type="contacts" /> 联系方式</h2>
                        <Row><Col span={2} offset={1}><Icon type="github" /></Col><Col span={8}><a href="https://github.com/xiangxingchen">https://github.com/xiangxingchen</a></Col></Row>
                        <Row><Col span={2} offset={1}><Icon type="mail" /></Col><Col span={8}><a>xchxiang@gmail.com</a></Col></Row>
                        <Row><Col span={2} offset={1}><Icon type="mobile" /></Col><Col span={8}><a>15751007115</a></Col></Row>
                    </div>
                </Card>
            </div>
        );
    }
}


export default about;