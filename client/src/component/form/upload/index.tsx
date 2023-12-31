import React from 'react'
import type { UploadFile, UploadProps } from 'antd'
import { Upload } from 'antd'
import { UploadChangeParam } from 'antd/es/upload'

interface IUploadInput extends UploadProps {
  onChange?: (value: UploadChangeParam<UploadFile>) => void
}

// const uploadInputProps: IUploadInput = {
//   name: 'file',
//   action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
//   headers: {
//     authorization: 'authorization-text'
//   },
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList)
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`)
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`)
//     }
//   }
// }

const UploadInput = (props: IUploadInput): JSX.Element => (
  <Upload onChange={props.onChange}>
    <p style={{ textDecoration: 'underline' }}>Upload Photo</p>
  </Upload>
)

export default UploadInput
