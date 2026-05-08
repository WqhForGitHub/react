import { useRef, useState } from 'react';

interface CatItem {
  id: number;
  imageUrl: string;
}

function setupCatList(): CatItem[] {
  const catCount = 10;
  const catList: CatItem[] = [];
  for (let i = 0; i < catCount; i++) {
    let imageUrl = '';
    if (i < 5) {
      imageUrl = 'https://placecats.com/neo/320/240';
    } else if (i < 8) {
      imageUrl = 'https://placecats.com/millie/320/240';
    } else {
      imageUrl = 'https://placecats.com/bella/320/240';
    }
    catList.push({ id: i, imageUrl });
  }
  return catList;
}

/**
 * 深入探讨：如何使用 ref 回调管理 ref 列表
 * 当列表项数量不固定时，不能在 map 中调用 useRef，
 * 而是使用 ref 回调函数维护一个 Map 来存储 DOM 节点引用
 */
export default function RefCallbackList() {
  const itemsRef = useRef<Map<CatItem, HTMLLIElement> | null>(null);
  const [catList] = useState<CatItem[]>(setupCatList);

  function getMap(): Map<CatItem, HTMLLIElement> {
    if (!itemsRef.current) {
      // 首次运行时初始化 Map
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  function scrollToCat(cat: CatItem) {
    const map = getMap();
    const node = map.get(cat);
    node?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }

  return (
    <div className="demo-card">
      <h3>使用 ref 回调管理 ref 列表</h3>
      <p>
        当列表项数量不固定时，不能在 map 中调用 useRef。
        使用 ref 回调函数维护一个 Map 来存储 DOM 节点引用。
      </p>
      <nav className="scroll-nav">
        <button onClick={() => scrollToCat(catList[0])}>Neo (第1只)</button>
        <button onClick={() => scrollToCat(catList[5])}>Millie (第6只)</button>
        <button onClick={() => scrollToCat(catList[8])}>Bella (第9只)</button>
      </nav>
      <div className="scroll-container">
        <ul className="scroll-list">
          {catList.map((cat) => (
            <li
              key={cat.id}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat, node);
                } else {
                  map.delete(cat);
                }
              }}
            >
              <img src={cat.imageUrl} alt={`Cat ${cat.id}`} />
            </li>
          ))}
        </ul>
      </div>
      <div className="code-hint">
        <code>{`ref={(node) => { map.set(cat, node); }`}</code>
      </div>
    </div>
  );
}
