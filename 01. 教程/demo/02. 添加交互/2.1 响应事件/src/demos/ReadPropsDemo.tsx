/**
 * 在事件处理函数中读取 props
 *
 * 由于事件处理函数声明于组件内部，因此它们可以直接访问组件的 props。
 */
interface AlertButtonProps {
  message: string
  children: React.ReactNode
}

function AlertButton({ message, children }: AlertButtonProps) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  )
}

export default function ReadPropsDemo() {
  return (
    <div>
      <h3>事件处理函数读取 props</h3>
      <p>AlertButton 组件通过 message prop 定制弹窗内容：</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <AlertButton message="正在播放！">
          播放电影
        </AlertButton>
        <AlertButton message="正在上传！">
          上传图片
        </AlertButton>
      </div>
    </div>
  )
}
