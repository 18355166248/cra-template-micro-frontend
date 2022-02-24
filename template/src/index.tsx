// 等价于 import 'react-app-polyfill/stable'（React 官方不常升级 core-js）。
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// 兼容支持到 IE9，如果不需要可删除。
import 'react-app-polyfill/ie9';
import './assets/styles/index.scss';
import './assets/styles/tailwind.css';
import './App.init';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import * as Sentry from '@sentry/react';
import App from './App';
import './public-path';
// import '@/mock';

// 本地编译不内嵌到主应用才需要加载这个css
const Externals = process.env.NO_EXTERNALS === 'true';
/* CSS Reset - Mobile & PC */
// eslint-disable-next-line global-require
Externals && require('@xmly/reset.css');

function render() {
  // {/* https://docs.sentry.io/platforms/javascript/guides/react/components/errorboundary/ */}
  // {/* https://github1s.com/getsentry/sentry-javascript/blob/HEAD/packages/react/src/errorboundary.tsx */}
  ReactDOM.render(
    <Sentry.ErrorBoundary>
      <App />
    </Sentry.ErrorBoundary>,
    document.getElementById('PaymenyOrderRoot')
  );
}

export async function bootstrap() {
  console.log('[React] app ROI bootstraped');
}

export async function mount(props: any) {
  console.log('[React] props from main framework', props);
  render();
}

export async function unmount(props: { container: any }) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector('#PaymenyOrderRoot')
      : document.querySelector('#PaymenyOrderRoot')
  );
}

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
