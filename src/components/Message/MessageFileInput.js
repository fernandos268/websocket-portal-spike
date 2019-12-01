import React from 'react'
import {
    Upload,
    Icon
} from 'antd'

const { Dragger } = Upload

export default (props) => {
    const {
        fileInfo,
        handleFileChange
    } = props

    const fileInputProps = {
        name: 'file',
        multiple: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange: info => handleFileChange(info),
    }

    return (
        <Dragger {...fileInputProps}>
            <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
    )
}
