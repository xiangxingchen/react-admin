import React, { PropTypes } from 'react'
import { Menu, Icon, Input, Dropdown, Button } from 'antd';
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
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    onClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
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
    render() {
        const {posts} = this.props;
        const {tagCat} = posts;
        const mainMenu = this.getMenuItems(tagCat.slice(0,3));
        const otherMenu = this.getMenuItems(tagCat.slice(3,tagCat.length));
        const otherMenus = (<Menu onClick={this.onClick}>{otherMenu}</Menu>);
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                className={style.horizontal}
            >
                <Item key="mail">
                    <Link to={'/'}><Icon type={'mail'}/>首页</Link>
                </Item>
                {mainMenu}
                <Item key="mails">
                    <Dropdown overlay={otherMenus}>
                        <a className="ant-dropdown-link" href="#">
                            其他<Icon type="down" />
                        </a>
                    </Dropdown>
                </Item>
                <Item className={style.search}>
                    <Search
                        placeholder="搜索"
                        style={{ width: 200 }}
                        onSearch={value => console.log(value)}
                    />
                </Item>
                <Item key="login" className={style.right} >
                    <Icon type="appstore" />登陆
                </Item >
                <Item key="register" className={style.right} >
                    <Icon type="appstore" />注册
                </Item >
            </Menu>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        posts: state.posts,
    };
}

export default connect(mapStateToProps)(MenuHeader);