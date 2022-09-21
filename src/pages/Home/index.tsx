import React, { useCallback, useEffect, useState } from 'react'
import styles from './index.module.scss'
import Layout from '@components/Layout'
import { Link } from 'react-router-dom'
import { Button } from 'antd-mobile'
import VenueCard from './components/venue-card'
import request from '@/apis/request'
import bookRecordIcon from '@images/img-预约记录@2x.png'
import venueIcon from '@images/img-场馆预约@2x.png'
import demeanorIcon from '@images/img-风采展示@2x.png'

const entryList = [
  {
    icon: bookRecordIcon,
    text: '预约记录',
  },
  {
    icon: venueIcon,
    text: '场馆预约',
  },
  {
    icon: demeanorIcon,
    text: '风采展示',
  },
  // {
  //   icon: '',
  //   text: '公告信息',
  // }
]

const Home: React.FC<Record<string, never>> = () => {
  const [banner, setBanner] = useState('')
  const [demeanorList, setDemeanorList] = useState<any[]>([])
  const getData = useCallback(async() => {
    const [{result: res1}, {result: res2}]  = await Promise.all([
      request('post', '/nan_qiao/content/query', {pageNum: 1, pageSize: 10, type: 'BANNER'}),
      request('post', '/nan_qiao/content/query', {pageNum: 1, pageSize: 10, type: 'ACTIVITY_SHOW'}),
    ])
    res1.list.length > 0 && setBanner(res1.list[0].filePath)
    res2.list.length > 0 && setDemeanorList(res2.list.map(({filePath = '', name = '', id = ''}) => ({
      imgurl: filePath,
      title: name,
      id
    })))
  }, [])
  useEffect(() => {
    getData()
  }, [])
  return (
    <Layout>
      <div className={styles.home}>
        <img alt='' src={banner} className={styles.banner} />
        <div className={styles.entry}>
          {entryList.map((v) => (
            <div key={v.text}>
              <img src={v.icon} />
              <div>{v.text}</div>
            </div>
          ))}
        </div>
        <div className={styles.venueTitle}>活动风采</div>
        {demeanorList.map(v => <VenueCard key={v.title} data={v} />)}
      </div>
    </Layout>
  )
}
export default Home
