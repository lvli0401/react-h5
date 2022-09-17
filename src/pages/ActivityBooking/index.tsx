import React, { useState } from 'react'
import { LeftOutline } from 'antd-mobile-icons'
import styles from './index.module.scss'

const auditComponent = (props: any) => {
  // status 0 , 1, 2  初始， 通过， 失败
  const { status } = props
  if (status === 2) {
    return <div className={styles.auditFailed}>未通过审核</div>
  } else if (status === 1) {
    return <div className={styles.auditSuccess}>已通过审核</div>
  }
  return (
    <div className={styles.isAudit}>
      <div className={styles.auditSuccess}>是否审核通过</div>
      <div className={styles.btnBox}>
        <span className={styles.btnSuc}>通过</span>
        <span className={styles.btnFail}>不通过</span>
      </div>
    </div>
  )
}

const Record: React.FC<any> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <LeftOutline fontSize={16} />
        <span className={styles.title}>活动预约审核列表</span>
      </div>
      <div className={styles.card}>
        <div className={styles.cardItem}>
          <span className={styles.itemLabel}>活动名称</span>
          <span className={styles.itemContent}>奉贤区南桥镇南星路333号4楼</span>
        </div>
        <div className={styles.cardItem}>
          <span className={styles.itemLabel}>预约时间</span>
          <span className={styles.itemContent}>2022.10.10 早上 9:00-11:00</span>
        </div>
        <div className={styles.cardItem}>
          <span className={styles.itemLabel}>预约人</span>
          <span className={styles.itemContent}>张晓明 30周岁</span>
        </div>
        <div className={styles.cardItem}>
          <span className={styles.itemLabel}>预约人数</span>
          <span className={styles.itemContent}>10</span>
        </div>
        <div className={styles.cardItem}>
          {auditComponent({
            status: 2,
          })}
        </div>
      </div>
    </div>
  )
}
export default Record
