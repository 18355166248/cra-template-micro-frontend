import { randomNum } from './utils';

const Mock = require('mockjs');

const initCash = (open: boolean = false) => {
  if (open) {
    Mock.setup({
      timeout: 400,
    });
    Mock.mock(/\/cashBackBill\/getSummaryCashBackBill/, (params: any) => {
      console.log('getSummaryCashBackBill params', params);
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
          accumulatedAmount: `${randomNum(50)}.00`,
          businessClient: randomNum(3),
          cashBackBusinessTypeId: randomNum(9),
          payType: randomNum(6),
        });
      }
      return res;
    });
  }
};

export default initCash;
