import $axios from '@/services/$axios';
import { baseUrl } from '@/constants/comman.const';
import { CommonAxiosReponse, CashBackBusinessResType } from './types';
import { urlEncode } from '@/utils/url';

// GET /api/v1 获取返现充值记录
export function getCashBackRecordOfRecharge(
  data: { userId: number; cashBackBusinessTypeId: number } & PAGINATION
): Promise<CommonAxiosReponse> {
  return $axios.get(
    `${baseUrl}/cashBackBill/getCashBackRecordOfRecharge?${urlEncode(data)}`
  );
}

// 获取返现提现记录
export function getCashBackRecordOfWithdraw(
  data: { userId: number; cashBackBusinessTypeId: number } & PAGINATION
): Promise<CommonAxiosReponse> {
  return $axios.get(
    `${baseUrl}/cashBackBill/getCashBackRecordOfWithdraw?${urlEncode(data)}`
  );
}

// 支付侧账户余额
export function getCashBackProfitAccount(data: {
  userId: number;
  cashBackBusinessTypeId: number;
}): Promise<CommonAxiosReponse> {
  return $axios.get(
    `${baseUrl}/cashBackBill/getCashBackProfitAccount?${urlEncode(data)}`
  );
}

// 返现业务类型名称
export function getCashBackBizTypeList(): Promise<CashBackBusinessResType> {
  return $axios.get(`${baseUrl}/config/getCashBackBizTypeList`);
}

interface PAGINATION {
  pageNo: number;
  pageSize: number;
}
