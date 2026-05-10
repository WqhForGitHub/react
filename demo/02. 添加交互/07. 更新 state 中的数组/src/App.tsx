import { useState, type ComponentType } from 'react'
import './App.css'
import AddToArrayDemo from './demos/AddToArrayDemo'
import RemoveFromArrayDemo from './demos/RemoveFromArrayDemo'
import TransformArrayDemo from './demos/TransformArrayDemo'
import ReplaceInArrayDemo from './demos/ReplaceInArrayDemo'
import InsertIntoArrayDemo from './demos/InsertIntoArrayDemo'
import ReverseArrayDemo from './demos/ReverseArrayDemo'
import UpdateObjectsInArrayDemo from './demos/UpdateObjectsInArrayDemo'

interface DemoItem {
  key: string
  label: string
  component: ComponentType
  description: string
}

const DEMOS: DemoItem[] = [
  {
    key: 'add',
    label: '添加元素',
    component: AddToArrayDemo,
    description:
      '使用展开语法 [...arr, newItem] 创建新数组来添加元素，而不是使用 push() 直接修改原数组。',
  },
  {
    key: 'remove',
    label: '删除元素',
    component: RemoveFromArrayDemo,
    description:
      '使用 filter() 创建一个不包含该元素的新数组。filter 不会改变原始数组。',
  },
  {
    key: 'transform',
    label: '转换数组',
    component: TransformArrayDemo,
    description:
      '使用 map() 创建新数组，根据条件对部分元素进行变换，其他元素保持不变。',
  },
  {
    key: 'replace',
    label: '替换元素',
    component: ReplaceInArrayDemo,
    description:
      '使用 map() 和索引来替换特定位置的元素，而不是用 arr[i] = ... 直接赋值。',
  },
  {
    key: 'insert',
    label: '插入元素',
    component: InsertIntoArrayDemo,
    description:
      '使用展开运算符和 slice() 将元素插入到数组的特定位置。',
  },
  {
    key: 'reverse',
    label: '排序与翻转',
    component: ReverseArrayDemo,
    description:
      'reverse() 和 sort() 会改变原数组，可以先拷贝数组再操作。注意浅拷贝的限制。',
  },
  {
    key: 'update-objects',
    label: '更新内部对象',
    component: UpdateObjectsInArrayDemo,
    description:
      '更新数组内部的对象时，必须同时拷贝数组和要修改的对象，避免直接修改 state。',
  },
]

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key)
  const active = DEMOS.find(d => d.key === activeKey) ?? DEMOS[0]
  const ActiveComponent = active.component

  return (
    <div className="app">
      <h1>更新 state 中的数组</h1>
      <nav className="tab-bar">
        {DEMOS.map(d => (
          <button
            key={d.key}
            className={activeKey === d.key ? 'active' : ''}
            onClick={() => setActiveKey(d.key)}
          >
            {d.label}
          </button>
        ))}
      </nav>
      <div className="demo-section">
        <p>{active.description}</p>
        <div className="demo-box">
          <ActiveComponent />
        </div>
      </div>
    </div>
  )
}
