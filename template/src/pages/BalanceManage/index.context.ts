import { createContext, useContext } from 'react';

const initState: any = {};

export const BalanceManageContext = createContext(initState);

export const useBalanceManageContext = () => useContext(BalanceManageContext);
