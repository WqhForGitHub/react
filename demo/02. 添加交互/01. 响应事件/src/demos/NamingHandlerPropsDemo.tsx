/**
 * 命名事件处理函数 prop
 *
 * 内置组件仅支持浏览器事件名称（如 onClick），但自定义组件可以按个人喜好命名事件处理函数 prop。
 * 按照惯例，事件处理函数 props 应该以 on 开头，后跟一个大写字母。
 */

// --- 示例 1：onSmash ---
interface SmashButtonProps {
  onSmash: () => void
  children: React.ReactNode
}

function SmashButton({ onSmash, children }: SmashButtonProps) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  )
}

// --- 示例 2：onPlayMovie / onUploadImage ---
interface ToolbarButtonProps {
  onClick: () => void
  children: React.ReactNode
}

function ToolbarButton({ onClick, children }: ToolbarButtonProps) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

interface ToolbarProps {
  onPlayMovie: () => void
  onUploadImage: () => void
}

function Toolbar({ onPlayMovie, onUploadImage }: ToolbarProps) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <ToolbarButton onClick={onPlayMovie}>
        播放电影
      </ToolbarButton>
      <ToolbarButton onClick={onUploadImage}>
        上传图片
      </ToolbarButton>
    </div>
  )
}

export default function NamingHandlerPropsDemo() {
  return (
    <div>
      <h3>自定义事件处理函数 prop 名称</h3>
      <p>自定义组件的 prop 名称可由你决定（如 onSmash），但浏览器内置标签仍需要 onClick：</p>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <SmashButton onSmash={() => alert('正在播放！')}>
          播放电影
        </SmashButton>
        <SmashButton onSmash={() => alert('正在上传！')}>
          上传图片
        </SmashButton>
      </div>

      <h3>根据应用程序交互命名</h3>
      <p>Toolbar 组件接收 onPlayMovie 和 onUploadImage，内部实现细节由 Toolbar 自己决定：</p>
      <Toolbar
        onPlayMovie={() => alert('正在播放！')}
        onUploadImage={() => alert('正在上传！')}
      />
    </div>
  )
}
