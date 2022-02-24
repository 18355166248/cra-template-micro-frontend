import React, { FC } from 'react';
import { Table } from 'antd';
import { formatWidth } from './table.untils';

interface Props {
  columns: any;
  data: any[];
  onChange?: (pagination: any) => void;
  pagination?: { current?: number; total: number } | boolean;
  loading?: boolean;
  rowKey?: string;
  scroll?: { x?: string | number | true; y?: number | string };
  size?: 'small' | 'middle' | 'large';
}

const defaultPagination = {
  hideOnSinglePage: true,
  showTotal: (total: number) => `共 ${total} 条`,
  showSizeChanger: false,
};

const TableLayout: FC<Props> = (props: Props) => {
  const {
    columns,
    data,
    pagination,
    onChange,
    loading,
    rowKey = 'id',
    scroll,
    size = 'middle',
  } = props;

  const [columnsFormat, maxWidth] = formatWidth(columns);

  return (
    <Table
      size={size}
      columns={columnsFormat}
      dataSource={data}
      pagination={
        typeof pagination === 'object'
          ? { ...defaultPagination, ...pagination }
          : false
      }
      rowKey={rowKey}
      onChange={onChange}
      loading={loading}
      scroll={{ ...{ x: maxWidth }, ...scroll }}
    />
  );
};

export default TableLayout;
