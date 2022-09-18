import { lazy } from 'react'
export interface RouteItem {
  path: string; //路径,当路由为index路由时path为父级的path
  component?: any; //懒加载组件
  index?: true | false; //是否为默认子路由,配置后不需要配置path属性
  redirect?: string; //重定向路由
  children?: Array<RouteItem>;
}
const routes: Array<RouteItem> = [
  {
    path: '/',
    redirect: 'home',
  },
  {
    path: 'home',
    component: lazy(() => import('@pages/Home')),
  },
  {
    path: 'data',
    component: lazy(() => import('@pages/Data')),
  },
  {
    path: 'user-center',
    component: lazy(() => import('@/pages/UserCenter')),
  },
  {
    path: 'venuesInfo',
    component: lazy(() => import('@/pages/VenuesInfo')),
  },
  {
    path: 'record',
    component: lazy(() => import('@/pages/Record')),
  },
  {
    path: 'venueBooking',
    component: lazy(() => import('@/pages/VenueBooking')),
  },
  {
    path: 'message',
    component: lazy(() => import('@/pages/Messages')),
  },
  {
    path: 'upload-activity',
    component: lazy(() => import('@/pages/UploadActivity')),
  },
  {
    path: 'signup-activity',
    component: lazy(() => import('@/pages/SignupDemeanor')),
  },
  {
    path: 'demeanor-info',
    component: lazy(() => import('@/pages/DemeanorInfo')),
  },
  {
    path: '*',
    component: lazy(() => import('@pages/Error/404')),
  },
]
export default routes
