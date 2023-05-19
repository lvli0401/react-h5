import request from './request'
import { AxiosPromise } from 'axios'
interface ResponseData<T = unknown> {
  code: number;
  data: T;
  msg: string;
  success: true | false;
}

//eggs:
interface UserInfo {
  username?: '';
}
interface TestProps {
  userId?: string;
}

export const testRequest = (
  params: TestProps = {}
): AxiosPromise<ResponseData<UserInfo>> =>
  request('post', 'http://expo.liufashi.top/type/getImg', params)
interface bookingRecordProps {
  userId?: string;
}
// 预约记录列表
export const bookingRecord = (
  params: bookingRecordProps = {}
): any =>
  request('post', '/nan_qiao/user_info/user_book_record', params)
// 场馆审核记录列表查询
export const venuesAuditList = (
  params: any = {}
): any =>
  request('post', '/nan_qiao/stadiumInfo/listAllOrderRecord', params)

// 场馆审核
export const doAuditVenue = (
  params: any = {}
): any =>
  request('post', '/nan_qiao/stadium/order/aduit', params)

// 场馆预约率
export const getQueryOrder = (
  params: any = {}
): any =>
  request('post', '/nan_qiao/data/stadium/queryOrder', params)

// 场馆
export const getQueryStadiumOrder = (
  params: any = {}
): any =>
  request('post', '/nan_qiao/data/stadium/queryStadiumOrder', params)
// 每年场馆预约率
export const queryHistoryOrder = (
  params: any = {}
): any =>
  request('post', '/nan_qiao/data/stadium/queryHistoryOrder', params)

export const stadiumInfoListAll = (
  params: any = {}
): any =>
  request('post', '/nan_qiao/stadiumInfo/listAll', params)

export const venuesOrder = (
  params: any = {}
): any =>
  request('post', '/nan_qiao/stadium/schedule/order', params)

// 订阅微信消息
export const orderWechatMessage = (url: string, params = {}): any => {
  console.log(url)
  request('get', url, params, {
    baseURL: 'https://mp.weixin.qq.com',
  })
}
  
interface tokenProps {
  code?: string;
}
interface tokenRes {
  accessToken?: '';
  userInfoDTO?: userINfoSubProps;
}
interface userINfoSubProps {
  id: number;
  headPic: string;
  wechatName: string;
  userType: number;
}
export const getTokenByCode = (
  params: tokenProps = {}
): any =>
  request('get', '/nan_qiao/wechat/code_for_token', params)

export const getUserType = (params?: any) =>
  request('post', '/nan_qiao/user_info/query', params)

