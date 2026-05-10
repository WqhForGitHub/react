/**
 * 转换数组
 *
 * 如果想改变数组中的某些或全部元素，可以用 map() 创建一个新数组。
 * 传入 map 的函数决定了要根据每个元素的值或索引对元素做何处理。
 */
import { useState } from 'react'

interface Shape {
  id: number
  type: 'circle' | 'square'
  x: number
  y: number
}

const initialShapes: Shape[] = [
  { id: 0, type: 'circle', x: 50, y: 50 },
  { id: 1, type: 'square', x: 140, y: 50 },
  { id: 2, type: 'circle', x: 230, y: 50 },
]

export default function TransformArrayDemo() {
  const [shapes, setShapes] = useState(initialShapes)

  function handleClick() {
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') {
        return shape
      } else {
        return {
          ...shape,
          y: shape.y + 30
        }
      }
    })
    setShapes(nextShapes)
  }

  function handleReset() {
    setShapes(initialShapes)
  }

  return (
    <div>
      <h3>转换数组</h3>
      <p>
        使用 <code>map()</code> 创建一个新数组，只移动圆形而不影响正方形。
      </p>
      <div className="demo-row">
        <button onClick={handleClick}>
          所有圆形向下移动
        </button>
        <button onClick={handleReset}>重置</button>
      </div>
      <div className="shape-canvas">
        {shapes.map(shape => (
          <div
            key={shape.id}
            className={`shape ${shape.type}`}
            style={{
              left: shape.x,
              top: shape.y,
            }}
          />
        ))}
      </div>
      <pre className="code-block">{`const nextShapes = shapes.map(shape => {
  if (shape.type === "square") {
    return shape
  } else {
    return { `}<span className="highlight">...shape, y: shape.y + 30</span>{` }
  }
})`}</pre>
    </div>
  )
}
