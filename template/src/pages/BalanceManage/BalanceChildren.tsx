import { Tabs } from 'antd';
import React, { FC, useEffect } from 'react';
import FilterForm from './FilterForm';
import { useBalanceManageContext } from './index.context';
import Balance from './TabPages/Balance';
import Cash from './TabPages/Cash';

interface Props {}

const BalanceChildren: FC<Props> = () => {
  const { tabActivity, changeTabActivity, getBaseList, getList } =
    useBalanceManageContext();

  useEffect(() => {
    getBaseList();
    getList();
  }, []);

  return (
    <div className="p-6">
      <FilterForm />
      <Tabs
        defaultActiveKey={tabActivity}
        onChange={changeTabActivity}
        destroyInactiveTabPane
      >
        <Tabs.TabPane tab="余额管控" key="1">
          <Balance />
        </Tabs.TabPane>
        <Tabs.TabPane tab="返现明细" key="2">
          <Cash />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default BalanceChildren;
