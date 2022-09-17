import React, { useCallback, useState } from 'react'
import styles from './index.module.scss'
import {ImageUploader, Input} from 'antd-mobile'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'


const UploadActivity = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([])
  const [success, setSuccess] = useState(false)
  const mockUpload = async (file: File) => {
    return {
      url: URL.createObjectURL(file),
    }
  }
  const handleUpload = useCallback(
    () => {
      setSuccess(true)
    },
    [],
  )
  
  if (!success)
    return (
      <div className={styles.upload}>
        <div className={styles.title}>
          <div>
            <span>风采标题</span>
            <span>（必填）</span>
          </div>
          <Input className={styles.titleInput} placeholder='请输入标题' />
        </div>
        <div className={styles.content}>
          <div>
            <span>风采标题</span>
            <span>（必填）</span>
          </div>
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={mockUpload}
            className={styles.uploadMedia}
          />
        </div>
        <div className={styles.button} onClick={handleUpload}>上传风采信息</div>
      </div>
    )
  return (
    <div className={styles.success}>
      <img src='' />
      <span>上传成功</span>
    </div>
  )
}

export default UploadActivity