import React, {PropTypes} from 'react';
import {Link} from 'dva/router';
import marked from 'marked';
import styles from './PostEditor.css';
import {Button, Icon,Table, Dropdown, Menu, Card} from 'antd';

class Content extends React.Component {

    render() {
        const {article}= this.props;

        return (
            <span>
                <div>
                    <div dangerouslySetInnerHTML={{__html: marked(article.content)}}></div>
                </div>
            </span>
        )
    }
}


export default Content;
