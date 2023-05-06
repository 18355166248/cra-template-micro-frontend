import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import XLayout from '@/pages/Xlayout';
import { BrowserRouter as Router } from 'react-router-dom';
import { CommonContext } from './index.context';
import Init from './Init';
import { common } from './index.models';

moment.locale('zh-cn');

const App: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <CommonContext.Provider value={common}>
        <Init>
          <Router basename="/gatekeeper/micro-salary-settle/salary">
            <XLayout />
          </Router>
        </Init>
      </CommonContext.Provider>
    </ConfigProvider>
  );
};

export default App;
