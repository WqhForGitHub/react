import { useOnlineStatus } from '../hooks/useOnlineStatus';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}

export default function OnlineStatusDemo() {
  return (
    <div className="demo-section">
      <h2>useOnlineStatus - 在线状态</h2>
      <p>切换浏览器的网络状态来观察组件更新。两个组件共享状态逻辑，但各自拥有独立的状态。</p>
      <div className="demo-box">
        <StatusBar />
        <SaveButton />
      </div>
      <div className="code-hint">
        <strong>核心要点：</strong>自定义 Hook 共享的是状态逻辑，而不是状态本身。每次调用 Hook 都是独立的。
      </div>
    </div>
  );
}
