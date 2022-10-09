import { Button, Calendar, Input, Popup, TextArea, DatePicker, Toast } from 'antd-mobile'
import React, { useCallback, useState } from 'react'
import styles from './index.module.scss'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
import { SignupActivityProps } from '@/constant/interface'
import request from '@/apis/request'
import MediaUpload, { fileType } from '@/components/MediaUpload'
import dayjs from 'dayjs'
import QRCodePage from '@/pages/QRCodePage'

const SignupActivity = () => {
  const [data, setData] = useState<SignupActivityProps>({} as SignupActivityProps)
  const [visibleStart, setVisibleStart] = useState(false)
  const [visibleEnd, setVisibleEnd] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activityId, setActivityId] = useState('')

  const generateQrCode = useCallback(
    async () => {
      const {address, content, startTime, title, endTime} = data
      if (!title) return Toast.show('请填入活动标题')
      if (!content) return Toast.show('请填入活动内容')
      if (!address) return Toast.show('请填入活动地点')
      if (!startTime) return Toast.show('请填入活动开始时间')
      if (!endTime) return Toast.show('请填入活动结束时间')
      if (startTime.valueOf() > endTime.valueOf()) return Toast.show('开始时间不能晚于结束时间')
      const res = await request('post', '/nan_qiao/activity/info/create', {
        ...data,
        ...{
          startTime: data.startTime.valueOf(),
          endTime: data.endTime.valueOf(),
          imagePath: data.imagePath,
          numberLimit: data.numberLimit ? data.numberLimit : null
        }
      })
      if (res.success) {
        setActivityId(res.result.activityId)
        setSuccess(true)
      }
    },
    [data],
  )

  const changeData = useCallback((target: object) => {
    setData({...data, ...target})
  }, [data])
  if (success && activityId) {
    return <QRCodePage activityId={activityId} />
  }
  return (
    <div className={styles.signup}>
      <div className={styles.form}>
        <div className={styles.title}>
          <span>活动信息</span>
          <span>（*代表必填）</span>
        </div>
        <div className={styles.input}>
          <span className={styles.required}>活动标题</span>
          <Input value={data.title} onChange={val => changeData({title: val})} className={styles.inputItem} placeholder='请填写' />
        </div>
        <div className={styles.textarea}>
          <span>活动介绍</span>
          <TextArea value={data.desc} onChange={val => changeData({desc: val})} className={styles.textareaItem} placeholder='请填写' />
        </div>
        <div className={styles.textarea}>
          <span className={styles.required}>活动内容</span>
          <TextArea value={data.content} onChange={val => changeData({content: val})} className={styles.textareaItem} placeholder='请填写' />
        </div>
        <div className={styles.input}>
          <span>活动人数</span>
          <Input type='number' value={data.numberLimit} onChange={val => changeData({numberLimit: val})} className={styles.inputItem} placeholder='请填写（最多xx人）' />
        </div>
        <div className={styles.textarea}>
          <span className={styles.required}>活动地点</span>
          <TextArea value={data.address} onChange={val => changeData({address: val})} className={styles.textareaItem} placeholder='请填写' />
        </div>
        <div className={styles.input}>
          <span className={styles.required}>活动开始时间</span>
          <div onClick={() => setVisibleStart(true)} style={data.startTime ? {color: '#333333'} : {}} className={styles.time}>{data.startTime ? dayjs(data.startTime).format('YYYY-MM-DD HH:mm:ss') : '请选择时间'}</div>
        </div>
        <div className={styles.input}>
          <span className={styles.required}>活动结束时间</span>
          <div onClick={() => setVisibleEnd(true)} style={data.endTime ? {color: '#333333'} : {}} className={styles.time}>{data.endTime ? dayjs(data.endTime).format('YYYY-MM-DD HH:mm:ss') : '请选择时间'}</div>
        </div>
        <div className={styles.textarea}>
          <span>注意事项</span>
          <TextArea value={data.attention} onChange={val => changeData({attention: val})} className={styles.textareaItem} placeholder='请填写' />
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
        visible={visibleStart}
        onClose={() => {
          setVisibleStart(false)
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
      <DatePicker
        visible={visibleEnd}
        onClose={() => {
          setVisibleEnd(false)
        }}
        value={data.endTime}
        className={styles.datePicker}
        precision='minute'
        onConfirm={val => {
          changeData({
            endTime: val
          })
        }}
      />
      <div className={styles.button} onClick={generateQrCode}>生成二维码</div>
    </div>
  )
}

export default SignupActivity