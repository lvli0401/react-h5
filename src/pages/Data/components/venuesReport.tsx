import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Table from 'rc-table'
import { DatePicker, Button } from 'antd-mobile';
import dayjs from "dayjs";

const VenueReport: React.FC<Record<string, never>> = () => {

  const venuesList = [
    {
      id: 1,
      name: '哪吒1',
      bookingRate: '10%',

    },
    {
      id: 2,
      name: '哪吒2',
      bookingRate: '10%',

    },
    {
      id: 3,
      name: '哪吒3',
      bookingRate: '10%',

    },
  ];
  const venuesIsUsedList = [
    {
      id: 1,
      name: '哪吒1',
      isUsed: true,
    },
    {
      id: 2,
      name: '哪吒1',
      isUsed: true,
    },
    {
      id: 3,
      name: '哪吒3',
      isUsed: false,
    },
  ]
  const getDataList = () => {

  }
  const columns = [
    {
      title: '场馆名',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      className: styles.tCenter,
    },
    {
      title: '预约率',
      dataIndex: 'bookingRate',
      key: 'bookingRate',
      width: 200,
      className: styles.tCenter,
    },
  ]
  const usedColumns = [
    {
      title: '场馆名',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      className: styles.tCenter,
    },
    {
      title: '是否使用',
      dataIndex: 'isUsed',
      key: 'isUsed',
      width: 200,
      className: styles.tCenter,
    },
  ]

  const [visible, setVisible] = useState(false);
  const popPicker = () => {
    setVisible(true);
  }
  const closePicker = () => {
    setVisible(false);
  }

  useEffect(() => {
    getDataList();
  });
  return (
    <div>
      <div className={styles.topBar}>
        总预约率：10%
      </div>
      <div className={styles.card}>
        <div className={styles.title}>
          <span>每年场馆预约率</span>
          <Button
            size='mini'
            onClick={popPicker}
          >
            选择年份:
          </Button>
          <DatePicker
            max={new Date()}
            visible={visible}
            onClose={() => {
              closePicker();
            }}
            onConfirm={() => {
              closePicker();
            }}
            precision="year"
          >
            {(value) =>
              value ? `${dayjs(value).format("YYYY")}年` : ""
            }
          </DatePicker>
        </div>
        <Table columns={columns} data={venuesList} />

      </div>
      <div className={styles.card}>
        <div className={styles.title}>实时场馆使用情况</div>
        <Table columns={usedColumns} data={venuesIsUsedList} />
      </div>
    </div>
  )
}

export default VenueReport;