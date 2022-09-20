import request from "./request";
import { AxiosPromise } from "axios";
interface ResponseData<T = unknown> {
  code: number;
  data: T;
  msg: string;
  success: true | false;
}

//eggs:
interface UserInfo {
  username?: "";
}
interface TestProps {
  userId?: string;
}

export const testRequest = (
  params: TestProps = {}
): AxiosPromise<ResponseData<UserInfo>> =>
  request("post", "http://expo.liufashi.top/type/getImg", params);
interface bookingRecordProps {
  openId?: string;
}
export const bookingRecord = (
  params: bookingRecordProps = {}
): AxiosPromise<ResponseData<UserInfo>> =>
  request("post", "/nan_qiao/user_info/user_book_record", params);

export const stadiumInfoListAll = (
  params: TestProps = {}
): AxiosPromise<ResponseData<UserInfo>> =>
  request("post", "/nan_qiao/stadiumInfo/listAll", params);
