import React from 'react'
import {
    Upload,
    Icon,
    Button
} from 'antd'

import { FileInput, FileUpload } from 'react-md'

const { Dragger } = Upload

export default (props) => {
    const {
        fileInfo,
        fileList,
        handleFileChange
    } = props

    return (
        <div>
            <FileUpload
                onLoad={handleFileChange.bind(this)}
                id='terms_upload'
                label='Upload File'
                flat
            />
        </div>
    )

}
