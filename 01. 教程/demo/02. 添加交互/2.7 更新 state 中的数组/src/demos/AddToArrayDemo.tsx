/**
 * 向数组中添加元素
 *
 * push() 会直接修改原始数组，在 React 中不应该这样做。
 * 应该使用展开语法 [...arr, newItem] 创建一个新数组，
 * 将原数组的所有元素加上新元素传入 state 的设置方法。
 */
import { useState } from 'react'

let nextId = 0

interface Artist {
  id: number
  name: string
}

export default function AddToArrayDemo() {
  const [name, setName] = useState('')
  const [artists, setArtists] = useState<Artist[]>([])

  return (
    <div>
      <h3>向数组中添加元素</h3>
      <p>
        使用 <code>[...arr, newItem]</code> 展开语法创建新数组来添加元素，
        而不是使用 <code>push()</code> 直接修改原数组。
      </p>
      <div className="demo-row">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="输入名称"
        />
        <button onClick={() => {
          if (!name.trim()) return
          setArtists([
            ...artists,
            { id: nextId++, name: name.trim() }
          ])
          setName('')
        }}>
          添加到末尾
        </button>
        <button onClick={() => {
          if (!name.trim()) return
          setArtists([
            { id: nextId++, name: name.trim() },
            ...artists
          ])
          setName('')
        }}>
          添加到开头
        </button>
      </div>
      {artists.length > 0 ? (
        <ul className="artist-list">
          {artists.map(artist => (
            <li key={artist.id}>{artist.name}</li>
          ))}
        </ul>
      ) : (
        <p className="empty-msg">列表为空，添加一些元素试试</p>
      )}
      <pre className="code-block">{`// 添加到末尾
setArtists([ `}<span className="highlight">...artists</span>{`, newItem ]

// 添加到开头
setArtists([ newItem, `}<span className="highlight">...artists</span>{` ]`}</pre>
    </div>
  )
}
