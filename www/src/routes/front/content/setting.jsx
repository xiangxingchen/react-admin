import React, { PropTypes } from 'react';
import {connect} from 'dva';
import style from '../header/header.less';
import { Row, Col, Carousel, Tabs, Card, Layout, Icon,Form,Input,Upload,Button,message } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;


class setting extends React.Component {
    state = {
        current: 'mail',
    }
    handleSubmit = (e) => {
        const {form,dispatch,user}= this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({type: 'user/updateUser', payload: {values,id:user._id}});
            }
        });
    }
    handleChange = (info) => {
        const {dispatch,user}= this.props;
        const status = info.file.status;
        if (status !== 'uploading') {
        }
        if (status === 'done') {
            dispatch({type: 'user/updateAvatar', payload: {values:{avatar:info.file.name},id:user._id}});
            // dispatch({type: 'user/queryUser'});

            // message.success(`${info.file.name} file uploaded successfully.`, 3);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`, 3);
        }
        this.setState({ fileList: info.fileList })
    }
    render() {
        const {form,post,user}= this.props;
        const {getFieldDecorator,getFieldValue} =form;
        const formItemLayout = {
            labelCol: { span: 2, },
            wrapperCol: { span: 10,offset:1 },
        };
        return (
            <Layout style={{ height: '100vh' }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className={style.setting}>
                    <Card title="信息设置">
                        <Row>
                            <Col span={2}>
                                <img src={`http://localhost:9000/avatar/${user.avatar}`} className={style.images}/>
                            </Col>
                            <Col offset={1} span={3}>
                                <Upload
                                    action="/api/file/upload"
                                    onChange={this.handleChange}
                                    accept="image/*"
                                >
                                    <Button>更新头像</Button>
                                </Upload>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                label="昵称"
                                {...formItemLayout}
                                className={style.form}
                            >
                                {getFieldDecorator('nickname', {
                                    initialValue: user.nickname === undefined ? '' : user.nickname,
                                    rules: [{required: true, message: 'Please input nickname!'}]
                                })(<Input type="text" placeholder="请输入昵称"/>)
                                }
                            </FormItem>
                            <FormItem
                                label="邮箱"
                                {...formItemLayout}
                                className={style.form}
                            >
                                {getFieldDecorator('email', {
                                    initialValue: user.email === undefined ? '' : user.email,
                                    rules: [{required: true, message: 'Please input email!'}]
                                })(<Input type="text" placeholder="请输入邮箱."/>)
                                }
                            </FormItem>

                            <FormItem label="" {...formItemLayout}>
                                <Button type="primary" htmlType="submit" size="large">保存</Button>
                            </FormItem></Form>
                            </Col>
                        </Row>
                    </Card>
                    </div>
                </Content>
            </Layout>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        post: state.posts.post,
        user: state.user.account,
        tagCat: state.posts.tagCat,
        tags: state.posts.tags,
        id:state.user.account._id,
    };
}



setting = Form.create({})(setting);
setting = connect(mapStateToProps)(setting);

export default setting;

{/*<FormItem*/}
    {/*label="手机"*/}
    {/*{...formItemLayout}*/}
    {/*className={style.form}*/}
{/*>*/}
    {/*{getFieldDecorator('phone', {*/}
        {/*initialValue: user.phone === undefined ? '' : user.phone,*/}
    {/*})(<Input type="text" placeholder="手机"/>)*/}
    {/*}*/}
{/*</FormItem>*/}
{/*<FormItem*/}
{/*label="公司职位"*/}
{/*{...formItemLayout}*/}
{/*className={style.form}*/}
{/*>*/}
{/*{getFieldDecorator('company', {*/}
    {/*initialValue: user.company === undefined ? '' : user.company,*/}
{/*})(<Input type="text" placeholder="职位"/>)*/}
{/*}*/}
{/*</FormItem>*/}
{/*<FormItem*/}
    {/*label="个人介绍"*/}
    {/*{...formItemLayout}*/}
    {/*className={style.formlast}*/}
{/*>*/}
    {/*{getFieldDecorator('desc', {*/}
        {/*initialValue: user.desc === undefined ? '' : user.desc,*/}
    {/*})(<Input type="text" placeholder="个人介绍"/>)*/}
    {/*}*/}
{/*</FormItem>*/}
