## 运行命令

```bash
yarn start              # 本地调试
yarn build              # 打包 & 生产环境代码
yarn build:analyze      # 打包生产环境代码 & 查看编译产物分析

yarn commit             # （推荐）交互式书写 commit message

# 云效发布
yarn build-test         # 打包 & 测试环境代码
yarn build-uat          # 打包 & UAT 环境代码
yarn build-prod         # 打包 & 生产环境代码

yarn test               # 运行测试

yarn release            # 根据 commit 提交，自动升级 version、生成 CHANGELOG.md
yarn release:patch      # 自动升级小版本号、生成 CHANGELOG.md
yarn release:minor      # 自动升级次版本号、生成 CHANGELOG.md
yarn release:major      # 自动升级主版本号、生成 CHANGELOG.md

# 推荐不要使用 eject，以便能够跟随 React 官方的脚步，随时在你的项目中升级 react-scripts
# 所有的 react-scripts & webpack 自定义配置，都可以在 craco.config.js 中扩展
# 如果使用了 eject，你需要自己处理 craco.config.js 中已经添加的各项扩展
yarn eject
```

## 目录

```bash
├── build/
├── public/
│
├── src
│   ├── assets                      # 公用静态资源
│   │     ├── images/                   # 公用图片
│   │     └── styles/                   # 全局公用样式
│   │
│   ├── components/
│   ├── constants/                  # 公用配置常量
|   ├── mock/                       # mock数据
│   ├── hooks/
│   ├── pages/
│   ├── services/                   # API
│   ├── utils
│   │     ├── origin                    # 封装自动根据编译环境生成 origin
│   │     │     ├── generate.ts             # 通用生成函数
│   │     │     └── index.ts                # 常量
│   │     ├── $axios.ts                 # axios 封装
│   │     └── env.ts                    # 编译环境相关封装
│   │
│   ├── App.init.ts                 # 提取应用初始化配置（Sentry、APM 等）
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.tsx
│   ├── react-app-env.d.ts          # 全局类型声明
│   ├── reportWebVitals.ts
│   ├── setupProxy.js               # 本地开发代理
│   └── setupTests.ts
│
├── .commitlintrc.js            # commitlint 配置
├── .env-cmdrc.js               # node 运行环境配置 & react-scripts 环境变量配置
├── .gitignore
├── craco.config.js             # craco 配置，覆盖 react-scripts & webpack 配置
├── package.json
├── README.md
├── tsconfig.edit.json
├── tsconfig.json
└── yarn.lock
```

## 微前端子应用

注意: 该项目已经改造成 qiankun 子应用 如果需要本地开发的话可以使用 npm run start-no-externals
