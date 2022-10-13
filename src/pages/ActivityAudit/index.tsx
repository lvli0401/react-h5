import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LeftOutline } from 'antd-mobile-icons'
import { venuesAuditList, doAuditVenue } from '@/apis/index'
import styles from './index.module.scss'
import { Toast } from 'antd-mobile'
import request from '@/apis/request'
import {activityProps} from './type'

const Record: React.FC<any> = () => {

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const [activityList, setactivityList] = useState<activityProps[]>([])

  const getList = async () => {
    const { result } = await request('post', '/nan_qiao/activity/apply/query/list', {})
    setactivityList(result.list)
  }

  const doAudit = async (id: number | undefined, val: boolean) => {
    await request('post', '/nan_qiao/activity/apply/audit', {
      activityId: id,
      auditResult: val
    })
    Toast.show('操作成功')
    getList()
  }


  const auditComponent = (id: any, status: any) => {
    // status 0, 1, 2  初始， 通过， 失败
    if (status === 0) {
      return (
        <div className={styles.isAudit}>
          <div className={styles.auditSuccess}>是否审核通过</div>
          <div className={styles.btnBox}>
            <span className={styles.btnSuc} onClick={() => {
              doAudit(id, true)
            }}>通过</span>
            <span className={styles.btnFail} onClick={() => {
              doAudit(id, false)
            }}>不通过</span>
          </div>
        </div>
      )
    } else if (status === 1) {
      return <div className={styles.auditSuccess}>已通过审核</div>
    }
    return (

      <div className={styles.auditFailed}>未通过审核</div>
    )
  }


  useEffect(() => {
    getList()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={() => goBack()}>
        <LeftOutline fontSize={16} />
        <span className={styles.title}>活动预约审核列表</span>
      </div>
      {
        activityList.map((i, index) => (
          <div className={styles.card} key={i.activityId}>
            <div className={styles.cardItem}>
              <span className={styles.itemLabel}>活动名称</span>
              <span className={styles.itemContent}>{i.name}</span>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.itemLabel}>活动时间</span>
              <span className={styles.itemContent}>{i.startTime}至{i.endTime}</span>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.itemLabel}>预约人</span>
              <span className={styles.itemContent}>{i.userName}</span>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.itemLabel}>预约人数</span>
              <span className={styles.itemContent}>{i.userNumber}</span>
            </div>
            <div className={styles.cardItem}>
              {auditComponent(i.activityId, i.status)}
            </div>
          </div>
        ))
      }

    </div>
  )
}
export default Record
