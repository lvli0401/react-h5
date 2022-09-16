import React, { useCallback, useRef, useState } from "react";
import Layout from "@components/Layout";
import {Button} from 'antd-mobile'
import Table from 'rc-table'

const Messages: React.FC<any> = () => {
  const refQr = useRef(null)
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 100,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 200,
    },
    {
      title: 'Operations',
      dataIndex: '',
      key: 'operations',
      render: () => <a href="#">Delete</a>,
    },
  ];
  
  const data = [
    { name: 'Jack', age: 28, address: 'some where', key: '1' },
    { name: 'Rose', age: 36, address: 'some where', key: '2' },
  ];
  const handleQr = useCallback(() => {
    // @ts-ignore
    const qrcode = new QRCode(refQr.current, {
      text: "http://www.muguilin.com",
      width: 300,
      height: 300,
      colorDark: "blue",
      colorLight: "white",
      // @ts-ignore
      correctLevel: QRCode.CorrectLevel.H
    })
    // qrcode.clear();
    // if(refQr.current) qrcode.makeCode(refQr.current.value);
  }, [])
  return <Layout>
    <Button onClick={handleQr}>生成二维码</Button>
    <div ref={refQr}></div>
    <Table columns={columns} data={data} />
  </Layout>;
};
export default Messages;
