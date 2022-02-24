import { ClientEnum, VirtualAccountRequestVo } from '@/services/types';
import {
  getCashBackBizTypeName,
  getRechargeRecord,
  getSummaryCashBackBill,
  getVirtualBalanceAccount,
} from '@/services/virtualAccount-services';
import { addIdToList } from '@/utils/service';
import { makeAutoObservable } from 'mobx';
import moment from 'moment';

interface Status {
  pending: boolean;
  success: boolean;
  error: boolean;
}

interface List extends Status {
  data: any[];
}

interface OrderModelsInterface {
  filterParams: any;
  balanceList: List;
  cashList: List;
  rechargeRecordRef: { current: any };
  rechargeRecordData: any;
  tabActivity: string;
  viewRechargeRecordData: VirtualAccountRequestVo; // 充值明细请求参数
  dummyModalRef: { current: any };
  payModalRef: { current: any };
  dummyData: VirtualAccountRequestVo;
  payData: VirtualAccountRequestVo;
}

interface DataInterface {
  pending: boolean;
  success: boolean;
  error: boolean;
  data: any[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
}

class OrderModels implements OrderModelsInterface {
  filterParams: any;
  filterForm: any;

  balanceList: DataInterface = {
    pending: false,
    success: false,
    error: false,
    data: [],
    pagination: { current: 1, pageSize: 10, total: 0 },
  };
  clientEnumMap: Record<string, ClientEnum[]> = { businessClients: [] };

  cashList: DataInterface = {
    pending: false,
    success: false,
    error: false,
    data: [],
    pagination: { current: 1, pageSize: 10, total: 0 },
  };
  tabActivity = '1';

  dummyModalRef = { current: null }; // 新增/编辑 虚拟账户
  dummyData = {};

  viewRechargeRecordData = {};
  rechargeRecordRef = { current: null }; // 充值明细 弹窗
  rechargeRecordData: DataInterface = {
    pending: false,
    success: false,
    error: false,
    data: [],
    pagination: { current: 1, pageSize: 10, total: 0 },
  }; // 充值明细 数据

  payModalRef = { current: null }; // 充值界面
  payData = {};

  constructor() {
    makeAutoObservable(this);
    this.filterParams = {};
  }

  changeTabActivity = (key: string) => {
    this.tabActivity = key;
    this.filterForm.resetFields();
    // 修改过滤器默认值
    if (this.isTwo()) {
      this.filterParams = {
        timeRange: [moment().startOf('month'), moment().endOf('day')],
      };
      this.cashList = {
        pending: false,
        success: false,
        error: false,
        data: [],
        pagination: { current: 1, pageSize: 10, total: 0 },
      };
    } else {
      this.filterParams = {};
      this.balanceList = {
        pending: false,
        success: false,
        error: false,
        data: [],
        pagination: { current: 1, pageSize: 10, total: 0 },
      };
      this.getList();
    }
  };

  setFilterForm = (form: any) => {
    this.filterForm = form;
  };

  // 设置过滤器表单数据
  setFilterParams = (allValues: any) => {
    this.filterParams = allValues;
  };

  // 设置修改弹窗的dummyData
  setDummyData = (data: VirtualAccountRequestVo = {}) => {
    this.dummyData = data;
  };

  setPayData = (data: VirtualAccountRequestVo = {}) => {
    this.payData = data;
  };

  setRechargeRecordPagination = (pagination: any) => {
    this.rechargeRecordData.pagination = pagination;
    this.getRechargeRecordList(this.viewRechargeRecordData);
  };

  // 获取业务方列表 获取业务类型列表 获取返现类型列表
  getBaseList = () => {
    getCashBackBizTypeName().then(res => {
      this.clientEnumMap = res as any;
    });
  };

  // tabActivity=1 表示余额列表  = 2 表示返现明细列表
  getList = () => {
    if (this.tabActivity === '1') {
      this.getBanlanceList();
    } else if (this.tabActivity === '2') {
      this.getCashList();
    } else {
      throw new Error('错误的 Tab tabActivity 值');
    }
  };

  // 获取余额管控列表
  getBanlanceList = () => {
    this.balanceList.pending = true;
    getVirtualBalanceAccount({
      ...this.filterParams,
      pageNo: this.balanceList.pagination.current,
      pageSize: this.balanceList.pagination.pageSize,
    })
      .then((res: any) => {
        this.balanceList = {
          data: addIdToList(res.data),
          pending: false,
          success: true,
          error: false,
          pagination: {
            ...this.balanceList.pagination,
            total: res.totalSize,
          },
        };
      })
      .catch(() => {
        this.balanceList.error = true;
        this.balanceList.pending = false;
      });
  };

  // 获取返现明细列表
  getCashList = () => {
    this.cashList.pending = true;
    getSummaryCashBackBill({
      ...this.filterParams,
      pageNo: this.cashList.pagination.current,
      pageSize: this.cashList.pagination.pageSize,
      startCreateTime: this.filterParams.timeRange[0]?.format(
        'YYYY-MM-DD HH:mm:ss'
      ),
      endCreateTime: this.filterParams.timeRange[1]?.format(
        'YYYY-MM-DD HH:mm:ss'
      ),
    })
      .then((res: any) => {
        this.cashList = {
          data: addIdToList(res.data),
          pending: false,
          success: true,
          error: false,
          pagination: {
            ...this.cashList.pagination,
            total: res.totalSize,
          },
        };
      })
      .catch(() => {
        this.cashList.error = true;
        this.cashList.pending = false;
      });
  };

  onBanlanceTableChange = ({ current }: { current: number }) => {
    this.balanceList.pagination.current = current;
    this.getList();
  };

  onCashTableChange = ({ current }: { current: number }) => {
    this.cashList.pagination.current = current;
    this.getList();
  };

  // 充值明细列表 (分页)
  getRechargeRecordList = (data: VirtualAccountRequestVo) => {
    this.viewRechargeRecordData = data;
    this.rechargeRecordData.pending = true;
    getRechargeRecord({
      ...data,
      pageNo: this.rechargeRecordData.pagination.current,
      pageSize: this.rechargeRecordData.pagination.pageSize,
    })
      .then((res: any) => {
        this.rechargeRecordData = {
          data: addIdToList(res.data),
          pending: false,
          success: true,
          error: false,
          pagination: {
            ...this.rechargeRecordData.pagination,
            total: res.totalSize,
          },
        };
      })
      .catch(() => {
        this.rechargeRecordData.error = true;
        this.rechargeRecordData.pending = false;
      });
  };

  // 重置过滤器
  reset = () => {
    this.filterParams = {};
    this.balanceList = {
      pending: false,
      success: false,
      error: false,
      data: [],
      pagination: { current: 1, pageSize: 10, total: 0 },
    };
    this.getList();
  };

  isTwo = () => {
    return this.tabActivity === '2';
  };

  resetDummyData = () => {
    this.dummyData = {};
  };
}

export const store = new OrderModels();
