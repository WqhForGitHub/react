/**
 * 更新数组内部的对象
 *
 * 数组中的对象并不是"位于"数组内部，数组只是指向它们。
 * 浅拷贝数组后，内部元素仍然与原数组共享。
 * 修改拷贝数组中的对象，实际上是在修改原始 state。
 * 正确做法：使用 map 创建新数组，同时拷贝要修改的对象。
 */
import { useState } from 'react'

interface Artwork {
  id: number
  title: string
  seen: boolean
}

const initialList: Artwork[] = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
]

export default function UpdateObjectsInArrayDemo() {
  const [myList, setMyList] = useState(initialList)
  const [yourList, setYourList] = useState(initialList)

  function handleToggleMyList(artworkId: number, nextSeen: boolean) {
    setMyList(myList.map(artwork => {
      if (artwork.id === artworkId) {
        return { ...artwork, seen: nextSeen }
      } else {
        return artwork
      }
    }))
  }

  function handleToggleYourList(artworkId: number, nextSeen: boolean) {
    setYourList(yourList.map(artwork => {
      if (artwork.id === artworkId) {
        return { ...artwork, seen: nextSeen }
      } else {
        return artwork
      }
    }))
  }

  function handleReset() {
    setMyList(initialList)
    setYourList(initialList)
  }

  return (
    <div>
      <h3>更新数组内部的对象</h3>
      <p>
        两个清单共享同一个初始 state。使用 <code>map</code> 和对象展开语法
        <code> {`{ ...artwork, seen: nextSeen }`}</code> 来同时创建新数组和新对象，
        避免直接修改 state。
      </p>
      <div className="bucket-section">
        <h3>我想看的艺术清单：</h3>
        <ItemList
          artworks={myList}
          onToggle={handleToggleMyList}
        />
      </div>
      <div className="bucket-section">
        <h3>你想看的艺术清单：</h3>
        <ItemList
          artworks={yourList}
          onToggle={handleToggleYourList}
        />
      </div>
      <button onClick={handleReset}>重置</button>
      <pre className="code-block">{`setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    return `}<span className="highlight">{`{ ...artwork, seen: nextSeen }`}</span>{`
  } else {
    return artwork
  }
}))`}</pre>
      <div className="tip-box">
        <strong>关键：</strong>即使拷贝了数组，你也不能直接修改其内部的元素。
        必须同时拷贝要修改的对象，使用 <code>{`{ ...obj, key: value }`}</code> 创建新对象。
        两个清单现在互不影响，勾选一个清单不会影响另一个。
      </div>
    </div>
  )
}

function ItemList({
  artworks,
  onToggle,
}: {
  artworks: Artwork[]
  onToggle: (id: number, nextSeen: boolean) => void
}) {
  return (
    <ul className="artwork-list">
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(artwork.id, e.target.checked)
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  )
}
