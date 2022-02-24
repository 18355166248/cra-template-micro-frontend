import XModal from '@/components/Modal/XModal';
import SensitiveHidden from '@/components/SensitiveHidden';
import TableLayout from '@/components/TableLayout';
import XToolTip from '@/components/XToolTip';
import {
  ACCOUT_TYPE_ENUM,
  PayStatusEnum,
  RECEIVIONG_ACCOUT_TYPE_ENUM,
  SETTLE_AMOUNT_TYPE_ENUM,
} from '@/constants/Vocher.const';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useBalanceManageContext } from './index.context';

interface Props {}

const PaymentRecord: FC<Props> = () => {
  const { paymentRecordRef, paymentRecordData, clearPaymentRecord } =
    useBalanceManageContext();
  const columns = [
    {
      title: '付款流水',
      dataIndex: 'paymentBillRecordOrderNo',
      key: 'paymentBillRecordOrderNo',
      render: (value: string) => <XToolTip width={150}>{value}</XToolTip>,
    },
    {
      title: '付款金额',
      dataIndex: 'preTaxAmount',
      key: 'preTaxAmount',
    },
    {
      title: '税后金额',
      dataIndex: 'afterTaxAmount',
      key: 'afterTaxAmount',
    },
    {
      title: '付款状态',
      dataIndex: 'payStatus',
      key: 'payStatus',
      render: (value: number) => PayStatusEnum[value]?.text || '',
    },
    {
      title: '结算对象类型',
      dataIndex: 'receivingAccountType',
      key: 'receivingAccountType',
      render: (value: number) => RECEIVIONG_ACCOUT_TYPE_ENUM[value]?.text || '',
    },
    {
      title: '付款流水类型',
      dataIndex: 'settleAmountType',
      key: 'settleAmountType',
      render: (value: number) => SETTLE_AMOUNT_TYPE_ENUM[value]?.text || '',
    },
    {
      title: '付款主体',
      dataIndex: 'payOrgCode',
      key: 'payOrgCode',
      render: () => paymentRecordData.detail.payOrgCode,
    },
    {
      title: '收款主体信息', // 结算对象姓名、唯一标识
      dataIndex: 'accountName',
      key: 'accountName',
      render(
        value: string,
        record: { accountIdentity: string; accountType: number }
      ) {
        return (
          <div>
            <div>
              {ACCOUT_TYPE_ENUM[1].value === record.accountType ? (
                <SensitiveHidden text={value} type="name" />
              ) : (
                value
              )}
            </div>
            <div>
              <SensitiveHidden text={record.accountIdentity} type="number" />
            </div>
          </div>
        );
      },
    },
    {
      title: '收款账号信息', // 结算账号、结算对象类型
      dataIndex: 'receivingAccountNo',
      key: 'receivingAccountNo',
      render(value: string, record: any) {
        return (
          <div>
            <div>
              {RECEIVIONG_ACCOUT_TYPE_ENUM[record.receivingAccountType]?.text}
            </div>
            {/* 银行卡账号信息需脱敏 */}
            {/* 结算对象类型为UID 展示UID */}
            <div>
              {RECEIVIONG_ACCOUT_TYPE_ENUM[3].value ===
              record.receivingAccountType ? (
                <SensitiveHidden text={value} type="IDNumber" />
              ) : RECEIVIONG_ACCOUT_TYPE_ENUM[1].value ===
                record.receivingAccountType ? (
                record.beneficiaryUid
              ) : (
                <SensitiveHidden text={value} type="email" />
              )}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <XModal
      width={1060}
      title="付款记录"
      ctrlRef={paymentRecordRef}
      footer={null}
      onCancel={clearPaymentRecord}
    >
      <TableLayout
        scroll={{ x: 'max-content' }}
        size="small"
        data={paymentRecordData.data}
        columns={columns}
        rowKey="paymentBillRecordOrderNo"
        pagination={false}
        loading={paymentRecordData.pending}
      />
    </XModal>
  );
};

export default observer(PaymentRecord);
