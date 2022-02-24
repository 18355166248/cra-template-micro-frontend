import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Popover, Table } from 'antd';
import { getDownloadCashBackBillRecord } from '@/services/virtualAccount-services';
import useHttp from '@/hooks/useHttp';
import { useCommonContext } from '@/index.context';
import { addIdToList } from '@/utils/service';

interface Props {}

const DownloadLog: FC<Props> = () => {
  const [visible, setVisible] = useState(false);
  const paginationRef = useRef<{
    pageNo: number;
    pageSize: number;
    total: number;
  }>({ pageNo: 1, pageSize: 10, total: 0 });

  const [list, getDownloadLogList, status] = useHttp({
    fetchFn: getDownloadCashBackBillRecord,
    filterList: (list: any, res) => {
      paginationRef.current.total = res.totalSize;

      return addIdToList(list);
    },
  });

  const { opsId } = useCommonContext();
  // const { clientEnumMap } = useBalanceManageContext();

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
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: '操作',
      render: (record: { fileStatus: number; fileAddress: string }) => {
        if (record.fileStatus !== 3) return null;
        return <a href={record.fileAddress}>打开</a>;
      },
    },
  ];

  useEffect(() => {
    visible &&
      opsId &&
      getDownloadLogList({ operator: opsId, ...paginationRef.current });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, opsId]);

  useEffect(() => {
    !visible && (paginationRef.current = { pageNo: 1, pageSize: 10, total: 0 });
  }, [visible]);

  function onVisibleChange(bool: any) {
    setVisible(bool);
  }

  return (
    <Popover
      placement="bottomRight"
      content={() => (
        <Table
          style={{ width: 800 }}
          columns={columns}
          dataSource={list}
          loading={status.pending}
          pagination={{
            ...paginationRef.current,
            current: paginationRef.current.pageNo,
          }}
          scroll={{ y: 500 }}
          onChange={(pagi: any) => {
            paginationRef.current.pageNo = pagi.current;
            getDownloadLogList({ operator: opsId, ...paginationRef.current });
          }}
          rowKey="id"
        />
      )}
      trigger="click"
      onVisibleChange={onVisibleChange}
    >
      <Button type="primary">下载记录</Button>
    </Popover>
  );
};

export default DownloadLog;
