import { ImageUploader, Input, TextArea } from 'antd-mobile'
import React, { useState } from 'react'
import styles from './index.module.scss'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'

const SignupActivity = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([])
  const mockUpload = async (file: File) => {
    return {
      url: URL.createObjectURL(file),
    }
  }
  return (
    <div className={styles.signup}>
      <div className={styles.form}>
        <div className={styles.title}>
          <span>活动信息</span>
          <span>（必填）</span>
        </div>
        <div className={styles.input}>
          <span>活动标题</span>
          <Input className={styles.inputItem} placeholder='请填写' />
        </div>
        <div className={styles.textarea}>
          <span>活动介绍</span>
          <TextArea className={styles.textareaItem} placeholder='请填写' />
        </div>
        <div className={styles.textarea}>
          <span>活动内容</span>
          <TextArea className={styles.textareaItem} placeholder='请填写' />
        </div>
        <div className={styles.input}>
          <span>活动人数</span>
          <Input className={styles.inputItem} placeholder='请填写（最多xx人）' />
        </div>
        <div className={styles.textarea}>
          <span>活动地点</span>
          <TextArea className={styles.textareaItem} placeholder='请填写' />
        </div>
        <div className={styles.input}>
          <span>活动人数</span>
          <Input className={styles.inputItem} placeholder='请填写（最多xx人）' />
        </div>
        <div className={styles.textarea}>
          <span>注意事项</span>
          <TextArea className={styles.textareaItem} placeholder='请填写' />
        </div>
        <div className={styles.banner}>
          <span>活动封面图</span>
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={mockUpload}
            className={styles.bannerUpload}
          />
        </div>
      </div>
      <div className={styles.button}>生成二维码</div>
    </div>
  )
}

export default SignupActivity