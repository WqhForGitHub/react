/**
 * 从数组中删除元素
 *
 * 从数组中删除一个元素最简单的方法就是将它过滤出去。
 * 使用 filter() 创建一个不包含该元素的新数组。
 * filter 不会改变原始数组。
 */
import { useState } from 'react'

interface Artist {
  id: number
  name: string
}

const initialArtists: Artist[] = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye' },
  { id: 2, name: 'Louise Nevelson' },
]

export default function RemoveFromArrayDemo() {
  const [artists, setArtists] = useState(initialArtists)

  return (
    <div>
      <h3>从数组中删除元素</h3>
      <p>
        使用 <code>filter()</code> 创建一个不包含该元素的新数组。
        <code>filter</code> 不会改变原始数组，而是返回一个全新的数组。
      </p>
      <ul className="artist-list">
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}
            <button
              className="delete-btn"
              onClick={() => {
                setArtists(
                  artists.filter(a => a.id !== artist.id)
                )
              }}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
      {artists.length === 0 && (
        <p className="empty-msg">所有元素已删除</p>
      )}
      <pre className="code-block">{`setArtists(
  artists.filter(a => `}<span className="highlight">a.id !== artist.id</span>{`)
)

// 创建一个新数组，该数组由那些 ID 不同的元素组成`}</pre>
    </div>
  )
}
