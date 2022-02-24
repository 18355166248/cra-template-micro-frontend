import { lazy, LazyExoticComponent } from 'react';

export interface Routes {
  name: string;
  path: string;
  component: LazyExoticComponent<any>;
}

const routes: Routes[] = [
  {
    name: '余额管理',
    path: '/balanceManage',
    component: lazy(
      () =>
        import(/* webpackChunkName: "BalanceManage" */ '@/pages/BalanceManage')
    ),
  },
  {
    name: '余额查询',
    path: '/balanceQuery',
    component: lazy(
      () =>
        import(/* webpackChunkName: "BalanceManage" */ '@/pages/BalanceQuery')
    ),
  },
  {
    name: '返现查询',
    path: '/cashQuery',
    component: lazy(
      () => import(/* webpackChunkName: "CashQuery" */ '@/pages/CashQuery')
    ),
  },
];

export default routes;
