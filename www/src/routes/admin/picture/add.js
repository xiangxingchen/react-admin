import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Spin, Icon, Modal, Upload, message } from 'antd';
import Editor from '../../../components/Editor/Editor';
const Dragger = Upload.Dragger;
class Add extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        textValue:'#hello'
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })
    handleChange1 = (v) => {
    }


    render() {
        const props = {
            name: 'file',
            multiple: true,
            showUploadList: true,
            fileList:this.state.fileList,
            listType:"picture-card",
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`, 3);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`, 3);
                }
                this.setState({ fileList: info.fileList })
            },
            onPreview(){
                this.handlePreview
            }
    };
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/api/file/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    accept="image/*"
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

Add.propTypes = {
    users: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
    return {
        users: state.users,
    };
}

export default connect(mapStateToProps)(Add);
