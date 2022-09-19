import React, { useCallback, useRef } from 'react'
import styles from './index.module.scss'
import {Toast} from 'antd-mobile'
import request from '@/apis/request'

export interface fileType {
    url: string,
    type: 'video' | 'image'
}

const videoType = /^video\//
const imageType = /^image\//

const VideoUpload = ({onUpload, fileList}: {onUpload: (files: fileType[]) => void, fileList: Array<fileType>}) => {
  const refInput = useRef<any>()
  const handleChange = useCallback(
    async (e: any) => {
      const files = e.target.files
      const preFileList = [...fileList]
      Array.prototype.forEach.call(files, (async (v: any) => {
        if (!imageType.test(v.type) && !videoType.test(v.type)) {
          return Toast.show('只能上传图片或视频')
        }
        const form = new FormData()
        form.append('file', v)
        await request('post', '/nan_qiao/file/upload', form, {headers: {
          'content-type': 'multipart/form-data',
        },})
        // preFileList.push({
        //   // type: ''
        // })
      }))
    },
    [fileList],
  )
    
  return (
    <div>
      {fileList.map(v => {
        return (
          <div key={v.url}>
            <img />
          </div>
        )
      })}
      <div className={styles.maskUpload} onClick={() => refInput.current?.click()}>
        <span>添加图片/视频</span>
      </div>
      <input ref={refInput} className={styles.input} type='file' onChange={handleChange} multiple={true} />
    </div>
  )
}

export default VideoUpload