import React, { useCallback, useRef, useState } from 'react'
import styles from './index.module.scss'
import {Toast} from 'antd-mobile'
import request from '@/apis/request'
import playButton from '@images/play_button.webp'
import uploadIcon from '@images/img_上传图片视频@2x.png'

export interface fileType {
    url: string,
    type: 'video' | 'image'
}

const videoType = /^video\//
const imageType = /^image\//

const MediaUpload = ({onUpload, fileList, maxCount = 1, multiple = false, accept, text}: {onUpload: (files: fileType[]) => void,
  fileList: Array<fileType>, maxCount?: number, multiple?: boolean, accept?: RegExp, text?: string}) => {
  const refInput = useRef<any>()
  const [loading, setLoading] = useState(false)
  const handleChange = useCallback(
    async (e: any) => {
      const files = e.target.files
      let flag = true
      Array.prototype.forEach.call(files, (async (v: any) => {
        if (accept && !accept.test(v.type)) {
          flag = false
          return Toast.show('上传文件类型不匹配')
        }
        if (!imageType.test(v.type) && !videoType.test(v.type)) {
          flag = false
          return Toast.show('只能上传图片或视频')
        }
      }))
      if (!flag) return
      setLoading(true)
      try {
        const newFileList: any[] = await Promise.all(Array.prototype.map.call(files, async (v: any) => {
          const form = new FormData()
          form.append('file', v)
          const res = await request('post', '/nan_qiao/file/upload', form, {headers: {
            'content-type': 'multipart/form-data',
          },})
          return {
            type: videoType.test(v.type) ? 'video' : 'image',
            url: res.result
          }
        }))
        onUpload([...fileList, ...newFileList])
        e.target.value = null
      } catch(e) {
        Toast.show('上传失败')
      } finally{
        setLoading(false)
      }
    },
    [fileList, onUpload],
  )
  const handleDelete = useCallback((index: number) => {
    const newFileList = [...fileList]
    newFileList.splice(index, 1)
    onUpload(newFileList)
  }, [fileList, onUpload])
  return (
    <div>
      <div className={styles.imgList}>
        {fileList.map((v, index) => {
          const url = 'image' === v.type ? `${v.url}?x-oss-process=image/resize,w_80/quality,Q_80` : `${v.url}?x-oss-process=video/snapshot,t_5000,f_jpg,m_fast,w_80`
          return (
            <div className={styles.imgItem} key={index}
              style={{
                backgroundImage: `url(${url})`
              }}
            >
              {'video' === v.type && <img src={playButton} />}
              <div onClick={() => handleDelete(index)} className={styles.close} />
            </div>
          )
        })}
        {fileList.length < maxCount && <div className={styles.maskUpload} onClick={() => {
          refInput.current?.click()
        }}>
          <img src={uploadIcon} />
          <div>{text ? text : '添加图片/视频'}</div>
        </div>}
      </div>
      <div style={loading ? {} : {display: 'none'}} className={styles.loading}>
        <div className={styles.loadingItem}>
          {Array(12).fill('').map((_, index) => (<div key={index} />))}
        </div>
        <p>上传中...</p>
      </div>
      <input ref={refInput} className={styles.input} type='file' onChange={handleChange} multiple={!!multiple} />
    </div>
  )
}

export default MediaUpload