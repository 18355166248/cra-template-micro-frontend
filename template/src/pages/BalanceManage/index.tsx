import React, { FC } from 'react';
import BalanceChildren from './BalanceChildren';
import { BalanceManageContext } from './index.context';
import { store } from './index.models';

interface Props {}

const BalanceManage: FC<Props> = () => {
  return (
    <BalanceManageContext.Provider value={store}>
      <BalanceChildren />
    </BalanceManageContext.Provider>
  );
};

export default BalanceManage;
