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
        const {posts,user} = this.props;
        const {tagCat} = posts;
        const mainMenu = this.getMenuItems(tagCat.slice(0,3));
        const otherMenu = this.getMenuItems(tagCat.slice(3,tagCat.length));
        const otherMenus = (<Menu onClick={this.onClick}>{otherMenu}</Menu>);
        const content = (
                <ul className={style.user}>
                    <a href={`/user/${user.account._id}`}><li><Icon type="user" /> 我的主页</li></a>
                    <a href={`/tags`}><li><Icon type="tags-o" /> 标签管理</li></a>
                    <a href={`/user/setting`}><li><Icon type="setting" /> 信息设置</li></a>
                    <a href={`/about`}><li><Icon type="team" /> 关于我们</li></a>
                    <a href={`/user`}><li><Icon type="logout" /> 安全退出</li></a>
                </ul>
        );
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
                {user.account._id ?<Item key="blog" className={style.right}>
                    <Button >写文章</Button>
                </Item> : ''
                }
                {user.account._id ?<Item key="user" className={style.right} >
                    <Popover placement="bottomRight" content={content} trigger="hover">
                        <img src={`http://localhost:9000/avatar/7.jpg`} className={style.avatar} />
                    </Popover>
                </Item> : <Item key="login" className={style.right} >
                        <Icon type="appstore" />登陆
                    </Item>
                }
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