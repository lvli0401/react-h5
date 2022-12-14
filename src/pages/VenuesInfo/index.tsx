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
    Toast.show('????????????')
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
        <span className={styles.title}>????????????</span>
      </div>
      <div className={styles.info}>
        <Image
          className={styles.venuePic}
          src={curVenue.showPhoto}
        />
        <h2 className={styles.subTitle}>??????????????????</h2>
        <div className={styles.infoContent}>
          <p className={styles.infoWord}>{curVenue.note}</p>
        </div>
        <h2 className={styles.subTitle}>????????????</h2>
        <div className={styles.infoContent}>
          {
            curVenue.timeRangeVos.map((i, index) => (
              <div key={index} className={styles.infoWord}>
                {i.startTime} - {i.endTime}
              </div>
            ))
          }
        </div>
        <h2 className={styles.subTitle}>????????????</h2>
        <div className={styles.infoWord}>{curVenue.location}</div>
      </div>
      <div className={styles.changeVenues}>
        <Picker
          columns={[list]}
          value={value}
          onConfirm={(val) => onConfirm(val)}
        >
          {(items, { open }) => {
            return (
              <div className={styles.changeInner}>
                <Image
                  className={styles.venueIcon}
                  src="https://cdn.leoao.com/%20litta/mini/index/card.png"
                />

                <div className={styles.venueName}>
                  {curVenue.name}
                </div>
                <div className={styles.bar} onClick={open}>
                  ??????
                  <DownFill />
                </div>
              </div>
            )
          }}
        </Picker>
      </div>
      <div className={styles.formBox}>
        <Form
          onFinish={onFinish}
          layout="horizontal"
          footer={
            <Button block type="submit" color="primary" size="large">
              ????????????
            </Button>
          }
        >
          <Form.Header>????????????</Form.Header>
          <Form.Item
            name="orderPersonName"
            label="??????"
            rules={[{ required: true, message: '??????????????????' }]}
          >
            <Input onChange={console.log} placeholder="???????????????" />
          </Form.Item>

          <Form.Item
            name="orderPhone"
            label="?????????"
            rules={[{ required: true, message: '?????????????????????' }]}
          >
            <Input onChange={console.log} placeholder="??????????????????" />
          </Form.Item>

          <Form.Item
            name="teamName"
            label="?????????"
            rules={[{ required: true, message: '?????????????????????' }]}
          >
            <Input onChange={console.log} placeholder="??????????????????" />
          </Form.Item>
          <Form.Item
            name="applyReason"
            label="????????????"
            rules={[{ required: true, message: '????????????????????????' }]}
          >
            <TextArea
              placeholder="?????????????????????"
              maxLength={100}
              rows={2}
              showCount
            />
          </Form.Item>
          <Form.Item
            name="orderPeopleCnt"
            label="????????????"
            rules={[{ required: true, message: '????????????????????????' }]}
          >
            <Input onChange={console.log} placeholder="?????????????????????" />
          </Form.Item>
          <Form.Item
            name="date"
            label="????????????"
            trigger="onConfirm"
            onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
              datePickerRef.current?.open()
            }}
            rules={[{ required: true, message: '????????????????????????' }]}
          >
            <DatePicker
              min={minDate}
              max={maxDate}
            >
              {(value) =>
                value ? dayjs(value).format('YYYY-MM-DD') : '???????????????'
              }
            </DatePicker>
          </Form.Item>
          <Form.Item name="timeType" label="????????????">
            <Selector
              style={{
                '--padding': '2px',
              }}
              columns={3}
              options={[
                { label: '??????', value: '0' },
                { label: '??????', value: '1' },
                { label: '??????', value: '2' },
              ]}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Venues
