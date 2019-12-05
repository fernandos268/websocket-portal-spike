import React, { Fragment, useState, useEffect } from 'react'
import {
    Upload,
    Icon,
    Button,
    Progress,
    Modal
} from 'antd'

import {
    Card,
    Image,
    Segment,
    Button as SUIButton,
    Dimmer,
    Header
} from 'semantic-ui-react'

const { Dragger } = Upload

export default (props) => {
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')

    const [isDimmed, setIsDimmed] = useState({
        target: '',
        dimmed: false
    })

    const {
        fileInfo,
        fileList,
        uploadProgress,
        handleFileChange,
        handleRemoveFile
    } = props

    const handlePreview = async file => {
        console.log("TCL: handlePreview", file)
        console.log('BASE64', getBase64(file))
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
    };


    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    const draggerProps = {
        fileList,
        processData: false,
        processData: false,
        listType: "picture-card",
        showUploadList: false,
        accept: '.png, .jpg, .jpeg',
        customRequest: () => false,
        onRemove: file => handleRemoveFile(file),
        onPreview: file => handlePreview(file),
        beforeUpload: (file) => handleFileChange(file),
        onDownload: () => console.log('ON DOWNLOAD')
    }

    const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
    )

    const fileListMapper = (list = []) => {
        return list.map(file => {
            const progress = uploadProgress.find(progress => progress.file_uid === file.uid) || {}
            return (
                <Card>
                    <Dimmer.Dimmable
                        as={Image}
                        dimmed={file.uid === isDimmed.target ? isDimmed.dimmed : false}
                        dimmer={{
                            active: file.uid === isDimmed.target ? isDimmed.dimmed : false,
                            content: (
                                <div>
                                    <Header as='h4' inverted>
                                        {file.name}
                                    </Header>
                                    <SUIButton circular color='red' icon='trash alternate' onClick={() => handleRemoveFile(file)} />
                                </div>
                            )
                        }}
                        onMouseEnter={() => setIsDimmed({
                            target: file.uid,
                            dimmed: true
                        })}
                        onMouseLeave={() => setIsDimmed({
                            target: file.uid,
                            dimmed: false
                        })}
                        size='small'
                        src={file.url}
                    />
                    {


                        (file.uid === progress.file_uid && parseInt(progress.percent) > 0) &&
                        <Segment basic>
                            <Progress
                                strokeColor={{
                                    from: '#108ee9',
                                    to: '#87d068',
                                }}
                                percent={file.uid === progress.file_uid ? parseInt(progress.percent) : 0}
                                status={file.uid === progress.file_uid ? parseInt(progress.percent) !== 100 ? 'active' : 'success' : ''}
                            />
                        </Segment>
                    }

                </Card>
            )
        })
    }

    // console.log('MessageFileInput --> PROGRESS LIST', uploadProgress)

    return (
        <Fragment>
            <Dragger {...draggerProps} listType="picture-card">
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to attach here</p>
            </Dragger>
            {
                fileList.length !== 0 &&
                <Segment basic>
                    <Card.Group itemsPerRow={4}>
                        {fileListMapper(fileList)}
                    </Card.Group>
                </Segment>
            }
        </Fragment>
    )
}

// {
//     parseInt(uploadProgress) !== 0 &&{
//     parseInt(uploadProgress) !== 0 &&
//     <Progress percent={uploadProgress} status={uploadProgress !== 100 ? 'active' : 'success'} />
// }
// <div className="clearfix">
//     <Upload {...draggerProps} >
//         {uploadButton}
//         <Progress
//             strokeColor={{
//                 '0%': '#108ee9',
//                 '100%': '#87d068',
//             }}
//             percent={99.9}
//             status='active'
//             showInfo={false}
//         />
//     </Upload>
//     <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
//         <img alt="example" style={{ width: '100%' }} src={previewImage} />
//     </Modal>
// </div>

//     <Upload {...draggerProps} >
//         {uploadButton}
//         <Progress
//             strokeColor={{
//                 '0%': '#108ee9',
//                 '100%': '#87d068',
//             }}
//             percent={99.9}
//             status='active'
//             showInfo={false}
//         />
//     </Upload>
//     <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
//         <img alt="example" style={{ width: '100%' }} src={previewImage} />
//     </Modal>
// </div>



// return (
//     <div>
//         {
//             parseInt(uploadProgress) !== 0 &&
//             <Progress percent={uploadProgress} status={uploadProgress !== 100 ? 'active' : 'success'} />
//         }
//         <Dragger {...draggerProps} listType="picture-card">
//             <p className="ant-upload-drag-icon">
//                 <Icon type="inbox" />
//             </p>
//             <p className="ant-upload-text">Click or drag file to attach here</p>
//         </Dragger>

//     </div>
// )
