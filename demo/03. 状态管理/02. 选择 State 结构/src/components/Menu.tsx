import { useState } from 'react';

/**
 * 原则4：避免重复的 state
 * 不要在 state 中存储 selectedItem 对象（它与 items 中的某项重复），
 * 而是只存储 selectedId，在渲染期间通过 items.find() 获取 selectedItem。
 * 这样编辑 item 时，选中的项也会同步更新。
 */

interface Item {
  title: string;
  id: number;
}

const initialItems: Item[] = [
  { title: '椒盐卷饼', id: 0 },
  { title: '海苔脆片', id: 1 },
  { title: '燕麦棒', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  // 通过 ID 查找选中的项，而不是在 state 中存储整个对象
  const selectedItem = items.find((item) => item.id === selectedId);

  function handleItemChange(id: number, e: React.ChangeEvent<HTMLInputElement>) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, title: e.target.value };
        } else {
          return item;
        }
      })
    );
  }

  return (
    <>
      <h2>你的旅行零食是什么？</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: '8px' }}>
            <input
              value={item.title}
              onChange={(e) => handleItemChange(item.id, e)}
            />
            <button
              onClick={() => setSelectedId(item.id)}
              style={{ marginLeft: '8px' }}
            >
              选择
            </button>
          </li>
        ))}
      </ul>
      <p>
        你选择了：<b>{selectedItem?.title}</b>
      </p>
    </>
  );
}
