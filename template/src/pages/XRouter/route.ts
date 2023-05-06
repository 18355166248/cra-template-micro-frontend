import { lazy, LazyExoticComponent } from 'react';

export interface Routes {
  name: string;
  path: string;
  component: LazyExoticComponent<any>;
}

const routes: Routes[] = [
  {
    name: '主播合同管理',
    path: '/contract',
    component: lazy(
      () =>
        import(
          /* webpackChunkName: "contract" */ '@/pages/ContractManage/indexContractManage'
        )
    ),
  },
];

export default routes;
