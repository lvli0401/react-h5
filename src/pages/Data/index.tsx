import React, { useState } from 'react'
import Layout from '@/components/Layout'
import styles from './index.module.scss'
import { LeftOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import classnames from 'classnames'
import VenueReport from './components/venuesReport'
import ActivityReport from './components/activity'

const tabs = [
  {
    id: 1,
    name: '场馆预约数据报表',
  },
  {
    id: 2,
    name: '活动数据报表',
  },
]


const DataCenter: React.FC<Record<string, never>> = () => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const [curId, setCurId] = useState(1)
  const changeTabs = (id: number) => {
    setCurId(id)
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header} onClick={goBack}>
          <LeftOutline fontSize={16} />
          <span className={styles.title}>数据中心</span>
        </div>
        <div className={styles.tab}>
          {
            tabs.map(i => (
              <div
                className={classnames([
                  styles.tabItem,
                  curId === i.id ? styles.active : ''
                ])} key={i.id}
                onClick={() => changeTabs(i.id)}
              >
                {i.name}
              </div>
            ))
          }
        </div>
        {
          curId === 1 ? (
            <VenueReport />
          ) : <ActivityReport />
        }
      </div>
    </Layout>
  )
}

export default DataCenter