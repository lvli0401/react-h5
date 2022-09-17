// 设置缓存
const storage = {
  /**
   * 设置缓存
   * @param maxAge 缓存时间（秒）
   * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
   */
  set(key: any, value: any, maxAge = null) {
    const temp = {
      expTime: 0,
      data: null,
    };
    if (maxAge) {
      let expTime = Date.now() + maxAge * 1000;
      temp.expTime = expTime;
    }
    temp.data = value;
    try {
      localStorage.setItem(key, JSON.stringify(temp));
    } catch (e) {
      console.log('设置缓存异常：', e);
    }
  },
  // 从本地缓存中同步获取指定 key 对应的内容。
  get(key: string) {
    try {
      const temp = JSON.parse(localStorage.getItem(key) || '');
      if (!temp) return null;
      // 判断是否有设置缓存时间
      if (temp.expTime && temp.expTime < Date.now()) {
        return null;
      }
      return temp.data;
    } catch (e) {
      console.log('获取缓存异常：', e);
    }
  },
  // 从本地缓存中同步移除指定 key。
  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.log('移除指定缓存异常：', e);
    }
  },
  // 同步清理本地数据缓存。
  clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.log('清除缓存异常：', e);
    }
  },
};

export default storage;
