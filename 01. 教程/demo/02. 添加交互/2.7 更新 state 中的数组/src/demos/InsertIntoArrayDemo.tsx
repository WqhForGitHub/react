/**
 * 向数组中插入元素
 *
 * 使用展开运算符和 slice() 将元素插入到特定位置。
 * 先展开插入点之前的切片，然后插入新元素，最后展开剩余部分。
 */
import { useState } from 'react'

interface Artist {
  id: number
  name: string
}

let nextId = 3

const initialArtists: Artist[] = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye' },
  { id: 2, name: 'Louise Nevelson' },
]

export default function InsertIntoArrayDemo() {
  const [name, setName] = useState('')
  const [artists, setArtists] = useState(initialArtists)

  function handleInsert() {
    if (!name.trim()) return
    const insertAt = 1
    const nextArtists = [
      ...artists.slice(0, insertAt),
      { id: nextId++, name: name.trim() },
      ...artists.slice(insertAt)
    ]
    setArtists(nextArtists)
    setName('')
  }

  function handleReset() {
    setArtists(initialArtists)
    nextId = 3
  }

  return (
    <div>
      <h3>向数组中插入元素</h3>
      <p>
        使用展开运算符和 <code>slice()</code> 将元素插入到特定位置（索引 1）：
        先展开插入点之前的切片，然后插入新元素，最后展开剩余部分。
      </p>
      <div className="demo-row">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="输入名称"
        />
        <button onClick={handleInsert}>
          插入到索引 1
        </button>
        <button onClick={handleReset}>重置</button>
      </div>
      <ul className="artist-list">
        {artists.map((artist, i) => (
          <li key={artist.id}>
            {artist.name}
            <span style={{ fontSize: '0.8em', color: 'var(--text)' }}>
              [{i}]
            </span>
          </li>
        ))}
      </ul>
      <pre className="code-block">{`const insertAt = 1
const nextArtists = [
  ...artists.slice(0, insertAt),
  `}<span className="highlight">{`{ id: nextId++, name }`}</span>{`,
  ...artists.slice(insertAt)
]`}</pre>
    </div>
  )
}
