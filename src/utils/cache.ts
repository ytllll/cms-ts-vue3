class LocalCache {
  // 添加缓存
  setCache(key: string, value: any) {
    // 直接使用localStorage保存
    // value值要使用JSON转为字符串保存
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  // 获取缓存
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      // value可能是对象， 由JSON将obj => string => obj
      return JSON.parse(value)
    }
  }

  // 删除每个缓存
  deleteCahe(key: string) {
    window.localStorage.removeItem(key)
  }

  // 清空缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
