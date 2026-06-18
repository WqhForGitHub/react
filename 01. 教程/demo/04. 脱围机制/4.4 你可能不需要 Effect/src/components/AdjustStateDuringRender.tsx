import { useState } from "react";

interface Item {
  id: number;
  title: string;
}

// 🔴 避免：在 Effect 中调整部分 state
function ListBad({ items }: { items: Item[] }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState<Item | null>(null);

  // 🔴 当 prop 变化时，在 Effect 中调整 state
  // 实际代码：useEffect(() => { setSelection(null); }, [items]);
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }

  // 模拟 Effect 的延迟行为
  // 在实际 Effect 中，selection 会在下一次渲染才被清除
  const displaySelection = selection;

  return (
    <div className="demo-card bad">
      <h4>🔴 避免：在 Effect 中调整 state</h4>
      <div className="form-row">
        <label>
          <input
            type="checkbox"
            checked={isReverse}
            onChange={(e) => setIsReverse(e.target.checked)}
          />
          倒序排列
        </label>
      </div>
      <ul className="item-list">
        {(isReverse ? [...items].reverse() : items).map((item) => (
          <li
            key={item.id}
            onClick={() => setSelection(item)}
            className={displaySelection?.id === item.id ? "selected" : ""}
          >
            {item.title}
          </li>
        ))}
      </ul>
      <p className="hint">
        问题：items 变化时，组件先用旧的 selection 渲染，再通过 Effect 清除
      </p>
    </div>
  );
}

// ✅ 正确做法：在渲染期间计算所需内容，避免 "调整" state
function ListGood({ items }: { items: Item[] }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // ✅ 在渲染期间计算 selection，无需 Effect
  const selection = items.find((item) => item.id === selectedId) ?? null;

  return (
    <div className="demo-card good">
      <h4>✅ 正确：在渲染期间计算所需内容</h4>
      <div className="form-row">
        <label>
          <input
            type="checkbox"
            checked={isReverse}
            onChange={(e) => setIsReverse(e.target.checked)}
          />
          倒序排列
        </label>
      </div>
      <ul className="item-list">
        {(isReverse ? [...items].reverse() : items).map((item) => (
          <li
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={selection?.id === item.id ? "selected" : ""}
          >
            {item.title}
          </li>
        ))}
      </ul>
      <p className="hint">
        优势：存储选中项的 ID 而非整个对象，在渲染期间自动计算 selection。
        如果 ID 对应的项不存在，selection 自动为 null。
      </p>
    </div>
  );
}

const initialItems = [
  { id: 1, title: "苹果" },
  { id: 2, title: "香蕉" },
  { id: 3, title: "橙子" },
];

const alternativeItems = [
  { id: 4, title: "葡萄" },
  { id: 5, title: "西瓜" },
  { id: 6, title: "草莓" },
];

export default function AdjustStateDuringRender() {
  const [items, setItems] = useState(initialItems);
  const toggleItems = () => {
    setItems((prev) =>
      prev === initialItems ? alternativeItems : initialItems
    );
  };

  return (
    <div>
      <h3>4. 当 prop 变化时调整部分 state</h3>
      <p>
        优先考虑存储 ID 而非完整对象，在渲染期间计算。避免在 Effect 中调整
        state。
      </p>
      <button className="btn-small" onClick={toggleItems} style={{ marginBottom: "1rem" }}>
        切换列表（模拟 items prop 变化）
      </button>
      <div className="comparison">
        <ListBad items={items} />
        <ListGood items={items} />
      </div>
    </div>
  );
}
