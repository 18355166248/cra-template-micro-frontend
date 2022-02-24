/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 *
 * return URL参数字符串
 */
export const urlEncode = (param: any) => {
  if (!param) return '';
  let paramStr = '';

  Object.keys(param).map(key => {
    const value = param[key];
    if (value !== null && typeof value === 'object') {
      paramStr += `${paramStr === '' ? '' : '&'}${key}=${JSON.stringify(
        value
      )}`;
    } else if (value !== undefined) {
      paramStr += `${
        paramStr === '' ? '' : '&'
      }${key}=${window.encodeURIComponent(value)}`;
    }
  });
  return paramStr;
};
