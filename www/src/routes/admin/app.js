import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Login from './login/Login'
import Header from '../../components/admin/layout/header'
import Bread from '../../components/admin/layout/bread'
import Footer from '../../components/admin/layout/footer'
import Sider from '../../components/admin/layout/sider'
import styles from '../../components/admin/layout/main.less'
import { Spin } from 'antd'
import { classnames } from '../../utils'
import '../../components/admin/layout/common.less'

function App({children, location, dispatch, app, user}) {
    const {login, loading, loginButtonLoading, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys} = app
    const loginProps = {
        loading,
        loginButtonLoading,
        onOk (data) {
            dispatch({type: 'user/auth', payload: data})
        }
    }

    const headerProps = {
        user,
        siderFold,
        location,
        isNavbar,
        menuPopoverVisible,
        navOpenKeys,
        switchMenuPopover () {
            dispatch({type: 'app/switchMenuPopver'})
        },
        logout () {
            dispatch({type: 'user/logout'})
        },
        switchSider () {
            dispatch({type: 'app/switchSider'})
        },
        changeOpenKeys (openKeys) {
            localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
            dispatch({type: 'app/handleNavOpenKeys', payload: {navOpenKeys: openKeys}})
        }
    }

    const siderProps = {
        siderFold,
        darkTheme,
        location,
        navOpenKeys,
        changeTheme () {
            dispatch({type: 'app/changeTheme'})
        },
        changeOpenKeys (openKeys) {
            localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
            dispatch({type: 'app/handleNavOpenKeys', payload: {navOpenKeys: openKeys}})
        }
    }

    return (
        <div
            className={classnames(styles.layout, {[styles.fold]: isNavbar ? false : siderFold}, {[styles.withnavbar]: isNavbar})}>
            {!isNavbar ?
                <aside className={classnames(styles.sider, {[styles.light]: !darkTheme})}>
                    <Sider {...siderProps} />
                </aside> : ''
            }
            <div className={styles.main}>
                <Header {...headerProps} />
                <Bread location={location}/>
                    <div className={styles.container}>
                        <div className={styles.content}>{children}</div>
                    </div>
                <Footer />
            </div>
        </div>
    )
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    isLogin: PropTypes.bool.isRequired,
    app: PropTypes.object
}

function mapStateToProps(state, ownProps) {
    return {
        app: state.app,
        location: ownProps.location,
        user: state.user,
        isLogin: state.user.isLogin,
        loading: state.user.loading,
    };
}

export default connect(mapStateToProps)(App);
