import React, { RefObject, useState, useEffect } from "react";
import { LeftOutline } from "antd-mobile-icons";
import styles from "./index.module.scss";
import { bookingRecord } from '@/apis/index';


const auditStatus = [
  '审核失败',
  '审核中',
  '审核通过',
];

interface bookingRecordsProps {
  id: number;
  bookInfo: string;
  bookTime: string;
  approveStatus: number;
  remark: string;
  createTime?: string;
}

const Record: React.FC<any> = () => {
  const [list, setList] = useState<bookingRecordsProps[]>([]);
  const getRecordList = async () => {
    await bookingRecord();
    // const {result} = await bookingRecord();
    const result = {
      bookingRecords: [{
        id: 1,
        bookInfo: "活动名/ 场馆地址",
        bookTime: "2022-01-01",
        approveStatus: 0,
        remark: "一些注意事项一些注意事项一些注意事项一些注意事项",
      }]
    }
    setList(result.bookingRecords);
  }

  useEffect(() => { getRecordList() }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <LeftOutline fontSize={16} />
        <span className={styles.title}>预约记录</span>
      </div>
      {
        list.map((i) => (
          <div className={styles.card} key={i.id}>
            <div className={styles.cardItem}>
              <span className={styles.itemLabel}>预约时间</span>
              <span className={styles.itemContent}>{i.bookTime}</span>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.itemLabel}>场馆/活动</span>
              <span className={styles.itemContent}>{i.bookInfo}</span>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.itemLabel}>预约结果</span>
              <span className={styles.itemContent}>{auditStatus[i.approveStatus]}</span>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.itemLabel}>注意事项</span>
              <span className={styles.itemContent}>{i.remark}</span>
            </div>
          </div>
        ))
      }

    </div>
  );
};
export default Record;
