import React, { Fragment, useState, useEffect } from 'react'
import {
    Upload,
    Icon,
    Button,
    Progress,
    Modal
} from 'antd'

import { FileInput, FileUpload } from 'react-md'

const { Dragger } = Upload

export default (props) => {
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const {
        fileInfo,
        fileList,
        uploadProgress = 0,
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

    return (
        <Fragment>
            {
                parseInt(uploadProgress) !== 0 &&
                <Progress percent={uploadProgress} status={uploadProgress !== 100 ? 'active' : 'success'} />
            }
            <div className="clearfix">
                <Upload {...draggerProps} >
                    {uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        </Fragment>
    )
}



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
