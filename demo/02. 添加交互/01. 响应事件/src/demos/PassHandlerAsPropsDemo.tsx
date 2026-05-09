/**
 * 将事件处理函数作为 props 传递
 *
 * 通常在父组件中定义子组件的事件处理函数，并将其作为 prop 传递给子组件。
 * 不同位置的同一组件可以执行不同的功能。
 */
interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

function Button({ onClick, children }: ButtonProps) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

function PlayButton({ movieName }: { movieName: string }) {
  function handlePlayClick() {
    alert(`正在播放 ${movieName}`)
  }

  return (
    <Button onClick={handlePlayClick}>
      播放 &quot;{movieName}&quot;
    </Button>
  )
}

function UploadButton() {
  return (
    <Button onClick={() => alert('正在上传！')}>
      上传图片
    </Button>
  )
}

export default function PassHandlerAsPropsDemo() {
  return (
    <div>
      <h3>将事件处理函数作为 props 传递</h3>
      <p>PlayButton 和 UploadButton 各自将不同的 onClick 传入通用的 Button 组件：</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <PlayButton movieName="魔女宅急便" />
        <UploadButton />
      </div>
    </div>
  )
}
