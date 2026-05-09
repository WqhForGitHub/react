# 渲染列表

你可能经常需要通过 JavaScript 的数组方法来操作数组中的数据，从而将一个数据集渲染成多个相似的组件。在 React 中，可以使用 `filter()` 筛选需要渲染的组件，使用 `map()` 把数组转换成组件数组。

## 项目结构

```
07. 渲染列表/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── index.html
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── App.css
    ├── index.css
    ├── vite-env.d.ts
    ├── data.ts               -- Person 数据（5位科学家）
    ├── utils.ts              -- getImageUrl 工具函数
    └── demos/
        ├── RenderFromArrayDemo.tsx  -- 从数组中渲染数据
        ├── FilterListDemo.tsx      -- 对数组项进行过滤
        └── KeyListDemo.tsx         -- 用 key 保持列表项的顺序
```

## Demo 说明

| Tab | 文件 | 内容 |
|-----|------|------|
| 从数组中渲染数据 | `RenderFromArrayDemo.tsx` | 使用 `map()` 将字符串数组渲染为 `<li>` 列表，展示缺少 `key` 时的控制台警告 |
| 对数组项进行过滤 | `FilterListDemo.tsx` | 使用 `filter()` 筛选化学家，再用 `map()` 渲染带头像的人员卡片；包含箭头函数隐式/显式 return 的陷阱说明 |
| 用 key 保持列表项的顺序 | `KeyListDemo.tsx` | 为 `map()` 中的元素添加 `key={person.id}`，包含 key 的设定方式、需要满足的条件，以及使用索引/动态生成 key 的陷阱 |

## 启动

```bash
npm install
npm run dev
```
