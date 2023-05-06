import $axios from "@/services/$axios";
import { baseUrl } from "@/constants/common.const";
import { CommonAxiosResponse, PAGINATION } from "./types";
import { urlEncode } from "@/utils/url";

// GET 获取列表
export function getPage(
  data: { userId: number; cashBackBusinessTypeId: number } & PAGINATION
): Promise<CommonAxiosResponse> {
  return $axios.get(
    `${baseUrl}/test?${urlEncode(data)}`
  );
}
