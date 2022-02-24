import axios, { AxiosRequestConfig } from 'axios';
import { domain } from '../utils/env';
import { notification } from 'antd';

const config: AxiosRequestConfig = {
  timeout: 20 * 1000, // 超时设置(单位毫秒)，无超时时间设置为 0。
  responseType: 'json', // 响应的数据格式：json/blob/document/arraybuffer/text/stream
  headers: {
    'X-Requested-With': 'XMLHttpRequest', // CAS 依靠此参数识别是否为 ajax 请求
    'Content-Type': 'application/json',
  },
};

const $axios = axios.create(config);

$axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  res => {
    if (res.data?.result === 'error') {
      res.data.errorMsg &&
        notification.error({
          key: res.data?.result,
          message: res.data.errorMsg,
        });
      return Promise.reject(res.data.errorMsg);
    }
    if (res.data?.ret !== '0') {
      res.data.msg &&
        notification.error({
          message: res.data.msg,
        });
      return Promise.reject(res.data.msg);
    }

    return res.data?.data;
  },
  error => {
    if (error?.response?.status === 401) {
      const url = `https://ops${domain}.ximalaya.com/business-cash-back-admin-web/home/login?redirect_uri=${encodeURIComponent(
        window.location.href
      )}`;
      window.location.replace(url);

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default $axios;
