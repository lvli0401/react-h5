import storage from "./storage";
const config = {
  appid: 'wx858f95d036ff8738', // 测试公众号
  // appid: 'wxe5be0ea7c9f3ab15', // 南桥公众号id
};


interface genOauthConfig {
  appid: string;
}

/**
 * 获取重定位的 OAuth 路径
 * @returns {string}
 */
const generateOAuthUrl = (config: genOauthConfig) => {
  const [redirectUri] = window.location.href.split('#');

  const searchObj = {
    appid: config.appid,
    redirect_uri: encodeURIComponent(redirectUri),
    response_type: 'code',
    scope: 'snsapi_userinfo',
    state: 'A1',
  };

  const search = Object.entries(searchObj)
    .map((entry) => {
      const [key, value] = entry;
      return `${key}=${value}`;
    })
    .join('&');

  return `https://open.weixin.qq.com/connect/oauth2/authorize?${search}#wechat_redirect`;
};


const getQueryString = (name: string) => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}

/**
 * 判断当前网页是否需要重定向
 */
const checkRedirect = async () => {
  const codeExist = window.location.search.includes('code');
  // 判断是否需要重定向
  if (!codeExist) {
    window.location.replace(generateOAuthUrl(config));
  }
  const code = getQueryString('code');
  // const res = await getTokenByCode();
  // return res;

  const result = {
    accessToken: '',
    userInfoDTO: {
      "id": 1,
      "headPic": "123456",
      "wechatName": "syxyanc",
      "userType": 0,
      "createdAt": 1663492654622
    }
  }
  storage.set('accessToken', result.accessToken);
  storage.set('userInfo', result.userInfoDTO);
};

export {
  checkRedirect,
}