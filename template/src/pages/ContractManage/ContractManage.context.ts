import { createContext, useContext } from 'react';

const initState: any = {};

export const ContractManageContext = createContext(initState);

export const useContractManageContext = () =>
  useContext(ContractManageContext);
