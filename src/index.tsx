import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import 'lib-flexible'
import routes, { RouteItem } from './router'
import Loading from './components/Loading'
import { checkRedirect } from '@utils/index'
import storage from '@utils/storage'

storage.set('userInfo', {
  createdAt:1665120592000,
  headPic:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ69aCsPxaSqlqd5ee1Q9CibZ43nwDibQzeLomQhZ5lYLVVpocibIMjHXkickRNXbAsBbib4jRGELjpW8Q/132',
  id:6,
  userType:1,
  wechatName:'銀八せんせい',
})
const isLogin = storage.get('userInfo')?.id
if (!isLogin) {
  checkRedirect()
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
const routerMap: (routes: Array<RouteItem>) => any = routes => {
  return routes.map(route =>
    !route.children?.length ? (
      route.redirect ? (
        route.index ? (
          <Route
            index
            key={route.path}
            element={<Navigate to={route.redirect} />}
          />
        ) : (
          <Route
            path={route.path}
            key={route.path}
            element={<Navigate to={route.redirect} />}
          />
        )
      ) : route.index ? (
        <Route index key={route.path} element={<route.component />} />
      ) : (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      )
    ) : (
      <Route key={route.path} path={route.path}>
        {routerMap(route.children)}
      </Route>
    )
  )
}
root.render(
  <Router>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<App />}>
          {routerMap(routes)}
        </Route>
      </Routes>
    </Suspense>
  </Router>
)
