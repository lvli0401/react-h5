import React, { useCallback, useRef, useState } from 'react'
import Layout from '@components/Layout'
import {Button} from 'antd-mobile'
import Table from 'rc-table'
import QRCode from 'qrcode.react'

const Messages: React.FC<any> = () => {
  const refQr = useRef(null)
  const [imgSrc, setImgSrc] = useState('')
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
  ]
  
  const data = [
    { name: 'Jack', age: 28, address: 'some where', key: '1' },
    { name: 'Rose', age: 36, address: 'some where', key: '2' },
  ]
  const handleQr = useCallback(() => {
    const canvasImg: any = document.getElementById('qrCode') // 获取canvas类型的二维码
    setImgSrc(canvasImg?.toDataURL('image/png'))
  }, [])
  return <Layout>
    <Button onClick={handleQr}>生成二维码</Button>
    <div ref={refQr}></div>
    <img src={imgSrc} />
    <div style={{display: 'none'}}>
      <QRCode
        id="qrCode"
        value="https://www.jianshu.com/u/992656e8a8a6"
        size={100} // 二维码的大小
        fgColor="#000000" // 二维码的颜色
        style={{ margin: 'auto' }}
        imageSettings={{ // 二维码中间的logo图片
          src: 'logoUrl',
          height: 100,
          width: 100,
          excavate: true, // 中间图片所在的位置是否镂空
        }}
      /> 
    </div>
     
    <Table columns={columns} data={data} />
  </Layout>
}
export default Messages
