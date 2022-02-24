import XModal from '@/components/Modal/XModal';
import TableLayout from '@/components/TableLayout';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useBalanceManageContext } from '../../index.context';

interface Props {}

const RechargeRecord: FC<Props> = () => {
  const { rechargeRecordRef, rechargeRecordData, setRechargeRecordPagination } =
    useBalanceManageContext();
  const columns = [
    {
      title: '充值金额',
      dataIndex: 'rechargeAmount',
      key: 'rechargeAmount',
    },
    {
      title: '充值时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '充值人员',
      dataIndex: 'operator',
      key: 'operator',
    },
  ];

  function onTableChange(pagination: any) {
    setRechargeRecordPagination(pagination);
  }

  return (
    <XModal
      width={600}
      title="充值明细"
      ctrlRef={rechargeRecordRef}
      footer={null}
    >
      <TableLayout
        scroll={{ x: 'max-content' }}
        size="small"
        data={rechargeRecordData.data}
        columns={columns}
        rowKey="id"
        pagination={rechargeRecordData.pagination}
        loading={rechargeRecordData.pending}
        onChange={onTableChange}
      />
    </XModal>
  );
};

export default observer(RechargeRecord);
