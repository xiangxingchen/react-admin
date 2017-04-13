import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {Row, Col, Card} from 'antd'
import NumberCard from '../../components/admin/dashboard/numberCard'
import Quote from '../../components/admin/dashboard/quote'
import Sales from '../../components/admin/dashboard/sales'
import Weather from '../../components/admin/dashboard/weather'
import RecentSales from '../../components/admin/dashboard/recentSales'
import Comments from '../../components/admin/dashboard/comments'
import Completed from '../../components/admin/dashboard/completed'
import Browser from '../../components/admin/dashboard/browser'
import Cpu from '../../components/admin/dashboard/cpu'
import User from '../../components/admin/dashboard/user'
import styles from './dashboard.less'
import {color} from '../../utils/index'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff'
  }
}

function Dashboard ({dashboard}) {
  const {weather, sales, quote, numbers, recentSales, comments, completed, browser, cpu, user} = dashboard
  const numberCards = numbers.map((item, key) => <Col key={key} lg={6} md={12}>
    <NumberCard {...item} />
  </Col>)

  return (
    <Row gutter={24}>
      {numberCards}
      <Col lg={18} md={24}>
        <Card bordered={false} bodyStyle={{ padding: '24px 36px 24px 0' }}>
          <Sales data={sales} />
        </Card>
      </Col>
      <Col lg={6} md={24}>
        <Row gutter={24}>
          <Col lg={24} md={12}>
            <Card bordered={false} className={styles.weather} bodyStyle={{padding: 0, height: 204, background: color.blue }}>
              <Weather {...weather} />
            </Card>
          </Col>
          <Col lg={24} md={12}>
            <Card bordered={false} className={styles.quote} bodyStyle={{ padding: 0, height: 204, background: color.peach }}>
              <Quote {...quote} />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col lg={12} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <RecentSales data={recentSales} />
        </Card>
      </Col>
      <Col lg={12} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <Comments data={comments} />
        </Card>
      </Col>
      <Col lg={24} md={24}>
        <Card bordered={false} bodyStyle={{
          padding: '24px 36px 24px 0'
        }}>
          <Completed data={completed} />
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <Browser data={browser} />
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} {...bodyStyle}>
          <Cpu {...cpu} />
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} bodyStyle={{...bodyStyle.bodyStyle, padding: 0}}>
          <User {...user} />
        </Card>
      </Col>
    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object
}

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
  };
}

export default connect(mapStateToProps)(Dashboard);
