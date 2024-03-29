import TableLayout from '@/components/TableLayout';
import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useContractManageContext } from './ContractManage.context';
import ActionList from '@/components/ActionList';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TableContractManage: FC<Props> = () => {
  const {
    pagination,
    list,
    getList,
    onTableChange,
    setModalOption,
    openModalHandle,
  } = useContractManageContext();

  const columns = [
    {
      title: 'Demo',
      dataIndex: 'demo',
      key: 'demo',
      width: 100,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '操作',
      fixed: 'right',
      width: 100,
      render: (record: any) => {
        const actionList: any[] = [
          {
            type: 'text',
            text: '编辑',
            onClick: () => {
              setModalOption({
                initialValues: record,
                title: '编辑',
                type: 'edit',
              });
              openModalHandle();
            },
          },
          {
            type: 'text',
            text: '查看',
            onClick: () => {
              setModalOption({
                initialValues: record,
                title: '查看',
                type: 'detail',
              });
              openModalHandle();
            },
          },
        ];
        return <ActionList columns={actionList} />;
      },
    },
  ];

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableLayout
      scroll={{ x: 'max-content' }}
      data={list.data}
      columns={columns}
      rowKey="id"
      loading={list.pending}
      pagination={{ ...pagination, hideOnSinglePage: false }}
      onChange={onTableChange}
    />
  );
};

export default observer(TableContractManage);
