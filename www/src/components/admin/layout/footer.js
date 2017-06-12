import React from 'react'
import { Icon } from 'antd';
import styles from './main.less'

const Footer = () => <div className={styles.footer}>
    <span>企业后台管理系统©2017 Created by</span>
    <a href="https://github.com/xiangxingchen"><Icon type="github"/><em>chen xiang</em></a>
</div>

export default Footer
