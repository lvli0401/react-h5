import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { useLocation } from 'react-router-dom'
import request from '@/apis/request'
import {InfiniteScroll, ImageViewer} from 'antd-mobile'
import playButton from '@images/play_button.webp'
import closeIcon from '@images/img_关闭@2x.png'

const getImage = (src: string) => new Promise((resolve, reject) => {
  const img = new Image()
  img.src = src
  img.onload = () => resolve({width: img.width, height: img.height})
})
const format = (v: any) => ({
  videoUrl: v.filePath,
  src: v.fileType === 2 ? `${v.filePath}?x-oss-process=video/snapshot,t_5000,f_jpg,m_fast,w_120` : v.filePath,
  type: v.fileType // 1是image, 2是video
})
const DemeanorInfo = () => {
  const {state: {id, name}} = useLocation()
  const [source, setSource] = useState<any[]>([])
  const [leftPart, setLeftPart] = useState<any[]>([])
  const [rightPart, setRightPart] = useState<any[]>([])
  const [leftHeight, setLeftHeight] = useState(0)
  const [rightHeight, setRightHeight] = useState(0)
  const [visible,setVisible] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [pageNum, setPageNum] = useState(1)
  const [viewImage, setViewImage] = useState('')

  const loadMore = useCallback(async () => {
    const res = await request('post', '/nan_qiao/content/query', {pageNum, pageSize: 10, parentId: id, type: 'ACTIVITY_SHOW'})
    setSource([...source, ...res.result.list.map(format)])
    setHasMore(res.result.list.length > 0)
    setPageNum(pageNum + 1)
    const imgInfoList = await Promise.all(res.result.list.map(async(v: any) => {
      const target = format(v)
      const imgInfo: any = await getImage(target.src)
      return {...target, ...imgInfo}
    }))
    const newLeftPart = [...leftPart]
    const newRightPart = [...rightPart]
    let newLeftHeight = leftHeight
    let newRightHeight = rightHeight
    for (const item of imgInfoList) {
      if (newLeftHeight <= newRightHeight) {
        newLeftHeight = newLeftHeight + item.height * (166 / item.width)
        newLeftPart.push(item)
      } else {
        newRightHeight = newRightHeight + item.height * (166 / item.width)
        newRightPart.push(item)
      }
    }
    setLeftPart(newLeftPart)
    setRightPart(newRightPart)
    setLeftHeight(newLeftHeight)
    setRightHeight(newRightHeight)
  }, [pageNum, source, id, leftHeight, rightHeight, leftPart, rightPart])

  const handlePlay = useCallback((data: any) => {
    const {videoUrl, src} = data
    // if (data.type === 1) return setViewImage(src)
    const video: any = document.getElementById('waterfall_video')
    const img: any = document.getElementById('waterfall_img')
    if (data.type === 1) {
      video.style.display = 'none'
      img.style.display = 'block'
      img.src = src
    } else  {
      img.style.display = 'none'
      video.style.display = 'block'
      video.src = videoUrl
      video?.play()
    }
    setVisible(true)
  }, [])

  const stopVideo = useCallback(() => {
    const video: any = document.getElementById('waterfall_video')
    video?.pause()
    setVisible(false)
  }, [])
  return (
    <div className={styles.info}>
      <p className={styles.title}>{name}</p>
      <div className={styles.waterfall}>
        <div className={styles.left}>
          {leftPart.map((v, i) => (
            <div key={i} onClick={() => handlePlay(v)}>
              <img src={v.type === 2 ? v.src : `${v.src}?x-oss-process=image/resize,w_100/quality,Q_80`} alt='' />
              {v.type === 2 && <img src={playButton} />}
            </div>
          ))}
        </div>
        <div className={styles.right}>
          {rightPart.map((v, i) => (
            <div key={i} onClick={() => handlePlay(v)}>
              <img src={v.type === 2 ? v.src : `${v.src}?x-oss-process=image/resize,w_100/quality,Q_80`} alt='' />
              {v.type === 2 && <img src={playButton} />}
            </div>
          ))}
        </div>
      </div>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        {hasMore ? '加载中...': '已经到底了~' }  
      </InfiniteScroll>
      <div style={visible ? {} : {display: 'none'}} className={styles.videoWrapper}>
        <div>
          <video id='waterfall_video' className={styles.video} controls
            onEnded={stopVideo}
          />
          <img className={styles.viewImg} id='waterfall_img' />
          <img className={styles.close} onClick={stopVideo} src={closeIcon} />
        </div>
      </div>
    </div>
    
  )
}

export default DemeanorInfo