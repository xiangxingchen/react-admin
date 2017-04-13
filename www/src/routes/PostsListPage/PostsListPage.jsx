import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import styles from './PostsListPage.css';
import {Button, Icon} from 'antd';
import PostsListBody from '../../components/PostsListBody/PostsListBody';

class PostsListPage extends React.Component {

    componentWillMount() {

    }
    render(){
        const {postsList,dispatch}= this.props;

        return (
            <div>
                <div className={styles.title}>
                    <Link to="/editor">
                        <Button type="primary"
                                size="large"
                                icon="addfile"
                                className={styles.addPost}>
                            Add Post
                        </Button>
                    </Link>
                    <h1><Icon type="file-text" className={styles.icon}/>Posts</h1>
                </div>
                <PostsListBody
                    postsList={postsList}
                    onDelete={({toDeletePostId}) => {
                        dispatch({
                            type: 'posts/deletePost',
                            payload: {
                                post_id: toDeletePostId,
                                paging: {limit: 10, page:1 }
                            }
                        });
                    }}
                    onChangeVisibility={(checked, {toSetVisiblePostId, toSetVisibleValue}) => {
                        dispatch({
                            type: 'posts/setPostVisibility',
                            payload: {
                                visible: toSetVisibleValue,
                                post_id: toSetVisiblePostId
                            }
                        });
                    }}
                    onSearch={keyword => {
                        dispatch({
                            type: 'posts/fetchPostsList',
                            payload: {
                                pageInfo: {limit: 5, page: 1},
                                keyword
                            }
                        });
                    }}
                    onTableChange={nextPaginationState => {
                    dispatch({
                        type: 'posts/fetchPostsList',
                        payload: {
                            pageInfo: {
                                limit: nextPaginationState.pageSize,
                                page: nextPaginationState.current
                            }
                        }
                    });
                }}/>
            </div>
        );
    }
}

PostsListPage.propTypes = {
    postsList: PropTypes.arrayOf(PropTypes.string).isRequired,
    dispatch: PropTypes.func.isRequired
};


function mapStateToProps(state, ownProps) {
    return {
        postsList: state.posts.postsList,
    };
}

export default connect(mapStateToProps)(PostsListPage);
