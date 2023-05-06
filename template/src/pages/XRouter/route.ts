import { lazy, LazyExoticComponent } from "react";

export interface Routes {
  name: string;
  path: string;
  component: LazyExoticComponent<any>;
}

const routes: Routes[] = [
  // {
  //   name: "菜单名",
  //   path: "/balanceManage", // 路由
  //   component: lazy(
  //     () =>
  //       import(/* webpackChunkName: "BalanceManage" */ "@/pages/BalanceManage")
  //   ), // 组件路径
  // },
];

export default routes;
