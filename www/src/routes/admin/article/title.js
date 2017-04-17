import React, {PropTypes} from 'react';
import {Link} from 'dva/router';
import marked from 'marked';
import styles from './PostEditor.css';
import {Button, Icon,Table, Dropdown, Menu, Card} from 'antd';

class Title extends React.Component {

    render() {
        const {article}= this.props;
        return (
            <div>
                <h1>{article.title}</h1>
                <div className={styles.detail_author}>
                    <span><Icon type="user"/>{article.author}</span>
                    <span><Icon type="clock-circle-o"/>{article.created}</span>
                    <span><Icon type="like-o"/>{article.like_count}</span>
                    <span><Icon type="message"/>{article.comment_count}</span>
                    <span><Icon type="eye-o"/>{article.visit_count}</span>
                </div>
            </div>
        )
    }
}


export default Title;
