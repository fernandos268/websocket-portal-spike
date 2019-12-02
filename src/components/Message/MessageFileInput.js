import React from 'react'
import {
    Upload,
    Icon,
    Button,
    Progress
} from 'antd'

import { FileInput, FileUpload } from 'react-md'

const { Dragger } = Upload

export default (props) => {
    const {
        fileInfo,
        fileList,
        uploadProgress,
        handleFileChange,
        handleRemoveFile
    } = props

    const draggerProps = {
        name: 'file',
        multiple: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        // onChange: file => handleFileChange(file),
        beforeUpload: file => handleFileChange(file),
        onRemove: file => handleRemoveFile(file),
        fileList,
        accept: '.png, .jpg, .jpeg'
    }

    return (
        <div>
            <Progress percent={uploadProgress} status={uploadProgress !== 100 ? 'active' : 'success'} />
            <Dragger {...draggerProps}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to attach here</p>
            </Dragger>

        </div>
    )

}


{/* <FileUpload
onLoad={handleFileChange.bind(this)}
id='terms_upload'
label='Upload File'
flat
/> */}