import React, { useCallback, useEffect, useRef, useState } from 'react'
import {QRCodeCanvas} from 'qrcode.react'
import styles from './index.module.scss'
import qrcodeIcon from '@images/img-风采展示@2x.png'
import downloadIcon from '@images/img_长按@2x.png'
import { useLocation } from 'react-router-dom'

const QRCodePage = ({activityId}: {activityId: string}) => {
  const [imgSrc, setImgSrc] = useState('')
  const handleQr = useCallback(() => {
    const canvasImg: any = document.getElementById('qrCode') // 获取canvas类型的二维码
    setImgSrc(canvasImg?.toDataURL('image/png'))
  }, [])
  useEffect(() => {
    handleQr()
  }, [])
  return (
    <div className={styles.background}>
      <div className={styles.qrCode}>
        <div className={styles.title}>
          <p>活动进行中</p>
          <p>扫描图中二维码报名</p>
        </div>
        <img src={imgSrc} className={styles.img}/>
        <div className={styles.download}>
          <img src={downloadIcon} />
          <span>长按下载图片</span>
        </div>
        <div style={{display: 'none'}}>
          <QRCodeCanvas
            id="qrCode"
            value={`${window.location.host}/data?activity_id=${activityId}`}
            size={100} // 二维码的大小
            fgColor="#000000" // 二维码的颜色
            style={{ margin: 'auto' }}
            // imageSettings={{ // 二维码中间的logo图片
            //   src: qrcodeIcon,
            //   height: 25,
            //   width: 25,
            //   excavate: true, // 中间图片所在的位置是否镂空
            // }}
          /> 
        </div>
      </div>
    </div>
    
  )
}

export default QRCodePage