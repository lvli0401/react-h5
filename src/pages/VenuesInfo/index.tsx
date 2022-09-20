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
} from 'antd-mobile'
import type { DatePickerRef } from 'antd-mobile/es/components/date-picker'
import { stadiumInfoListAll } from '@/apis/index';
import styles from './index.module.scss'

const basicColumns = [
  [
    { label: '周一', value: 'Mon' },
    { label: '周二', value: 'Tues' },
    { label: '周三', value: 'Wed' },
    { label: '周四', value: 'Thur' },
    { label: '周五', value: 'Fri' },
  ],
]

interface venuesProp {
  code: string;
  name: string;
  note: string;
  location: string;
  seatingCapacity?: number;
  showPhoto: string;
  detailPhotos: string[];
  timeRangeVos: object[];
  status: number;
}

const Venues: React.FC<any> = () => {
  // const [value, setValue] = useState<String | null>(null);
  const [list, setList] = useState<venuesProp[]>([]);
  const [curVenue, setCurVenue] = useState<venuesProp>({
    code: '',
    name: '',
    note: '',
    status: -1,
    "detailPhotos": [],
    "showPhoto": "",
    "location": "",
    "timeRangeVos": [
      {
        "startTime": "08:00",
        "endTime": "20:00",
      }
    ]
  });

  const getVenuesList = async () => {
    await stadiumInfoListAll();
    const vlist: venuesProp[] = [
      {
        code: '3-101',
        name: '舞蹈室',
        note: '舞蹈室简介',
        status: 1,
        "detailPhotos": [
          "http://dummyimage.com/400x400",
          "http://dummyimage.com/400x400"
        ],
        "showPhoto": "http://dummyimage.com/400x400",
        "location": "南津路三号",
        "timeRangeVos": [
          {
            "endTime": "05:56",
            "startTime": "09:45"
          }
        ]
      }
    ];
    setList(vlist);
  }

  // const changeVenue = (val:) => {
  //   console.log(val, 'val');

  // }

  useEffect(() => {
    getVenuesList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <LeftOutline fontSize={16} />
        <span className={styles.title}>场馆预约审核列表</span>
      </div>
      <div className={styles.info}>
        <Image
          className={styles.venuePic}
          src={curVenue.showPhoto}
        />
        <h2 className={styles.subTitle}>场馆简介信息</h2>
        <div className={styles.infoContent}>
          <p className={styles.infoWord}>{curVenue.note}</p>
        </div>
        <h2 className={styles.subTitle}>开放时间</h2>
        <div className={styles.infoContent}>
          <div className={styles.infoWord}>上午 08:00 - 12:00</div>
          <div className={styles.infoWord}>下午 14:00 - 20:00</div>
        </div>
        <h2 className={styles.subTitle}>地址信息</h2>
        <div className={styles.infoWord}>{curVenue.location}</div>
      </div>
      <div className={styles.changeVenues}>
        <Picker
          columns={basicColumns}
        // value={value}
        // onConfirm={(val) => changeVenue(val)}
        >
          {(items, { open }) => {
            return (
              <div className={styles.changeInner}>
                <Image
                  className={styles.venueIcon}
                  src="https://cdn.leoao.com/%20litta/mini/index/card.png"
                />

                <div className={styles.venueName}>
                  {items.every((item) => item === null)
                    ? '默认场馆'
                    : items.map((item) => item?.label)}
                </div>
                <div className={styles.bar} onClick={open}>
                  更换
                  <DownFill />
                </div>
              </div>
            )
          }}
        </Picker>
      </div>
      <div className={styles.formBox}>
        <Form
          layout="horizontal"
          footer={
            <Button block type="submit" color="primary" size="large">
              预约申请
            </Button>
          }
        >
          <Form.Header>预约信息</Form.Header>
          <Form.Item
            name="name"
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
            name="teamName"
            label="团队名"
            rules={[{ required: true, message: '团队名不能为空' }]}
          >
            <Input onChange={console.log} placeholder="请输入团队名" />
          </Form.Item>
          <Form.Item
            name="address"
            label="排练内容"
            rules={[{ required: true, message: '排练内容不能为空' }]}
          >
            <TextArea
              placeholder="请输入排练内容"
              maxLength={100}
              rows={2}
              showCount
            />
          </Form.Item>
          <Form.Item
            name="teamName"
            label="预约人数"
            rules={[{ required: true, message: '预约人数不能为空' }]}
          >
            <Input onChange={console.log} placeholder="请输入预约人数" />
          </Form.Item>
          <Form.Item
            name="date"
            label="预约日期"
            trigger="onConfirm"
            onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
              datePickerRef.current?.open()
            }}
            rules={[{ required: true, message: '预约日期不能为空' }]}
          >
            <DatePicker>
              {(value) =>
                value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期'
              }
            </DatePicker>
          </Form.Item>
          <Form.Item name="favoriteFruits" label="时段选择">
            <Selector
              style={{
                '--padding': '2px',
              }}
              columns={3}
              options={[
                { label: '上午', value: 'apple' },
                { label: '下午', value: 'orange' },
                { label: '晚上', value: 'banana' },
              ]}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Venues
