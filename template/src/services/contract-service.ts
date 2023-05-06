import $axios from '@/services/$axios';
import { baseUrl } from '@/constants/common.const';
import { CommonAxiosResponse, PAGINATION } from './types';
import { urlEncode } from '@/utils/url';

// GET
export function getPage(
  data: { userId: number; cashBackBusinessTypeId: number } & PAGINATION
): Promise<CommonAxiosResponse> {
  return $axios.get(
    `${baseUrl}/cashBackBill/getCashBackRecordOfRecharge?${urlEncode(data)}`
  );
}
