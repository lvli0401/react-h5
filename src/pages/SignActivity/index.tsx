import React, { useState, useEffect, useCallback } from 'react'
import dayjs from 'dayjs'
import { LeftOutline } from 'antd-mobile-icons'
import {
  Form,
  Input,
  Button,
  Image,
  Toast
} from 'antd-mobile'
import { venuesOrder } from '@/apis/index'
import styles from './index.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import storage from '@/utils/storage'
import request from '@/apis/request'
import { activityProp } from './interface'

const Venues: React.FC<any> = () => {
  const {search} = useLocation()
  const searchParams = new URLSearchParams(search)
  const activity_id = searchParams.get('activity_id')
  const [activityInfo, setActivityInfo] = useState<activityProp>({
    activityId: '',
    address: '',
    content: '',
    endTime: '',
    startTime: '',
    title: '',
  })


  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }


  const onFinish = async (values: any) => {
    const params = {
      ...values,
      activityId: activity_id,
      // openId: storage.get('userInfo').id
    }
    await request('post', '/nan_qiao/activity/apply/create', params)
    Toast.show('报名成功')
  }

  const getActivityInfo: any = useCallback(async () => {
    if (activity_id) {
      const res =  await request('post', '/nan_qiao/activity/info/query/detail', {activityId: activity_id})
      setActivityInfo(res.result)
    }
  }, [activity_id])

  useEffect(() => {
    getActivityInfo()
  }, [activity_id, getActivityInfo])

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={() => {
        navigate('/home')
      }}>
        <LeftOutline fontSize={16} />
        <span className={styles.title}>回到首页</span>
      </div>
      <div className={styles.info}>
        {activityInfo.imagePath && activityInfo.imagePath.length && <Image
          className={styles.venuePic}
          src={activityInfo.imagePath[0]}
        />}
        {activityInfo.desc && <div className={styles.infoContent}>
          <p className={styles.infoWord}>{activityInfo.desc}</p>
        </div>}
        <h2 className={styles.subTitle}>活动时间</h2>
        <div className={styles.infoContent}>
          {dayjs(activityInfo.startTime).format('YYYY-MM-DD HH:mm:ss')}
          <span>至</span>
          {dayjs(activityInfo.endTime).format('YYYY-MM-DD HH:mm:ss')}
        </div>
        <h2 className={styles.subTitle}>活动地点</h2>
        <div className={styles.infoWord}>{activityInfo.address}</div>
        <h2 className={styles.subTitle}>活动内容</h2>
        <div className={styles.infoWord}>{activityInfo.content}</div>
      </div>
      <div className={styles.formBox}>
        <Form
          onFinish={onFinish}
          layout="horizontal"
          footer={
            <Button className={styles.button} block type="submit" color="primary" size="large">
              报名
            </Button>
          }
        >
          <Form.Header>报名信息</Form.Header>
          <Form.Item
            name="userName"
            label="姓名"
            rules={[{ required: true, message: '姓名不能为空' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号"
            rules={[{ required: true, message: '手机号不能为空' }]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Venues
