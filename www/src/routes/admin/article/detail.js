import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import { Row, Col, Icon } from 'antd';
import moment from 'moment';
import marked from '../../../utils/marked';
import styles from './article.less';
import CommentList from '../comment/commentList';

class PostsDetail extends React.Component {

    componentWillMount() {
        const { dispatch, params } = this.props;
        this.getData({dispatch,id:params.id});
    }
    componentWillReceiveProps(nextProps) {
        const { dispatch, params } = nextProps;
        if(nextProps.params.id !== this.props.params.id) {
            this.getData({dispatch,id:params.id});
        }
    }
    getData({dispatch,id}){
        dispatch({
            type: 'posts/getPost',
            payload: {id}
        });
        dispatch({
            type: 'posts/getPrenext',
            payload: {id}
        });
    }

    render() {
        const {article,dispatch,params,preNext}= this.props;
        return (
            <div>
                <div className={styles.detail_wrapper}>
                    <Row>
                        <Col span={2}>
                            <img  src={`http://localhost:9000/avatar/7.jpg`} alt="头像" className={styles.title_author_pic}/>
                        </Col>
                        <Col span={20}>
                            <div className={styles.title_author}>
                                <a href={`/f/user/${article.author_id && article.author_id._id}`}>{article.author_id && article.author_id.nickname}</a>
                                <p>{moment(styles.publish_time).format("YYYY-MM-DD")}</p>
                            </div>
                        </Col>
                    </Row>
                    <h1 className={styles.title_text}>{article.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: marked(article.content || '# hello!')}} className={styles.content}></div>
                    <Row className={styles.prevNext}>
                        <Col span={10}>
                            {
                                preNext.prev.title ? <Link to={`/f/post/${preNext.prev._id}`}>
                                    <div className={styles.prev}>
                                        <Icon type="arrow-left" />
                                        <span>上篇：{preNext.prev.title}</span>
                                    </div>
                                </Link> :''
                            }
                        </Col>
                        <Col span={10} offset={4}>
                            {
                                preNext.next.title ? <Link to={`/f/post/${preNext.next._id}`}>
                                    <div className={styles.next}>
                                        <span>下篇：{preNext.next.title}</span>
                                        <Icon type="arrow-right" />
                                    </div>
                                </Link> : ''
                            }
                        </Col>
                    </Row>
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
        preNext: state.posts.preNext,
    };
}

export default connect(mapStateToProps)(PostsDetail);
