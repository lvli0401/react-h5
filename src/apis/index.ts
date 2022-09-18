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
const preFix = '47.100.31.167:8081';

export const testRequest = (params: TestProps = {}): AxiosPromise<ResponseData<UserInfo>> =>
  request("post", "http://expo.liufashi.top/type/getImg", params);

export const bookingRecord = (params: TestProps = {}): AxiosPromise<ResponseData<UserInfo>> =>
  request("post", "/nan_qiao/user_info/user_book_record", params);
