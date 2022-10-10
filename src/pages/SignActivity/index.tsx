import React, { RefObject, useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { LeftOutline, DownFill } from 'antd-mobile-icons'
import {
  Form,
  Input,
  Button,
  TextArea,
  Picker,
  DatePicker,
  Selector,
  Image,
  Toast
} from 'antd-mobile'
import type { DatePickerRef } from 'antd-mobile/es/components/date-picker'
import { stadiumInfoListAll, venuesOrder } from '@/apis/index'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import storage from '@/utils/storage'

interface timeRangeVosProps {
  startTime: string;
  endTime: string;
}
interface venuesProp {
  code: string;
  name: string;
  note: string;
  location: string;
  seatingCapacity?: number;
  showPhoto: string;
  detailPhotos: string[];
  timeRangeVos: timeRangeVosProps[];
  status: number;
}

interface colProps {
  label: string;
  value: string;
}

const Venues: React.FC<any> = () => {
  const [list, setList] = useState<colProps[]>([])
  const [curVenue, setCurVenue] = useState<venuesProp>({
    code: '',
    name: '',
    note: '',
    status: -1,
    detailPhotos: [],
    showPhoto: '',
    location: '',
    timeRangeVos: []
  })
  const [originList, setOriginList] = useState<venuesProp[]>([])

  const getVenuesList = async () => {
    const { result: { list } } = await stadiumInfoListAll()
    if (list && list.length > 0) {
      setOriginList(list)
      setCurVenue(list[0])
      const rList = list.map((i: any) => ({
        label: i.name,
        value: i.code,
      }))
      setList(rList)
      setValue([rList[0].value])
    }
  }

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const [value, setValue] = useState<any[]>([])

  const onConfirm = (val: any[]) => {
    setValue(val)
    const curIndex = originList.findIndex((i: any) => i.code === val[0])
    setCurVenue(originList[curIndex])
  }

  const onFinish = async (values: any) => {
    const params = {
      ...values,
      timeType: values.timeType[0],
      date: dayjs(values.date).format('YYYY-MM-DD'),
      stadiumCode: curVenue.code,
      orderPersonId: storage.get('userInfo').id
    }
    await venuesOrder(params)
    Toast.show('预约成功')
  }

  useEffect(() => {
    getVenuesList()
  }, [])

  const maxDate = new Date(dayjs().add(1, 'M').format('YYYY-MM-DD'))
  const minDate = new Date(dayjs().add(5, 'd').format('YYYY-MM-DD'))

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={() => {
        goBack()
      }}>
        <LeftOutline fontSize={16} />
        <span className={styles.title}>活动报名</span>
      </div>
      <div className={styles.info}>
        <Image
          className={styles.venuePic}
          src={curVenue.showPhoto}
        />
        <div className={styles.infoContent}>
          <p className={styles.infoWord}>{curVenue.note}</p>
        </div>
        <h2 className={styles.subTitle}>活动时间</h2>
        <div className={styles.infoContent}>
          {
            curVenue.timeRangeVos.map((i, index) => (
              <div key={index} className={styles.infoWord}>
                {i.startTime} - {i.endTime}
              </div>
            ))
          }
        </div>
        <h2 className={styles.subTitle}>活动地点</h2>
        <div className={styles.infoWord}>{curVenue.location}</div>
        <h2 className={styles.subTitle}>活动内容</h2>
        <div className={styles.infoWord}>{curVenue.location}</div>
      </div>
      <div className={styles.formBox}>
        <Form
          onFinish={onFinish}
          layout="horizontal"
          footer={
            <Button block type="submit" color="primary" size="large">
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
            <Input onChange={console.log} placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号"
            rules={[{ required: true, message: '手机号不能为空' }]}
          >
            <Input onChange={console.log} placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
          >
            <Input onChange={console.log} placeholder="请输入邮箱" />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Venues
