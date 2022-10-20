import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.scss'
import Layout from '@components/Layout'
import { Link } from 'react-router-dom'
import { Button, InfiniteScroll } from 'antd-mobile'
import VenueCard from './components/venue-card'
import request from '@/apis/request'
import bookRecordIcon from '@images/img-预约记录@2x.png'
import venueIcon from '@images/img-场馆预约@2x.png'
import demeanorIcon from '@images/img-风采展示@2x.png'
import messageIcon from '@images/img-消息通知@2x.png'
import { useNavigate } from 'react-router-dom'
import { getUserType } from '@/apis/index'
import storage from '@utils/storage'

const Home: React.FC<Record<string, never>> = () => {
  const [banner, setBanner] = useState()
  const [hasMore, setHasMore] = useState(false)
  const [demeanorList, setDemeanorList] = useState<any[]>([])
  const [pageNum, setPageNum] = useState(1)
  const refDemeanorTitle = useRef<any>(null)
  const entryList = useMemo(() => ([
    {
      icon: bookRecordIcon,
      text: '预约记录',
      path: '/record'
    },
    {
      icon: venueIcon,
      text: '场馆预约',
      path: '/venuesInfo'
    },
    {
      icon: demeanorIcon,
      text: '风采展示',
      action: () => {
        refDemeanorTitle.current.scrollIntoView()
      }
    },
    {
      icon: messageIcon,
      text: '公告信息',
      action: () => {
        window.location.href = 'https://mp.weixin.qq.com/s/E0X7c6nW0WDDzBX3WhxN6g'
      }
    }
  ]), [refDemeanorTitle])
  const getData = useCallback(async () => {
    const [{ result: res1 }, { result: res2 }] = await Promise.all([
      request('post', '/nan_qiao/content/query', { pageNum: 1, pageSize: 10, type: 'BANNER' }),
      request('post', '/nan_qiao/content/query', { pageNum: 1, pageSize: 10, type: 'ACTIVITY_SHOW' }),
    ])
    res1.list.length > 0 && setBanner(res1.list[0].filePath)
    res2.list.length > 0 && setDemeanorList(res2.list.map(({ filePath = '', name = '', id = '' }) => ({
      imgurl: filePath,
      title: name,
      id
    })))
    setPageNum(2)
    if (res2.list.length > 0) setHasMore(true)
  }, [])
  const loadMore = useCallback(async () => {
    const { result: res } = await request('post', '/nan_qiao/content/query', { pageNum, pageSize: 10, type: 'ACTIVITY_SHOW' })
    if (res && res.list) setDemeanorList([...demeanorList, ...res.list.map(({ filePath = '', name = '', id = '' }) => ({
      imgurl: filePath,
      title: name,
      id
    }))])
    setPageNum(pageNum + 1)
    setHasMore(res.list.length > 0)
  }, [pageNum, demeanorList])

  const navigate = useNavigate()

  const goPage = (res: any) => {
    if (res.action) res.action()
    navigate(res.path)
  }

  const queryUserType = async () => {
    const { success, result } = await getUserType({})
    if (success) {
      storage.set('userInfo', result)
    }
  }
  useEffect(() => {
    queryUserType()
    getData()
  }, [])
  return (
    <Layout>
      <div className={styles.home}>
        <img src={banner} className={styles.banner} />
        <div className={styles.entry}>
          {entryList.map((v, index) => (
            <div key={index} onClick={() => {
              goPage(v)
            }}>
              <img src={v.icon} />
              <div>{v.text}</div>
            </div>
          ))}
        </div>
        <div ref={refDemeanorTitle} className={styles.venueTitle}>活动风采</div>
        {demeanorList.map((v, index) => <VenueCard key={index} data={v} />)}
        <InfiniteScroll className={styles.loadmore} loadMore={loadMore} hasMore={hasMore}>加载中...</InfiniteScroll>
      </div>
    </Layout>
  )
}
export default Home
