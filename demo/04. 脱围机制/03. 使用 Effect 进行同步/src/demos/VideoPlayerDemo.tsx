import { useState, useRef, useEffect } from 'react';

/**
 * 视频播放器演示
 * 演示内容：
 * 1. 为什么不能在渲染期间调用 play()/pause()
 * 2. 使用 Effect 将 isPlaying prop 与 DOM API 同步
 * 3. 指定依赖数组避免不必要的 Effect 重新运行
 */
function VideoPlayer({ src, isPlaying }: { src: string; isPlaying: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('调用 video.play()');
      ref.current?.play();
    } else {
      console.log('调用 video.pause()');
      ref.current?.pause();
    }
  }, [isPlaying]); // 依赖数组：只在 isPlaying 变化时重新运行

  return <video ref={ref} src={src} loop playsInline />;
}

export default function VideoPlayerDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');

  return (
    <div className="demo-section">
      <h2>1. 视频播放器 — Effect 与依赖数组</h2>
      <p>
        使用 Effect 将 <code>isPlaying</code> state 与浏览器{' '}
        <code>&lt;video&gt;</code> 的 <code>play()</code>/<code>pause()</code>{' '}
        方法同步。依赖数组 <code>[isPlaying]</code> 确保只有在播放状态变化时才重新运行 Effect，输入框的输入不会触发 Effect。
      </p>

      <div className="demo-box">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入文字（不会触发 Effect）"
          className="text-input"
        />
        <button onClick={() => setIsPlaying(!isPlaying)} className="btn">
          {isPlaying ? '暂停' : '播放'}
        </button>
        <VideoPlayer
          isPlaying={isPlaying}
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        />
      </div>

      <div className="note">
        <strong>要点：</strong>
        <ul>
          <li>渲染期间不能调用 <code>play()</code>/<code>pause()</code>（DOM 可能还不存在，且渲染应该是纯粹的）</li>
          <li>Effect 在渲染提交到页面之后运行，此时 DOM 已更新</li>
          <li>依赖数组 <code>[isPlaying]</code> 让 React 跳过不必要的 Effect 执行</li>
          <li>输入框输入会触发重新渲染，但因为 isPlaying 没变，Effect 不会重新运行</li>
        </ul>
      </div>
    </div>
  );
}
