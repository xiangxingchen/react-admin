import React from 'react';
import {connect} from 'dva';
import moment from 'moment';
import { Row, Col } from 'antd';

class month extends React.Component {
  render() {
    const {arti,month}=this.props;
    return (<div>{month}
    </div>);
  }
}

export default month;

