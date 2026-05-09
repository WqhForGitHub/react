/**
 * 将 Props 传递给组件 —— 给 prop 指定默认值
 *
 * 如果你想在没有指定值的情况下给 prop 一个默认值，
 * 你可以通过在参数后面写 = 和默认值来进行解构：
 *
 * function Avatar({ person, size = 100 }) {}
 *
 * 默认值仅在缺少 size prop 或 size={undefined} 时生效。
 * 但是如果你传递了 size={null} 或 size={0}，默认值将不被使用。
 */
import { useState } from 'react'
import { getImageUrl } from '../utils'

interface Person {
  name: string
  imageId: string
}

interface AvatarWithDefaultProps {
  person: Person
  size?: number | null
}

function AvatarWithDefault({ person, size = 100 }: AvatarWithDefaultProps) {
  const resolved = size ?? undefined
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={resolved}
      height={resolved}
    />
  )
}

const PERSON: Person = { name: 'Lin Lanying', imageId: '1bX5QH6' }

type SizeMode = 'default' | 'custom' | 'undefined' | 'null' | 'zero'

const MODE_LABELS: Record<SizeMode, string> = {
  default: '不传 size（使用默认值 100）',
  custom: 'size=60（自定义值）',
  undefined: 'size={undefined}',
  null: 'size={null}',
  zero: 'size={0}',
}

export default function DefaultPropsDemo() {
  const [mode, setMode] = useState<SizeMode>('default')

  const sizeLabel = (() => {
    switch (mode) {
      case 'default': return '100 (默认值)'
      case 'custom': return '60'
      case 'undefined': return '100 (默认值)'
      case 'null': return 'null → 不渲染 width/height'
      case 'zero': return '0'
    }
  })()

  return (
    <div>
      <h3>给 prop 指定默认值</h3>
      <p>通过在参数后面写 <code>=</code> 和默认值来给 prop 指定默认值：</p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 8 }}>size 传值方式：</label>
        <select
          value={mode}
          onChange={e => setMode(e.target.value as SizeMode)}
          style={{ padding: '4px 8px', border: '1px solid var(--border)', borderRadius: 4, font: 'inherit' }}
        >
          {Object.entries(MODE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '16px 0' }}>
        {mode === 'default' && <AvatarWithDefault person={PERSON} />}
        {mode === 'custom' && <AvatarWithDefault person={PERSON} size={60} />}
        {mode === 'undefined' && <AvatarWithDefault person={PERSON} size={undefined} />}
        {mode === 'null' && <AvatarWithDefault person={PERSON} size={null} />}
        {mode === 'zero' && <AvatarWithDefault person={PERSON} size={0} />}
        <div>
          <div><strong>Lin Lanying</strong></div>
          <div style={{ fontSize: '0.85em', color: 'var(--text)' }}>
            实际渲染尺寸: {sizeLabel}
          </div>
        </div>
      </div>

      <div className="code-block">
{`function Avatar({ person, size = 100 }) {
  // 默认值仅在缺少 size 或 size={undefined} 时生效
  // size={null} 或 size={0} 时默认值不被使用
}

<Avatar
  person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}${mode === 'default' ? '' : `\n  size={${mode === 'custom' ? 60 : mode === 'null' ? 'null' : mode === 'zero' ? 0 : 'undefined'}}`}
/>`}
      </div>

      <div className="warning">
        <strong>注意：</strong>默认值仅在缺少 <code>size</code> prop 或 <code>size={'{undefined}'}</code> 时生效。如果你传递了 <code>size={'{null}'}</code> 或 <code>size={'{0}'}</code>，默认值将不被使用。
      </div>
    </div>
  )
}
