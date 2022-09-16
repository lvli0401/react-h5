import React, { useState } from "react";
import { LeftOutline } from "antd-mobile-icons";
import styles from "./index.module.scss";

const Record: React.FC<any> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <LeftOutline fontSize={16} />
        <span className={styles.title}>个人中心</span>
      </div>
    </div>
  );
};
export default Record;
