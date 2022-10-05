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
import { stadiumInfoListAll, venuesOrder } from '@/apis/index';
import styles from './index.module.scss'
import { useNavigate } from "react-router-dom"
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
  const [list, setList] = useState<colProps[]>([]);
  const [curVenue, setCurVenue] = useState<venuesProp>({
    code: '',
    name: '',
    note: '',
    status: -1,
    detailPhotos: [],
    showPhoto: "",
    location: "",
    timeRangeVos: []
  });
  const [originList, setOriginList] = useState<venuesProp[]>([]);

  const getVenuesList = async () => {
    const { result: { list } } = await stadiumInfoListAll();
    if (list && list.length > 0) {
      setOriginList(list);
      setCurVenue(list[0]);
      const rList = list.map((i: any) => ({
        label: i.name,
        value: i.code,
      }));
      setList(rList);
      setValue([rList[0].value]);
    }
  }

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [value, setValue] = useState<any[]>([]);

  const onConfirm = (val: any[]) => {
    setValue(val);
    const curIndex = originList.findIndex((i: any) => i.code === val[0]);
    setCurVenue(originList[curIndex]);
  }

  const onFinish = async (values: any) => {
    console.log(storage.get('userInfo').id, '23seflskj');

    const params = {
      ...values,
      timeType: values.timeType[0],
      date: dayjs(values.date).format('YYYY-MM-DD'),
      stadiumCode: curVenue.code,
      orderPersonId: storage.get('userInfo').id
    }
    await venuesOrder(params);
    Toast.show('预约成功');
  };

  useEffect(() => {
    getVenuesList();
  }, []);

  const maxDate = new Date(dayjs().add(1, 'M').format('YYYY-MM-DD'));
  const minDate = new Date(dayjs().add(5, 'd').format('YYYY-MM-DD'));

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={() => {
        goBack();
      }}>
        <LeftOutline fontSize={16} />
        <span className={styles.title}>场馆预约</span>
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
          {
            curVenue.timeRangeVos.map((i, index) => (
              <div key={index} className={styles.infoWord}>
                {i.startTime} - {i.endTime}
              </div>
            ))
          }
        </div>
        <h2 className={styles.subTitle}>地址信息</h2>
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
          onFinish={onFinish}
          layout="horizontal"
          footer={
            <Button block type="submit" color="primary" size="large">
              预约申请
            </Button>
          }
        >
          <Form.Header>预约信息</Form.Header>
          <Form.Item
            name="orderPersonName"
            label="姓名"
            rules={[{ required: true, message: '姓名不能为空' }]}
          >
            <Input onChange={console.log} placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            name="orderPhone"
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
            name="applyReason"
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
            name="orderPeopleCnt"
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
            <DatePicker
              min={minDate}
              max={maxDate}
            >
              {(value) =>
                value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期'
              }
            </DatePicker>
          </Form.Item>
          <Form.Item name="timeType" label="时段选择">
            <Selector
              style={{
                '--padding': '2px',
              }}
              columns={3}
              options={[
                { label: '上午', value: '0' },
                { label: '下午', value: '1' },
                { label: '晚上', value: '2' },
              ]}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Venues
