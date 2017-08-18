import React from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {Link} from 'dva/router';

function Tags({tags}){
  return (
    <span>标签:{tags.map(item => {
      return <Link to={`/f/tags/${item._id}`} key={item._id}>{item.name}</Link>
    })}</span>
  )
}

class month extends React.Component {
  render() {
    const {arti,month}=this.props;
    return (<div>{month}月（{arti.length}）
      {arti.map((item, index)=> {
        return <p key={item._id}><Link to={`/f/${item._id}`}>{item.title}</Link>{moment(item.publish_time).format("YYYY-MM-DD")}<Tags tags={item.tags} key={index} /></p>
      })}
    </div>);
  }
}

export default month;

