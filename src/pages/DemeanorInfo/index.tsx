import React, { useCallback, useEffect, useRef, useState } from 'react'
import Waterfall from '@/components/Waterfall'
import styles from './index.module.scss'
import { useLocation } from 'react-router-dom'
import request from '@/apis/request'
const DemeanorInfo = () => {
  const {state: {id, name}} = useLocation()
  const [source, setSource] = useState<any[]>([])
  const [visible,setVisible] = useState(false)
  const getSource = useCallback(async (id: string) => {
    const res = await request('post', '/nan_qiao/content/query', {pageNum: 1, pageSize: 10, parentId: id, type: 'ACTIVITY_SHOW'})
    setSource(res.result.list.map((v: any) => ({
      videoUrl: v.filePath,
      src: v.fileType === 2 ? `${v.filePath}?x-oss-process=video/snapshot,t_5000,f_jpg,m_fast` : v.filePath,
      type: v.fileType // 1是image, 2是video
    })))
  }, [])
  useEffect(() => {
    if (id) getSource(id)
  }, [id])
  const handlePlay = useCallback((data: any) => {
    const {videoUrl} = data
    if (data.type !== 2) return
    const video: any = document.getElementById('waterfall_video')
    video.src = videoUrl
    setVisible(true)
    video?.play()
  }, [])
  return (
    <div className={styles.info}>
      <p className={styles.title}>name</p>
      {source.length && <Waterfall data={source} wrapClass={styles.container} col={2}>
        {source.map((v, i) => (
          <img onClick={() => handlePlay(v)} src={v.src} key={i} alt={v.src} />
        ))}
      </Waterfall>}
      <div style={visible ? {} : {display: 'none'}} className={styles.videoWrapper}>
        <video id='waterfall_video' className={styles.video} controls onEnded={() => setVisible(false)} />
      </div>
    </div>
    
  )
}

export default DemeanorInfo