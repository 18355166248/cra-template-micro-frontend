import TableLayout from '@/components/TableLayout';
import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import ActionList from '@/components/ActionList';
import { useBalanceManageContext } from '../../index.context';
import { downloadCashBackBill } from '@/services/virtualAccount-services';
import { DownloadBillRequestVo } from '@/services/types';
import { notification } from 'antd';
// import DownloadLog from './DownloadLog';

interface Props {}

const Cash: FC<Props> = () => {
  const { cashList, filterParams, onCashTableChange } =
    useBalanceManageContext();

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
      title: '累积返现',
      dataIndex: 'accumulatedAmount',
      key: 'accumulatedAmount',
    },
    {
      title: '操作',
      fixed: 'right',
      render: (record: DownloadBillRequestVo) => {
        return (
          <ActionList
            columns={[
              {
                type: 'text',
                text: '下载',
                onClick: () => {
                  if (!filterParams.timeRange?.[0]) {
                    notification.error({
                      message: '返现时间不能为空',
                    });
                    return;
                  }

                  downloadCashBackBill({
                    ...record,
                    startCreateTime: filterParams.timeRange[0]?.format(
                      'YYYY-MM-DD HH:mm:ss'
                    ),
                    endCreateTime: filterParams.timeRange[1]?.format(
                      'YYYY-MM-DD HH:mm:ss'
                    ),
                  })
                    .then(() => {
                      notification.success({
                        message: '下载中，请至文件下载中心查看',
                      });
                    })
                    .catch(() => {
                      notification.error({
                        message: '请求下载失败, 请稍后重试',
                      });
                    });
                },
              },
            ]}
          />
        );
      },
    },
  ];

  function onTableChange(values: any) {
    onCashTableChange(values);
  }

  return (
    <>
      {/* <div className="mb-3 flex justify-end">
        <DownloadLog />
      </div> */}
      <TableLayout
        scroll={{ x: 'max-content' }}
        data={cashList.data}
        columns={columns}
        rowKey="id"
        loading={cashList.pending}
        pagination={cashList.pagination}
        onChange={onTableChange}
      />
    </>
  );
};

export default observer(Cash);
