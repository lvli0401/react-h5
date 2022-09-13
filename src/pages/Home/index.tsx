import React from "react";
import styles from "./index.module.scss";
import Layout from "@components/Layout";
import { Link } from "react-router-dom";
import { Button } from "antd-mobile";
const entryList = [
  {
    icon: '',
    text: '预约记录',
  },
  {
    icon: '',
    text: '场馆预约',
  },
  {
    icon: '',
    text: '风采展示',
  },
  {
    icon: '',
    text: '公告信息',
  }
]
const venueList = [
  {imgurl: ''}
]
const Home: React.FC<Record<string, never>> = () => {
  return (
    <Layout>
      <img alt='' src='' className={styles.banner} />
      <div className={styles.entry}>
        {entryList.map((v) => (
          <div key={v.icon}>
            <img src={v.icon} />
            <div>{v.text}</div>
          </div>
        ))}
      </div>
      <div>场馆信息</div>
    </Layout>
  );
};
export default Home;
