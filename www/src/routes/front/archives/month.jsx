import React from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {Link} from 'dva/router';
import { Row, Col } from 'antd';

class month extends React.Component {
  render() {
    const {arti,month}=this.props;
    return (<div>{month}
      {arti.map(item => {
        return <p key={item._id}><Link to={`/f/${item._id}`}>{item.title}</Link>{moment(item.publish_time).format("YYYY-MM-DD")}</p>
      })}
    </div>);
  }
}

export default month;

