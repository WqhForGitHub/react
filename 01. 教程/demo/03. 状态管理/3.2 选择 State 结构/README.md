# 选择 State 结构

构建良好的 state 可以让组件变得易于修改和调试，而不会经常出错。

## 项目结构

```
src/
├── App.tsx                          # 主应用，Tab 导航切换 5 个 Demo
├── App.css                          # 应用样式
├── index.css                        # 全局样式
├── main.tsx                         # 入口
├── components/
│   ├── MovingDot.tsx                # 原则1：合并关联的 state
│   ├── FeedbackForm.tsx             # 原则2：避免互相矛盾的 state
│   ├── CheckInForm.tsx              # 原则3：避免冗余的 state
│   ├── Menu.tsx                     # 原则4：避免重复的 state
│   └── TravelPlan.tsx               # 原则5：避免深度嵌套的 state
└── data/
    └── places.ts                    # 旅行计划数据（扁平化表结构）
```

## 5 个 Demo 对应的原则

| Demo | 原则 | 核心要点 |
|------|------|---------|
| MovingDot | 合并关联的 state | `x` 和 `y` 总是一起更新，合并为 `{ x, y }` 对象 |
| FeedbackForm | 避免互相矛盾的 state | 用 `status: typing\|sending\|sent` 替代 `isSending` + `isSent` |
| CheckInForm | 避免冗余的 state | `fullName` 由 `firstName + lastName` 计算得出，不存入 state |
| Menu | 避免重复的 state | 只存 `selectedId`，通过 `items.find()` 获取选中项 |
| TravelPlan | 避免深度嵌套的 state | 树状结构扁平化为 ID 映射表，删除节点只需修改父级 `childIds` |

## 启动

```bash
npm run dev
```
