import React, {PropTypes} from 'react';
import {connect} from 'dva';
import marked from '../../../utils/marked';
import styles from './article.less';
import CommentList from '../comment/commentList';

class PostsDetail extends React.Component {

    componentWillMount() {
        const { dispatch, params } = this.props
        dispatch({
            type: 'posts/getPost',
            payload: {id: params.id}
        });
    }

    render() {
        const {article,dispatch,params}= this.props;
        return (
            <div>
                <div className={styles.detail_wrapper}>
                    <h1>{article.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: marked(article.content || '# hello!')}}></div>
                    <CommentList dispatch ={dispatch} id={params.id} article={article}/>
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
        article: state.posts.article,
    };
}

export default connect(mapStateToProps)(PostsDetail);
