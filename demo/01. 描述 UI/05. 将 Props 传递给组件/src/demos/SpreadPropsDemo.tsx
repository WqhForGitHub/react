/**
 * 将 Props 传递给组件 —— 使用 JSX 展开语法传递 props
 *
 * 有时候，传递 props 会变得非常重复。
 * 一些组件将它们所有的 props 转发给子组件，这时可以使用展开语法：
 *
 * <Avatar {...props} />
 *
 * 请克制地使用展开语法。
 */
import { useState } from 'react'
import { getImageUrl } from '../utils'

interface Person {
  name: string
  imageId: string
}

interface AvatarFullProps {
  person: Person
  size: number
  isSepia: boolean
  thickBorder: boolean
}

function AvatarFull({ person, size, isSepia, thickBorder }: AvatarFullProps) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
      style={{
        filter: isSepia ? 'sepia(0.8)' : undefined,
        border: thickBorder ? '4px solid var(--accent)' : undefined,
      }}
    />
  )
}

const PERSON: Person = { name: 'Katsuko Saruhashi', imageId: 'YfeOqp2' }

export default function SpreadPropsDemo() {
  const [useSpread, setUseSpread] = useState(false)
  const [isSepia, setIsSepia] = useState(false)
  const [thickBorder, setThickBorder] = useState(false)
  const [size, setSize] = useState(100)

  const avatarProps: AvatarFullProps = {
    person: PERSON,
    size,
    isSepia,
    thickBorder,
  }

  return (
    <div>
      <h3>使用 JSX 展开语法传递 props</h3>
      <p>有时候，传递 props 会变得非常重复。你可以使用展开语法 <code>{'...'}</code> 将所有 props 转发给子组件。</p>

      <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
          <input type="checkbox" checked={isSepia} onChange={e => setIsSepia(e.target.checked)} />
          isSepia
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
          <input type="checkbox" checked={thickBorder} onChange={e => setThickBorder(e.target.checked)} />
          thickBorder
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          size:
          <input
            type="range"
            min={50}
            max={150}
            value={size}
            onChange={e => setSize(Number(e.target.value))}
          />
          {size}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
          <input type="checkbox" checked={useSpread} onChange={e => setUseSpread(e.target.checked)} />
          使用展开语法
        </label>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '16px 0' }}>
        {useSpread ? (
          <AvatarFull {...avatarProps} />
        ) : (
          <AvatarFull
            person={avatarProps.person}
            size={avatarProps.size}
            isSepia={avatarProps.isSepia}
            thickBorder={avatarProps.thickBorder}
          />
        )}
        <span>Katsuko Saruhashi</span>
      </div>

      <div className="code-block">
{useSpread
  ? `function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  )
}`
  : `function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  )
}`}
      </div>

      <div className="warning">
        <strong>注意：</strong>请克制地使用展开语法。如果你在所有其他组件中都使用它，那就有问题了。通常，它表示你应该拆分组件，并将子组件作为 JSX 传递。
      </div>
    </div>
  )
}
