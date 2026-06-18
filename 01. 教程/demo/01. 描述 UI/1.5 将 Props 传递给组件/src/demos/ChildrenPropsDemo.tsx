/**
 * 将 Props 传递给组件 —— 将 JSX 作为子组件传递
 *
 * 当你将内容嵌套在 JSX 标签中时，
 * 父组件将在名为 children 的 prop 中接收到该内容。
 */
import { getImageUrl } from '../utils'

interface Person {
  name: string
  imageId: string
}

interface CardProps {
  children: React.ReactNode
}

function Card({ children }: CardProps) {
  return (
    <div className="card">
      {children}
    </div>
  )
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

export default function ChildrenPropsDemo() {
  return (
    <div>
      <h3>将 JSX 作为子组件传递</h3>
      <p>当你将内容嵌套在 JSX 标签中时，父组件将在名为 <code>children</code> 的 prop 中接收到该内容：</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '16px 0' }}>
        <Card>
          <Avatar
            size={100}
            person={{ name: 'Katsuko Saruhashi', imageId: 'YfeOqp2' }}
          />
        </Card>
        <Card>
          <Avatar
            size={80}
            person={{ name: 'Aklilu Lemma', imageId: 'OKS67lh' }}
          />
        </Card>
        <Card>
          <p style={{ margin: 0 }}>children 不一定是组件，也可以是任意 JSX 内容，比如这段文字！</p>
        </Card>
      </div>

      <div className="code-block">
{`function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  )
}

<Card>
  <Avatar
    size={100}
    person={{ name: 'Katsuko Saruhashi', imageId: 'YfeOqp2' }}
  />
</Card>`}
      </div>
    </div>
  )
}
