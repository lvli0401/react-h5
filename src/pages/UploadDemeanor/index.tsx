import React, { useCallback, useEffect, useState } from 'react'
import styles from './index.module.scss'
import {Button, Input, Picker, Radio} from 'antd-mobile'
import MediaUpload, {fileType} from '@/components/MediaUpload'
import request from '@/apis/request'
import successIcom from '@/assets/images/img_上传成功@2x.png'


const UploadActivity = () => {
  const [fileList, setFileList] = useState<fileType[]>([])
  const [coverList, setCoverList] = useState<fileType[]>([])
  const [success, setSuccess] = useState(false)
  const [nameType, setNameType] = useState('1')
  const [name, setName] = useState({
    label: '',
    value: null
  })
  const [visible, setVisible] = useState(false)
  const [nameColumns, setNameColumns] = useState([])
  const handleVideoUpload = useCallback(
    (files: fileType[]) => {
      setFileList(files)
    },
    [],
  )
  const handleImgUpload = useCallback(
    (files: fileType[]) => {
      setCoverList(files)
    },
    [],
  )
  const handleSubmit = useCallback(
    async () => {
      const res = await request('post', '/nan_qiao/content/submit', {
        cover: coverList[0].url,
        files: fileList.map(v => ({
          filePath: v.url,
          fileType: 'image' === v.type ? 'IMG' : 'VIDEO'
        })),
        name: name.label,
        parentId: name.value,
        type: 'ACTIVITY_SHOW'
      })
      setSuccess(true)
    },
    [name, coverList, fileList],
  )

  const getNameColumns = useCallback(async() => {
    const res = await request('post', '/nan_qiao/content/query', {
      pageNum: 1,
      pageSize: 1000,
      parentId: null,
      type: 'ACTIVITY_SHOW'
    })
    setNameColumns(res.result.list.map((v: any) => ({label: v.name, value: v.id})))
  }, [])
  useEffect(() => {
    getNameColumns()
  }, [])
  if (!success)
    return (
      <div className={styles.upload}>
        <div className={styles.title}>
          <div>
            <span>风采标题</span>
            <span>（必填）</span>
          </div>
          <Radio.Group value={nameType} onChange={val => {
            setName({label: '',
              value: null})
            setNameType(val.toString())
          }}>
            <Radio className={styles.radio} value='1'>输入新标题</Radio>
            <Radio className={styles.radio} value='2'>选择已有标题</Radio>
          </Radio.Group>
          {nameType === '1' ? <Input value={name.label} onChange={val => setName({label: val, value: null})} className={styles.titleInput} placeholder='请输入标题' /> : 
            <>
              <Button
                onClick={() => {
                  setVisible(true)
                }}
              >
                选择已有标题
              </Button>
              <span>{name.label}</span>
              <Picker
                columns={[nameColumns]}
                visible={visible}
                onClose={() => {
                  setVisible(false)
                }}
                value={[name.value]}
                onConfirm={(v: any[]) => {
                  const target  = nameColumns.find((i: any) => i.value === v[0])
                  target && setName(target)
                }}
              />
            </>}
        </div>
        <div className={styles.content}>
          <div>
            <span>封面图片</span>
            <span>（必填）</span>
          </div>
          <MediaUpload accept={/^image\//} text="添加图片" onUpload={handleImgUpload} fileList={coverList} />
        </div>
        <div className={styles.content}>
          <div>
            <span>风采内容</span>
            <span>（必填）</span>
          </div>
          <MediaUpload multiple={true} maxCount={10} onUpload={handleVideoUpload} fileList={fileList} />
        </div>
        <div className={styles.button} onClick={handleSubmit}>上传风采信息</div>
      </div>
    )
  return (
    <div className={styles.success}>
      <img src={successIcom} />
      <span>上传成功</span>
    </div>
  )
}

export default UploadActivity