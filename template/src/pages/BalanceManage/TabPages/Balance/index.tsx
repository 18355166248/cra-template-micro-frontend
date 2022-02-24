import TableLayout from '@/components/TableLayout';
import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import ActionList from '@/components/ActionList';
import { useBalanceManageContext } from '../../index.context';
import { Button } from 'antd';
import { VirtualAccountRequestVo } from '@/services/types';
import RechargeRecord from './RechargeRecord';
import RechargeRecordModal from './RechargeRecordModal';
import PayRecordModal from './PayRecordModal';
import { toJS } from 'mobx';

interface Props {}

const Balance: FC<Props> = () => {
  const {
    balanceList,
    onBanlanceTableChange,
    rechargeRecordRef,
    getRechargeRecordList,
    dummyModalRef,
    setDummyData,
    payModalRef,
    setPayData,
  } = useBalanceManageContext();

  const columns = [
    {
      title: '业务方',
      dataIndex: 'businessClientDsc',
      key: 'businessClientDsc',
    },
    {
      title: '业务类型',
      dataIndex: 'cashBackBusinessTypeIdDsc',
      key: 'cashBackBusinessTypeIdDsc',
    },
    {
      title: '返现类型',
      dataIndex: 'payTypeDsc',
      key: 'payTypeDsc',
    },
    {
      title: '可用余额',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: '预警值',
      dataIndex: 'earlyWarningAmount',
      key: 'earlyWarningAmount',
    },
    {
      title: '充值记录',
      key: 'payLog',
      render: (record: VirtualAccountRequestVo) => (
        <Button
          onClick={() => onView(record)}
          type="link"
          className="p0-important"
        >
          查看明细
        </Button>
      ),
    },
    {
      title: '操作',
      fixed: 'right',
      width: 100,
      render: (record: VirtualAccountRequestVo) => {
        return (
          <ActionList
            columns={[
              {
                type: 'text',
                text: '修改',
                onClick: () => {
                  edit(record);
                },
              },
              {
                type: 'text',
                text: '充值',
                onClick: () => {
                  pay(record);
                },
              },
            ]}
          />
        );
      },
    },
  ];

  function edit(record: VirtualAccountRequestVo) {
    setDummyData(record);
    dummyModalRef.current.open();
  }

  function pay(record: VirtualAccountRequestVo) {
    setPayData(record);
    payModalRef.current.open();
  }

  function onView(record: VirtualAccountRequestVo) {
    getRechargeRecordList(record);
    rechargeRecordRef.current.open();
  }

  function create() {
    setDummyData();
    dummyModalRef.current.open();
  }

  return (
    <>
      <div className="pb-3">
        <Button type="primary" onClick={create}>
          新增账户
        </Button>
      </div>
      <TableLayout
        scroll={{ x: 'max-content' }}
        data={toJS(balanceList.data)}
        columns={columns}
        rowKey="id"
        loading={balanceList.pending}
        pagination={balanceList.pagination}
        onChange={onBanlanceTableChange}
      />
      {/* 新增/更新 弹窗 */}
      <RechargeRecordModal />
      {/* 明细弹窗 */}
      <RechargeRecord />
      {/* 充值弹窗 */}
      <PayRecordModal />
    </>
  );
};

export default observer(Balance);
