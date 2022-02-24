import React, { FC, useRef, useEffect, useState } from 'react';
import FilterFormLayout from '@/components/FilterFormLayout';
import TableLayout from '@/components/TableLayout';
import {
  getCashBackRecordOfRecharge,
  getCashBackRecordOfWithdraw,
  getCashBackBizTypeList,
} from '@/services/cashBackBill-services';
import useHttp from '@/hooks/useHttp';
import { Form, Select, InputNumber } from 'antd';
import { addIdToList } from '@/utils/service';
import XToolTip from '@/components/XToolTip';

interface Props {}

const CashQuery: FC<Props> = () => {
  const [data, setData] = useState([]);

  const formValuesRef = useRef<any>({});

  const paginationRef = useRef<{
    pageNo: number;
    pageSize: number;
    total: number;
  }>({ pageNo: 1, pageSize: 10, total: 0 });

  const rechargePaginationRef = useRef<{
    pageNo: number;
    pageSize: number;
    total: number;
  }>({ pageNo: 1, pageSize: 10, total: 0 });

  const [rechargeList, getRechargeList, rechargeStatus, resetRechargeList] =
    useHttp({
      fetchFn: getCashBackRecordOfRecharge,
      filterList: (rechargeList: any, res) => {
        rechargePaginationRef.current.total = res.totalSize;

        return addIdToList(rechargeList);
      },
    });

  const [withDrawList, getWithdrawList, withDrawStatus, resetWithdrawList] =
    useHttp({
      fetchFn: getCashBackRecordOfWithdraw,
      filterList: (withDrawList: any, res) => {
        paginationRef.current.total = res.totalSize;

        return addIdToList(withDrawList);
      },
    });

  useEffect(() => {
    getCashBackBizTypeList().then((res: any) => {
      setData(res.cashBackBusinessTypes);
    });
  }, []);

  function onOkClick() {
    getRechargeList({
      ...rechargePaginationRef.current,
      ...formValuesRef.current,
    });
    getWithdrawList({ ...paginationRef.current, ...formValuesRef.current });
  }

  function onOk() {
    return onOkClick();
  }

  function onReset() {
    paginationRef.current = { pageNo: 1, pageSize: 10, total: 0 };
    rechargePaginationRef.current = { pageNo: 1, pageSize: 10, total: 0 };
    resetRechargeList();
    resetWithdrawList();
  }

  function onValuesChange(values: any, formValues: any) {
    formValuesRef.current = formValues;
  }

  const rechargeColumns = [
    {
      title: 'UID',
      dataIndex: 'userId',
      key: 'userID',
    },
    {
      title: '订单号',
      dataIndex: 'merchantOrderNo',
      key: 'merchantOrderNo',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '业务类型',
      dataIndex: 'cashBackBusinessTypeIdDsc',
      key: 'cashBackBusinessTypeIdDsc',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '状态',
      dataIndex: 'statusIdDsc',
      key: 'statusIdDsc',
    },
  ];

  const withdrawColumns = [
    {
      title: 'UID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '订单号',
      dataIndex: 'merchantOrderNo',
      key: 'merchantOrderNo',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '业务类型',
      dataIndex: 'cashBackBusinessTypeIdDsc',
      key: 'cashBackBusinessTypeIdDsc',
    },
    {
      title: '状态',
      dataIndex: 'statusIdDsc',
      key: 'statusIdDsc',
    },
    {
      title: '失败原因',
      dataIndex: 'failedReason',
      key: 'failedReason',
      render: (value: string) => <XToolTip width={100}>{value}</XToolTip>,
    },
    {
      title: '返现提交时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '支付类型',
      dataIndex: 'payTypeDsc',
      key: 'payTypeDsc',
    },
    {
      title: '备注',
      dataIndex: 'context',
      key: 'context',
      render: (value: string) => <XToolTip width={150}>{value}</XToolTip>,
    },
  ];

  return (
    <div className="p-6">
      <FilterFormLayout
        onOk={onOk}
        onReset={onReset}
        onValuesChange={onValuesChange}
      >
        <Form.Item label="UID" name="userId" rules={[{ required: true }]}>
          <InputNumber
            placeholder="请输入UID"
            min={0}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="业务类型" name="cashBackBusinessTypeId">
          <Select showSearch>
            {data.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.desc}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </FilterFormLayout>

      <h3>返现记录：</h3>
      <TableLayout
        scroll={{ x: 'max-content' }}
        data={withDrawList}
        columns={withdrawColumns}
        rowKey="id"
        loading={rechargeStatus.pending}
        pagination={{
          ...paginationRef.current,
          current: paginationRef.current.pageNo,
        }}
        onChange={(pagi: any) => {
          paginationRef.current.pageNo = pagi.current;
          getWithdrawList({
            ...paginationRef.current,
            ...formValuesRef.current,
          });
        }}
      />

      <h3>充值记录：</h3>
      <TableLayout
        scroll={{ x: 'max-content' }}
        data={rechargeList}
        columns={rechargeColumns}
        loading={withDrawStatus.pending}
        pagination={{
          ...rechargePaginationRef.current,
          current: rechargePaginationRef.current.pageNo,
        }}
        onChange={(pagi: any) => {
          rechargePaginationRef.current.pageNo = pagi.current;
          getRechargeList({
            ...rechargePaginationRef.current,
            ...formValuesRef.current,
          });
        }}
      />
    </div>
  );
};

export default CashQuery;
