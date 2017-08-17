import React from 'react';
import {connect} from 'dva';
import moment from 'moment';
import { Row, Col } from 'antd';
import Month from './month';

class years extends React.Component {
  render() {
    const {year,month}=this.props;
    const component=[];
    _.forInRight(month, function(value, key) {
      component.push(<Month month={key} arti={value} key={key}/>);
    });
    return (<div>{year}
      {component}
    </div>);
  }
}

export default years;

