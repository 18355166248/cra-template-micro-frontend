// import * as Sentry from '@sentry/react';
import { apm } from '@xmly/xmrep';
import { isProd } from './utils/env';
import { name as projectName } from '../package.json';

// Sentry Project ☞ Client Keys DSN
// https://websentry.ximalaya.com/settings/xmly/projects/
// 一般在创建云效应用时，会看到自动创建 Sentry Project，可以看到 Client Keys DSN（否则，从上方链接去查找，若未创建可手动创建）
// const CLIENT_KEY: string =
//   'https://47c5f02063fe4da09a7fe241a69401b5@websentry.ximalaya.com/3819';

/**
 * Sentry
 *  - test/uat/production 均上报，方便提早发现问题。
 *  - Sentry React: https://docs.sentry.io/platforms/javascript/guides/react/
 */
// if (process.env.NODE_ENV === 'production' && !!CLIENT_KEY) {
//   Sentry.init({
//     dsn: CLIENT_KEY, // Client Keys DSN
//     environment: BUILD_ENV, // 区分上报环境
//     sampleRate: 0.1,
//     release: `${projectName}@${version}`,
//   });
// }

/**
 * APM 性能监控
 *  - https://thoughts.ximalaya.com/workspaces/5d679697f30f8700018aa32f/docs/5eddded3f4c0000001da3558
 */
if (isProd) {
  apm.init({
    name: projectName, // 云效项目名（通常应当与项目名称相同，如不一致，需修改）
  });
}
