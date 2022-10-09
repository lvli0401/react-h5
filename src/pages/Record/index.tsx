import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LeftOutline } from "antd-mobile-icons";
import styles from "./index.module.scss";
import { bookingRecord } from '@/apis/index';
import storage from '@utils/storage'


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
    const { result } = await bookingRecord({
      userId: storage.get('userInfo')?.id,
    });
    setList(result);
  }

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }

  useEffect(() => { getRecordList() }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={goBack}>
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
