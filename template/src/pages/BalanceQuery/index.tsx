import { FC, useState, useEffect } from 'react';
import TableLayout from '@/components/TableLayout';
import QueryForm from './QueryForm';
import {
  getCashBackProfitAccount,
  getCashBackBizTypeList,
} from '@/services/cashBackBill-services';
import {
  CashBackRequestVo,
  CashBackBusinessResType,
  CashBackBusinessType,
} from '@/services/types';
import { addIdToList } from '@/utils/service';

const BalanceQuery: FC = () => {
  const [data, setData] = useState<any>([]);
  const [allBusinessTypes, setAllBusinessTypes] = useState<
    CashBackBusinessType[]
  >([]);

  const onOkCallback = (cashBackRequstVo: CashBackRequestVo) => {
    getCashBackProfitAccount(cashBackRequstVo).then((res: any) => {
      const originData = [{ ...res, UID: cashBackRequstVo.userId }];
      setData(addIdToList(originData));
    });
  };

  const onResetCallback = () => {
    setData([]);
  };

  const columns = [
    {
      title: 'UID',
      dataIndex: 'UID',
      key: 'UID',
    },
    {
      title: '业务方',
      dataIndex: 'businessClientDsc',
      key: 'businessClientDsc',
    },
    {
      title: '业务类型',
      dataIndex: 'cashBackBusinessTypeDsc',
      key: 'cashBackBusinessTypeDsc',
    },
    {
      title: '清结算余额',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  useEffect(() => {
    getCashBackBizTypeList().then((res: CashBackBusinessResType) => {
      setAllBusinessTypes(res.cashBackBusinessTypes);
    });
  }, []);

  return (
    <div className="p-6">
      <QueryForm
        onOkCallback={onOkCallback}
        onResetCallback={onResetCallback}
        cashBackBusinessTypes={allBusinessTypes}
      />
      <TableLayout columns={columns} data={data} />
    </div>
  );
};

export default BalanceQuery;
