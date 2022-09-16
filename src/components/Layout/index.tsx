import React from "react";
import { TabBar } from "antd-mobile";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import imgHome from '@images/img-首页-选中@2x.png'

const tabs = [
  {
    key: "/home",
    title: "首页",
    icon: imgHome,
  },
  {
    key: "/data",
    title: "数据中心",
    icon: '../../assets/img/img-数据中心-默认@2x.png',
  },
  {
    key: "/my",
    title: "个人中心",
    icon: '../../assets/img/img-个人中心-默认@2x.png'
  },
];
const Layout: React.FC<any> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value);
  };

  return (
    <div className={styles.container}>
      {children}
      <div className={styles.nav}>
        {/* <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar> */}
        {tabs.map(v => <img key={v.icon} src={v.icon} />)}
      </div>
    </div>
  );
};

export default Layout;
