import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Button, Icon,Table, Dropdown, Menu, Card} from 'antd';
import marked from 'marked';
import styles from './PostEditor.css';
import Content from './content';
import Title from './title';
import CommentList from '../comment/commentList';

class PostsDetail extends React.Component {

    componentWillMount() {
        const { dispatch, params } = this.props
        dispatch({
            type: 'editor/getArticle',
            payload: {id: params.id}
        });
    }

    render() {
        const {article,dispatch}= this.props;
        return (
            <div>
                <div className={styles.detail_wrapper}>
                    <Content article={article}/>
                    <CommentList dispatch ={dispatch}/>
                </div>
            </div>

        )
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
