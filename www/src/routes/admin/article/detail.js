import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Button, Icon,Table, Dropdown, Menu, Card} from 'antd';
import marked from 'marked';
import styles from './PostEditor.css';

class PostsDetail extends React.Component {

    componentWillMount() {
        const { dispatch, params } = this.props
        dispatch({
            type: 'editor/getArticle',
            payload: {id: params.id}
        });
    }

    render() {
        const {article}= this.props;
        return (
            <div className={styles.detail_wrapper}>
                <h1>{article.title}</h1>
                <div className={styles.detail_author}>
                    <span><Icon type="user"/>{article.author}</span>
                    <span><Icon type="clock-circle-o"/>{article.created}</span>
                    <span><Icon type="like-o"/>{article.like_count}</span>
                    <span><Icon type="message"/>{article.comment_count}</span>
                    <span><Icon type="eye-o"/>{article.visit_count}</span>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={{__html: marked(article.content)}}/>
                </div>
            </div>
        )
            ;
    }
}

PostsDetail.propTypes = {
    dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state, ownProps) {
    return {
        article: state.editor.article,
    };
}

export default connect(mapStateToProps)(PostsDetail);
