import React, { RefObject, useState } from "react";
import { LeftOutline } from "antd-mobile-icons";
import styles from "./index.module.scss";

const Record: React.FC<any> = () => {
  const [value, setValue] = useState<(string | null)[]>([]);

  const list = [
    {
      id: 1,
      date: "2022-02-20",
      address: "背景",
      activity: "万",
      status: 1,
    },
    {
      id: 1,
      date: "2022-02-230",
      address: "背景da",
      activity: "万",
      status: 1,
    },
    {
      id: 1,
      date: "2022-02210",
      address: "背景",
      activity: "万",
      status: 1,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <LeftOutline fontSize={16} />
        <span className={styles.title}>预约记录</span>
      </div>
      <div className={styles.card}>
        <div className={styles.cardItem}>
          <span className={styles.itemLabel}>预约时间</span>
          <span className={styles.itemContent}>2022.10.10</span>
        </div>
        <div className={styles.cardItem}>
          <span className={styles.itemLabel}>场馆/活动</span>
          <span className={styles.itemContent}>奉贤区南桥镇南星路333号4楼</span>
        </div>
        <div className={styles.cardItem}>
          <span className={styles.itemLabel}>预约结果</span>
          <span className={styles.itemContent}>成功</span>
        </div>
        <div className={styles.cardItem}>
          <span className={styles.itemLabel}>注意事项</span>
          <span className={styles.itemContent}>需持48小时证明</span>
        </div>
      </div>
    </div>
  );
};
export default Record;
