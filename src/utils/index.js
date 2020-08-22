/**
 * 为url添加新的参数
 * @param {Object} params 需要在url上添加的参数
 * @returns {String} 添加过参数的url
 */
export function urlAddParams (params) {
  const { origin, pathname, search, hash } = window.location;
  const str = (search === "" ? "?" : search + "&") + Object.keys(params).map(key => key + "=" + params[key]).join("&");
  return origin + pathname + str + hash;
}
//获取url参数
export function getQueryVariable (variable) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}
/**
 * 异步防抖函数
 * @param {function} promise 返回值为promise的函数
 */
export function promiseDebounce (promise) {
  let isLoading = false
  if (Object.prototype.toString.call(promise) !== '[object Function]') {
    return Promise.reject(new Error('入参非函数'))
  }
  return (...rest) => {
    if (isLoading) return
    isLoading = true
    return promise(...rest).finally(() => { isLoading = false })
  }
}
