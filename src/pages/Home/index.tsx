import React from "react";
import styles from "./index.module.scss";
import Layout from "@components/Layout";
import { Link } from "react-router-dom";
import { Button } from "antd-mobile";
const Home: React.FC<Record<string, never>> = () => {
  return (
    <Layout>
      <img src='' className={styles.banner} />
    </Layout>
  );
};
export default Home;
