import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Button, Icon,Table, Dropdown, Menu, Card} from 'antd';
import marked from 'marked';
import styles from './PostEditor.css';
import Content from './content';
import Title from './title';
import CommentList from '../comment/commentList';
import Editor from '../../../components/Editor/Editor';

class PostsDetail extends React.Component {

    componentWillMount() {
        const { dispatch, params } = this.props
        dispatch({
            type: 'editor/getArticle',
            payload: {id: params.id}
        });
    }

    render() {
        const {article,dispatch,params}= this.props;
        console.log(article);
        const options = {
            tabSize: 4,
            toolbar: false,
            toolbarTips: false,
            readOnly: true,
        }
        return (
            <div>
                <div className={styles.detail_wrapper}>
                    <h1>{article.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: marked(article.content || '# hello!')}}></div>
                    <CommentList dispatch ={dispatch} id={params.id}/>
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
//<Content article={article}/>
