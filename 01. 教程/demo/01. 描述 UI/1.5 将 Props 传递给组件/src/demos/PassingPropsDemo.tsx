/**
 * 将 Props 传递给组件 —— 向组件传递 props
 *
 * 分两步给组件传递 props：
 * 步骤1：将 props 传递给子组件
 * 步骤2：在子组件中读取 props
 *
 * Props 使你独立思考父组件和子组件。
 * 你可以将 props 想象成可以调整的"旋钮"——它们的作用与函数的参数相同。
 * 事实上，props 正是组件的唯一参数！
 */
import { useState } from 'react'
import { getImageUrl } from '../utils'

interface Person {
  name: string
  imageId: string
}

interface AvatarProps {
  person: Person
  size: number
}

function Avatar({ person, size }: AvatarProps) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  )
}

const PEOPLE: Person[] = [
  { name: 'Katsuko Saruhashi', imageId: 'YfeOqp2' },
  { name: 'Aklilu Lemma', imageId: 'OKS67lh' },
  { name: 'Lin Lanying', imageId: '1bX5QH6' },
]

const SIZES = [50, 80, 100, 150]

export default function PassingPropsDemo() {
  const [size, setSize] = useState(100)

  return (
    <div>
      <h3>向组件传递 props</h3>
      <p>你可以通过 <code>person</code> 和 <code>size</code> props 来自定义 <code>Avatar</code> 组件。试着调整大小：</p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 8 }}>Avatar size:</label>
        <select
          value={size}
          onChange={e => setSize(Number(e.target.value))}
          style={{ padding: '4px 8px', border: '1px solid var(--border)', borderRadius: 4, font: 'inherit' }}
        >
          {SIZES.map(s => (
            <option key={s} value={s}>{s}px</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap', margin: '16px 0' }}>
        {PEOPLE.map(person => (
          <div key={person.imageId} style={{ textAlign: 'center' }}>
            <Avatar person={person} size={size} />
            <div style={{ marginTop: 8, fontSize: '0.85em' }}>{person.name}</div>
          </div>
        ))}
      </div>

      <div className="code-block">
{`function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  )
}

<Avatar
  size={${size}}
  person={{ name: 'Katsuko Saruhashi', imageId: 'YfeOqp2' }}
/>`}
      </div>

      <div className="warning">
        <strong>注意：</strong>在声明 props 时，不要忘记 <code>(</code> 和 <code>)</code> 之间的一对花括号 <code>{'{}'}</code>：
        <br />
        <code>function Avatar{'({ person, size })'} {'{}'}</code>
        <br />
        这种语法被称为"解构"，等价于从函数参数中读取属性：
        <br />
        <code>function Avatar(props) {'{'} let person = props.person; let size = props.size; {'}'}</code>
      </div>
    </div>
  )
}
