import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LeftOutline } from "antd-mobile-icons";
import { venuesAuditList, doAuditVenue } from '@/apis/index';
import styles from "./index.module.scss";
import { Toast } from 'antd-mobile'

interface vProps {
  orderId?: number;
  stadiumName?: string;
  orderTime?: string;
  orderPersonName?: string;
  orderPeoleCnt?: number;
  orderStatus: number;
}

const Record: React.FC<any> = () => {

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [venueList, setVenueList] = useState<vProps[]>([]);

  const getList = async () => {
    const { result } = await venuesAuditList();
    setVenueList(result.list);
  };

  const doAudit = async (id: number | undefined, val: boolean) => {
    await doAuditVenue({
      orderId: id,
      auditSuc: val
    });
    Toast.show('操作成功')
    getList();
  }


  const auditComponent = (id: any, status: any) => {
    // status 1 , 2, 3  初始， 通过， 失败
    if (status === 1) {
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
      );
    } else if (status === 2) {
      return <div className={styles.auditSuccess}>已通过审核</div>;
    }
    return (

      <div className={styles.auditFailed}>未通过审核</div>
    );
  };


  useEffect(() => {
    getList();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={() => goBack()}>
        <LeftOutline fontSize={16} />
        <span className={styles.title}>场馆预约审核列表</span>
      </div>
      {
        venueList.map((i, index) => (
          <div className={styles.card} key={`${i.orderId} + ${index}`}>
            <div className={styles.cardItem}>
              <span className={styles.itemLabel}>场馆名称</span>
              <span className={styles.itemContent}>{i.stadiumName}</span>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.itemLabel}>预约时间</span>
              <span className={styles.itemContent}>{i.orderTime}</span>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.itemLabel}>预约人</span>
              <span className={styles.itemContent}>{i.orderPersonName}</span>
            </div>
            <div className={styles.cardItem}>
              <span className={styles.itemLabel}>预约人数</span>
              <span className={styles.itemContent}>{i.orderPeoleCnt}</span>
            </div>
            <div className={styles.cardItem}>
              {auditComponent(i.orderId, i.orderStatus)}
            </div>
          </div>
        ))
      }

    </div>
  );
};
export default Record;
