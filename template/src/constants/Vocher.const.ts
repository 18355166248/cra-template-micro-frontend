interface ExecutionStatus {
  text: string;
  value: number;
}

type ENUM = Record<string, ExecutionStatus>;

// 执行状态 & 审核状态
// 1-待审核
// 2-付款处理中
// 3-付款成功
// 4-付款失败
const ExecutionStatusEnum: ENUM = {
  1: {
    text: '待审核',
    value: 1,
  },
  2: {
    text: '付款处理中',
    value: 2,
  },
  3: {
    text: '付款成功',
    value: 3,
  },
  4: {
    text: '付款失败',
    value: 4,
  },
};

// 付款状态 1:付款中  2: 付款成功  3: 付款失败
const PayStatusEnum: ENUM = {
  1: {
    text: '付款中',
    value: 1,
  },
  2: {
    text: '付款成功',
    value: 2,
  },
  3: {
    text: '付款失败',
    value: 3,
  },
};

// 生效状态
const VALID_STATUS_ENUM: ENUM = {
  1: {
    text: '正常',
    value: 1,
  },
  2: {
    text: '废弃',
    value: 2,
  },
};

// 单据来源
const SOURCE_TYPE_ENUM: ENUM = {
  1: {
    text: '合同结算条款',
    value: 1,
  },
  2: {
    text: '人工录入',
    value: 2,
  },
};

// 结算对象类型
const RECEIVIONG_ACCOUT_TYPE_ENUM: ENUM = {
  1: {
    text: 'UID',
    value: 1,
  },
  2: {
    text: '银行卡',
    value: 2,
  },
  3: {
    text: '支付宝',
    value: 3,
  },
};

// 结算对象性质
const ACCOUT_TYPE_ENUM: ENUM = {
  1: {
    text: '个人',
    value: 1,
  },
  2: {
    text: '机构',
    value: 2,
  },
};

// 金额类型
const SETTLE_AMOUNT_TYPE_ENUM: ENUM = {
  1: {
    text: '买断',
    value: 1,
  },
  2: {
    text: '合同保底',
    value: 2,
  },
  3: {
    text: '主播月薪',
    value: 3,
  },
  10: {
    text: '其他',
    value: 10,
  },
};

// 是否境外账户
const IsOverseasEnum = {
  1: {
    text: '境内',
    value: 1,
  },
  2: {
    text: '境外',
    value: 2,
  },
};

export {
  ExecutionStatusEnum,
  PayStatusEnum,
  VALID_STATUS_ENUM,
  SOURCE_TYPE_ENUM,
  RECEIVIONG_ACCOUT_TYPE_ENUM,
  ACCOUT_TYPE_ENUM,
  SETTLE_AMOUNT_TYPE_ENUM,
  IsOverseasEnum,
};
