import React, { useState, useEffect } from "react";
import { LeftOutline } from "antd-mobile-icons";
import Layout from "@components/Layout";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import Icon1 from "@images/img-预约记录 2@2x.png";
import Icon2 from "@images/img-上传风采信息@2x.png";
import Icon3 from "@images/img-场馆预约审核@2x.png";
import Icon4 from "@images/img-活动预约审核@2x.png";
import Icon5 from "@images/img-二维码生成@2x.png";
import BgOrange from "@images/img_背景@2x.png";
import DefAvatar from "@images/img-个人中心@2x.png";
import storage from "@/utils/storage";

interface barProps {
  id: number;
  icon: string;
  name: string;
  path: string;
}
const commonlist: barProps[] = [
  {
    id: 1,
    icon: Icon1,
    name: "预约记录",
    path: "/record",
  },
];
const managementList: barProps[] = [
  {
    id: 2,
    icon: Icon2,
    name: "上传风采信息",
    path: "",
  },
  {
    id: 3,
    icon: Icon3,
    name: "场馆预约审核列表",
    path: "/venueBooking",
  },
  {
    id: 4,
    icon: Icon4,
    name: "活动预约审核列表",
    path: "",
  },
  {
    id: 5,
    icon: Icon5,
    name: "活动报名二维码生成",
    path: "",
  },
]
const Record: React.FC<any> = (props: any) => {

  const [barList, setBarList] = useState<(barProps)[]>([]);
  const [avatar, setAvatar] = useState<string>(DefAvatar);
  const [userName, setUserName] = useState<string>('登录');

  useEffect(() => {
    const { userType, headPic, wechatName } = storage.get('userInfo');
    const isManagement = userType === 1;
    setBarList(!isManagement ? managementList : commonlist);
    setAvatar(headPic || DefAvatar);
    setUserName(wechatName);
  }, [])
  const navigate = useNavigate();
  const jump2Page = (path: string) => {
    navigate(path);
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header} onClick={goBack}>
          <LeftOutline fontSize={16} />
          <span className={styles.title}>个人中心</span>
        </div>
        <div className={styles.main}>
          <img className={styles.topBg} src={BgOrange} alt="" />
          <div className={styles.loginBox}>
            <div className={styles.avatar}>
              <img src={avatar} alt="" />
            </div>
            <div className={styles.loginText}>{userName}</div>
          </div>
          <div className={styles.card}>
            {barList.map(i => (
              <div
                className={styles.item}
                key={i.id}
                onClick={() => jump2Page(i.path)}
              >
                <img src={i.icon} />
                <span className={styles.text}>{i.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Record;
