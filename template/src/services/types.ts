export interface ClientEnum {
  id: number;
  desc: string;
  payTypes?: ClientEnum[];
  cashBackBusinessTypes?: ClientEnum[];
}

export interface CommonAxiosReponse {
  demo: string;
}

export interface VirtualAccountRequestVo {
  businessClient?: number; // 业务方 ,
  cashBackBusinessTypeId?: number; // 返现业务类型 ,
  earlyWarningAmount?: string; // 预警值 ,
  payType?: number; // 支付类型
}

export interface RechargeRequestVo {
  businessClient: number; // 业务方 ,
  cashBackBusinessTypeId: number; // 返现业务类型 ,
  operator: string; // 操作人类型 ,
  payType: number; // 支付类型 ,
  rechargeAmount: string; // 充值金额
}

export interface DownloadBillRequestVo {
  businessClient: number; // 业务方 ,
  cashBackBusinessTypeId: number; // 返现业务类型 ,
  endCreateTime: string; // 结束时间 ,
  payType: number; // 支付类型 ,
  startCreateTime: string; // 开始时间
}

export interface BillDownloadRecordVo {
  billType: number; // 账单类型 ,
  businessClient: number; // 业务方 ,
  cashBackBusinessTypeId: number; // 返现业务类型 ,
  downloadStatus: number; // 文件下载状态 ,
  endTime: string; // 账单查询条件-结束时间 ,
  fileAddress: string; // 文件下载地址 ,
  fileStatus: number; // 文件生成状态 ,
  operator: string; // 操作人 ,
  opsId: string; // 操作opsId ,
  payType: number; // 支付类型 ,
  startTime: string; // 账单查询条件-开始时间
}

export interface CashBackSummaryRequestVo {
  businessClient: number; // 业务方 ,
  cashBackBusinessTypeId: number; // 返现业务类型 ,
  endCreateTime: string; // 结束时间 ,
  pageNo: number; // 页码 ,
  pageSize: number; // 分页大小 ,
  payType: number; // 支付类型 ,
  startCreateTime: string; // 开始时间
}

export interface CashBackRequestVo {
  userId: number; // 用户ID ,
  cashBackBusinessTypeId: number; // 业务方类型
}

export interface CashBackBusinessType {
  id: number; // 业务类型ID ,
  desc: string; // 业务类型描述
}

export interface CashBackBusinessResType {
  cashBackBusinessTypes: CashBackBusinessType[]; // 返现业务类型汇总
}
