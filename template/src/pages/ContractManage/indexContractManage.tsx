import React, { FC } from 'react';
import FilterForm from './FilterFormContractManage';
import ModalDialog from './ModalDialogContractManage';
import { ContractManageContext } from './ContractManage.context';
import { store } from './ContractManage.models';
import TableView from './TableContractManage';

// 主播合同管理
const ContractManage: FC = () => {
  return (
    <ContractManageContext.Provider value={store}>
      <div className="p-6 bg-white rounded-lg shadow-outer">
        {/* 过滤器 */}
        <FilterForm />
        {/* 表格 */}
        <TableView />
        {/* 新增弹窗 */}
        <ModalDialog />
      </div>
    </ContractManageContext.Provider>
  );
};

export default ContractManage;
