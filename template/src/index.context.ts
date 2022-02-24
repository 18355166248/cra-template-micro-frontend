import { createContext, useContext } from 'react';

const initState: any = {};

export const CommonContext = createContext(initState);

export const useCommonContext = () => useContext(CommonContext);
