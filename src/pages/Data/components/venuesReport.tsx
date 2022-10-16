import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Table from 'rc-table'
import { DatePicker, Button } from 'antd-mobile';
import dayjs from "dayjs";
import { getQueryOrder, getQueryStadiumOrder, queryHistoryOrder } from '@/apis/index'

const VenueReport: React.FC<Record<string, never>> = () => {

  const [venuesIsUsedList, setVIsUsedList] = useState([]);
  const getDataList = async () => {
    const { result: { list } } = await getQueryStadiumOrder();
    if (list && list.length > 0) {
      const rList = list.map((i: any) => ({
        ...i,
        hasOrder: i.hasOrder ? '是' : '否'
      }))
      setVIsUsedList(rList);
    }
  }
  const [year, setYear] = useState(new Date().getFullYear());
  const [venuesList, setVenuesList] = useState([]);
  const getHistoryList = async () => {
    const { result } = await queryHistoryOrder({
      startDate: year.toString(),
    });
    setVenuesList(result);
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
      dataIndex: 'bookRate',
      key: 'bookRate',
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
      dataIndex: 'hasOrder',
      key: 'hasOrder',
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

  const onConfirm = async (e: any) => {
    setYear(new Date(e).getFullYear());
    closePicker();
  }

  const [rate, setRate] = useState('');
  const getInfo = async () => {
    const { result } = await getQueryOrder();
    setRate(result.bookRate);
  }

  useEffect(() => {
    getInfo();
    getDataList();
  }, []);
  useEffect(() => {
    getHistoryList();
  }, [year])
  return (
    <div>
      <div className={styles.topBar}>
        总预约率：{rate}
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
            defaultValue={new Date()}
            visible={visible}
            onClose={() => {
              closePicker();
            }}
            onConfirm={(e) => {
              onConfirm(e);
            }}
            precision="year"
          >
            {(value) =>
              value ? `${dayjs(value).format("YYYY")}年` : ""
            }
          </DatePicker>
        </div>
        <Table
          columns={columns}
          data={venuesList}
          emptyText={() => ""}
        />

      </div>
      <div className={styles.card}>
        <div className={styles.title}>实时场馆使用情况</div>
        <Table columns={usedColumns} data={venuesIsUsedList} emptyText={() => ""}
        />
      </div>
    </div>
  )
}

export default VenueReport;