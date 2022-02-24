import $axios from '@/services/$axios';
import { baseUrl, homeUrl } from '@/constants/comman.const';
import {
  CashBackSummaryRequestVo,
  CommonAxiosReponse,
  DownloadBillRequestVo,
  RechargeRequestVo,
  VirtualAccountRequestVo,
} from './types';
import { urlEncode } from '@/utils/url';
// import axios from 'axios';

// const CancelToken = axios.CancelToken;

// POST /api/v1 更新虚拟余额账户
export function updateOrUpdateVirtualBalance(
  data: VirtualAccountRequestVo
): Promise<CommonAxiosReponse> {
  return $axios.post(
    `${baseUrl}/virtualAccount/changeVirtualBalanceAccount`,
    data
  );
}

// 新增虚拟余额账户
export function createOrUpdateVirtualBalance(
  data: VirtualAccountRequestVo
): Promise<CommonAxiosReponse> {
  return $axios.post(
    `${baseUrl}/virtualAccount/insertVirtualBalanceAccount`,
    data
  );
}

// 查询虚拟余额列表
export function getVirtualBalanceAccount(
  data: VirtualAccountRequestVo
): Promise<CommonAxiosReponse> {
  return $axios.post(
    `${baseUrl}/virtualAccount/getVirtualBalanceAccount`,
    data
  );
}

interface PAGINATION {
  pageNo: number;
  pageSize: number;
}

// 查询充值记录 (查询明细)
export function getRechargeRecord(
  data: VirtualAccountRequestVo & PAGINATION
): Promise<CommonAxiosReponse> {
  return $axios.post(`${baseUrl}/virtualAccount/getRechargeRecord`, data);
}

// 充值虚拟账户
export function rechargeVirtualBalanceAccount(
  data: RechargeRequestVo
): Promise<CommonAxiosReponse> {
  return $axios.post(
    `${baseUrl}/virtualAccount/rechargeVirtualBalanceAccount`,
    data
  );
}

// 发起返现订单明细下载
export function downloadCashBackBill(
  data: DownloadBillRequestVo
): Promise<CommonAxiosReponse> {
  return $axios.post(`${baseUrl}/cashBackBill/downloadCashBackBill`, data);
}

// 获取下载文件记录
export function getDownloadCashBackBillRecord(
  data: {
    operator: string;
  } & PAGINATION
): Promise<CommonAxiosReponse> {
  return $axios.post(
    `${baseUrl}/cashBackBill/getDownloadCashBackBillRecord?${urlEncode(data)}`
  );
}

// 返现订单汇总
export function getSummaryCashBackBill(
  data: CashBackSummaryRequestVo
): Promise<CommonAxiosReponse> {
  return $axios.post(`${baseUrl}/cashBackBill/getSummaryCashBackBill`, data);
}

// 业务类型
export function getCashBackBizTypeName(): Promise<CommonAxiosReponse> {
  return $axios.get(`${baseUrl}/config/getCashBackBizTypeName`);
}

// 业务方
export function getClientName(): Promise<CommonAxiosReponse> {
  return $axios.get(`${baseUrl}/config/getClientName`);
}

// 支付类型
export function getPayTypeName(): Promise<CommonAxiosReponse> {
  return $axios.get(`${baseUrl}/config/getPayTypeName`);
}

// 获取opsId
export function getOpsId(): Promise<CommonAxiosReponse> {
  return $axios.get(`${homeUrl}/home/getOpsId`);
}

// 付款记录
// export function getPaymentRecord(
//   params: any,
//   get?: any
// ): Promise<CommonAxiosReponse> {
//   return $axios.get(`${baseUrl}/payment/getBillRecord`, {
//     params,
//     cancelToken: new CancelToken(function executor(c) {
//       // executor 函数接收一个 cancel 函数作为参数
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       get && (get.cancel = c);
//     }),
//   });
// }
