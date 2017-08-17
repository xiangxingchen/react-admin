import React, { PropTypes } from 'react'
import { Menu, Icon, Input, Dropdown, Button,Popover } from 'antd';
import {connect} from 'dva';
import { Link } from 'dva/router'
import style from './menu.less'
const Search = Input.Search;
const Item = Menu.Item;

class MenuHeader extends React.Component {
    state = {
        current: 'mail',
    };
    componentWillMount() {
        this.props.dispatch({type: 'posts/getTagCatList'});
    };
    handleClick = (e) => {
        // console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    onClick = (e) => {
        // console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    onSearch = (v) => {
        this.props.dispatch({
            type: 'posts/searchArticleBack',
            payload: {pageInfo: {limit: 10, page: 1},search:v}
        });
    };
    getMenuItems = (tagCats) => {
        const items=[];
        tagCats.map(cat=>{
            items.push(<Item key={cat.name}>
                <Link to={cat.name}>
                <Icon type={cat.name} />{cat.desc}
                </Link>
            </Item>)
        });
        return items;
    };
    logout = () => {
        this.props.dispatch({type: 'user/logout'})
    }

    render() {
        const {posts,user} = this.props;
        const {tagCat} = posts;
        const mainMenu = this.getMenuItems(tagCat.slice(0,3));
        const otherMenu = this.getMenuItems(tagCat.slice(3,tagCat.length));
        const otherMenus = (<Menu onClick={this.onClick}>{otherMenu}</Menu>);
        const content = (
                <ul className={style.user}>
                    <a href={`/f/user/${user.account._id}`}><li><Icon type="user" /> 我的主页</li></a>
                    <a href={`/f/user/setting`}><li><Icon type="setting" /> 信息设置</li></a>
                    <a href={`/f/about`}><li><Icon type="team" /> 关于我们</li></a>
                    <a onClick={this.logout}><li><Icon type="logout" /> 安全退出</li></a>
                </ul>
        );
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                className={style.horizontal}
            >
                <Item key="index">
                    <Link to={'/f/home'}><Icon type="home" />首页</Link>
                </Item>
                <Item key="archives">
                    <Link to={'/f/archives'}><Icon type="folder" />归档</Link>
                </Item>
                <Item key="category">
                    <Link to={'/f/category'}><Icon type="tag-o" />分类</Link>
                </Item>
                <Item key="project">
                    <Link to={'/f/project'}><Icon type="book" />项目</Link>
                </Item>
                <Item key="about">
                    <Link to={'/f/about'}><Icon type="contacts" />关于</Link>
                </Item>
            </Menu>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts,
        user: state.user,
    };
}

export default connect(mapStateToProps)(MenuHeader);