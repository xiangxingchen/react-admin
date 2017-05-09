import React, { PropTypes } from 'react'
import { Menu, Icon, Input } from 'antd';
import style from './menu.less'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;
const Item = Menu.Item;

class MenuHeader extends React.Component {
    state = {
        current: 'mail',
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                className={style.horizontal}
            >
                <Item key="mail">
                    <Icon type="mail" />首页
                </Item>
                <Item key="app">
                    <Icon type="appstore" />新闻
                </Item>
                <Item key="alipay">
                    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">军事</a>
                </Item>
                <Item key="ent">
                    <Icon type="appstore" />娱乐
                </Item>
                <Item key="sport">
                    <Icon type="appstore" />体育
                </Item >
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

export default MenuHeader;
