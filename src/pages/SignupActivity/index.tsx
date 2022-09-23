import { Button, Calendar, Input, Popup, TextArea, DatePicker } from 'antd-mobile'
import React, { useCallback, useState } from 'react'
import styles from './index.module.scss'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
import { SignupActivityProps } from '@/constant/interface'
import request from '@/apis/request'
import MediaUpload, { fileType } from '@/components/MediaUpload'
import dayjs from 'dayjs'

const SignupActivity = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([])
  const [data, setData] = useState<SignupActivityProps>({} as SignupActivityProps)
  const [visible, setVisible] = useState(false)
  
  const generateQrCode = useCallback(
    async () => {
      const res = await request('post', '/nan_qiao/activity/info/create')
    },
    [data],
  )

  const changeData = useCallback((target: object) => {
    setData({...data, ...target})
  }, [data])
  
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
          <Input onChange={val => changeData({address: val})} className={styles.inputItem} placeholder='请填写（最多xx人）' />
        </div>
        <div className={styles.textarea}>
          <span>活动地点</span>
          <TextArea onChange={val => changeData({address: val})} className={styles.textareaItem} placeholder='请填写' />
        </div>
        <div className={styles.input}>
          <span>活动时间</span>
          <div onClick={() => setVisible(true)} style={data.startTime ? {color: '#333333'} : {}} className={styles.time}>{data.startTime ? dayjs(data.startTime).format('YYYY-MM-DD HH:mm:ss') : '请选择时间'}</div>
        </div>
        <div className={styles.textarea}>
          <span>注意事项</span>
          <TextArea onChange={val => changeData({attention: val})} className={styles.textareaItem} placeholder='请填写' />
        </div>
        <div className={styles.banner}>
          <span>活动封面图</span>
          <MediaUpload accept={/^image\//} text="添加图片" onUpload={(files: fileType[]) => {
            changeData({imagePath: files[0]?.url})
          }} fileList={data.imagePath ? [{
            url: data.imagePath,
            type: 'image'
          }] : []} />
        </div>
      </div>
      <DatePicker
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        value={data.startTime}
        className={styles.datePicker}
        precision='minute'
        onConfirm={val => {
          changeData({
            startTime: val
          })
        }}
      />
      <div className={styles.button} onClick={generateQrCode}>生成二维码</div>
    </div>
  )
}

export default SignupActivity