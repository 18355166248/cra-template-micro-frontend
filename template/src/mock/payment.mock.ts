import { randomNum } from './utils';

const Mock = require('mockjs');

const initPayment = (open: boolean = false) => {
  if (open) {
    Mock.setup({
      timeout: 400,
    });
    Mock.mock(/\/virtualAccount\/getVirtualBalanceAccount/, (params: any) => {
      console.log('getVirtualBalanceAccount params', params);
      const res: any = {
        data: {
          data: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 3,
          totalSize: 30,
        },
        msg: 'string',
        ret: '0',
      };
      for (let i = 0; i < 11; i++) {
        res.data.data.push({
          id: i + 1,
          balance: `${randomNum(50)}.00`,
          businessClient: randomNum(3),
          cashBackBusinessTypeId: randomNum(10),
          earlyWarningAmount: `${randomNum(100)}.00`,
          payType: 5,
        });
      }
      return res;
    });

    Mock.mock(/\/virtualAccount\/getRechargeRecord/, (params: any) => {
      console.log('getRechargeRecord params', params);
      const res: any = {
        data: {
          data: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 3,
          totalSize: 30,
        },
        msg: 'string',
        ret: '0',
      };
      for (let i = 0; i < 10; i++) {
        res.data.data.push({
          id: i + 1,
          createTime: '2021-11-03 15:54:47',
          operator: `李梅芳${i}`,
          rechargeAmount: '1111',
        });
      }
      return res;
    });
  }
};

export default initPayment;
