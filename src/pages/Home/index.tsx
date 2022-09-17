import React from 'react'
import styles from './index.module.scss'
import Layout from '@components/Layout'
import { Link } from 'react-router-dom'
import { Button } from 'antd-mobile'
import VenueCard from './components/venue-card'
const entryList = [
  {
    icon: '',
    text: '预约记录',
  },
  {
    icon: '',
    text: '场馆预约',
  },
  {
    icon: '',
    text: '风采展示',
  },
  {
    icon: '',
    text: '公告信息',
  }
]
const venueList = [
  {
    imgurl: '',
    title: '羽毛球',
    link: ''
  },
  {
    imgurl: '',
    title: '篮球',
    link: ''
  },
  {
    imgurl: '',
    title: '足球',
    link: ''
  }
]
const Home: React.FC<Record<string, never>> = () => {
  return (
    <Layout>
      <div className={styles.home}>
        <img alt='' src='' className={styles.banner} />
        <div className={styles.entry}>
          {entryList.map((v) => (
            <div key={v.icon}>
              <img src={v.icon} />
              <div>{v.text}</div>
            </div>
          ))}
        </div>
        <div className={styles.venueTitle}>场馆信息</div>
        {venueList.map(v => <VenueCard key={v.link} data={v} />)}
      </div>
    </Layout>
  )
}
export default Home
