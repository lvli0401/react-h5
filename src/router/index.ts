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
    path: 'user',
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
    path: 'activity-audit',
    component: lazy(() => import('@/pages/ActivityAudit')),
  },
  {
    path: 'sign-activity',
    component: lazy(() => import('@/pages/SignActivity')),
  },
  {
    path: 'upload-demeanor',
    component: lazy(() => import('@/pages/UploadDemeanor')),
  },
  {
    path: 'generate-activity',
    component: lazy(() => import('@/pages/GenerateActivity')),
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
