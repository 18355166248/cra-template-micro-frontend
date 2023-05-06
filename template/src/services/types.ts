export interface ClientEnum {
  id: number;
  desc: string;
  payTypes?: ClientEnum[];
  cashBackBusinessTypes?: ClientEnum[];
}

export interface CommonAxiosResponse {
  demo: string;
}

export interface PAGINATION {
  pageNo: number;
  pageSize: number;
}
