import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import imgHome from '@images/img-首页-默认@2x.png'
import imgHomeActive from '@images/img-首页-选中@2x.png'
import imgData from '@images/img-数据中心-默认@2x.png'
import imgDataActive from '@images/img-数据中心-选中@2x.png'
import imgMy from '@images/img-个人中心-默认@2x.png'
import imgMyActive from '@images/img-个人中心-选中@2x.png'
import cn from 'classnames'
import storage from '@/utils/storage'

const tabs = [
  {
    path: '/home',
    title: '首页',
    icon: imgHome,
    activeIcon: imgHomeActive,
  },
  {
    path: '/user',
    title: '个人中心',
    icon: imgMy,
    activeIcon: imgMyActive,
  },
]

const managerTabs = [
  {
    path: '/home',
    title: '首页',
    icon: imgHome,
    activeIcon: imgHomeActive,
  },
  {
    path: '/data',
    title: '数据中心',
    icon: imgData,
    activeIcon: imgDataActive,
  },
  {
    path: '/user',
    title: '个人中心',
    icon: imgMy,
    activeIcon: imgMyActive,
  },
]
const Layout: React.FC<any> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const [tabList, setTabs] = useState(tabs);

  useEffect(() => {
    if (storage.get('userInfo') && storage.get('userInfo').userType === 1) { // 管理员
      setTabs(managerTabs);
    }
  }, [storage.get('userInfo')]);

  const setRouteActive = (value: string) => {
    navigate(value, { replace: true })
  }

  return (
    <div className={styles.container}>
      {children}
      <div className={styles.nav}>
        {tabList.map(v =>
          <div key={v.path} className={cn({
            [styles.navItem]: true,
            [styles.navItemActive]: pathname === v.path,
          })} onClick={() => setRouteActive(v.path)}>
            <img src={pathname === v.path ? v.activeIcon : v.icon} />
            <span>{v.title}</span>
          </div>)}
      </div>
    </div>
  )
}

export default Layout
