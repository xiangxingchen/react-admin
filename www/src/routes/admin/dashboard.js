import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {Row, Col, Card,Timeline,Pagination } from 'antd';
import moment from 'moment';

import styles from './dashboard.less'

const Item =Timeline.Item;
class Dashboard extends React.Component {

    componentWillMount() {
        this.props.dispatch({
            type: 'app/getLogsList',
            payload: {logInfo: {itemsPerPage: 10, currentPage: 1}}
        });
    }
    onChange = (page) => {
        this.props.dispatch({
            type: 'app/getLogsList',
            payload: {logInfo: {itemsPerPage: 10, currentPage: page}}
        });
    };

    render() {
        const {systemLogs} = this.props;
        const items =[];
        systemLogs.data.map((item,index)=>{
            const time = moment(item.created).format("YYYY-MM-DD hh:mm:ss");
            items.push(<Item key={index}><p>{time}</p><p>{item.content}</p></Item>)
        });
        return (
            <Row>
                <Col span="11" offset="1">
                    <Card title="操作记录">
                        <Timeline>
                            {items}
                        </Timeline>
                        <Pagination
                            key="system"
                            current={systemLogs.currentPage}
                            total={ systemLogs.count }
                            showTotal={(total, range) => `共 ${total} 条`}
                            onChange={ this.onChange }
                            pageSize={10}
                            defaultCurrent={1}
                        />
                    </Card>
                </Col>
            </Row>
        );
    }
}

Dashboard.propTypes = {}

function mapStateToProps(state) {
    return {
        systemLogs:state.app.systemLogs,
    };
}

export default connect(mapStateToProps)(Dashboard);
