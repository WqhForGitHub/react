import { useState, useRef } from 'react';

/**
 * 秒表示例 - ref 和 state 结合使用
 *
 * state: startTime、now — 用于渲染，显示经过的时间
 * ref: intervalRef — 存储 interval ID，仅事件处理器需要，不需要触发渲染
 *
 * 关键区别：
 * - 用于渲染的信息 → 保存在 state 中
 * - 仅被事件处理器需要、变更不需要重新渲染的信息 → 保存在 ref 中
 */
export default function Stopwatch() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    // 清除之前的 interval，防止重复启动
    clearInterval(intervalRef.current!);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current!);
  }

  function handleReset() {
    clearInterval(intervalRef.current!);
    setStartTime(null);
    setNow(null);
  }

  let secondsPassed = 0;
  if (startTime !== null && now !== null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <div className="demo-card">
      <h2>2. 秒表（ref + state 结合）</h2>
      <p className="description">
        <code>startTime</code> 和 <code>now</code> 保存在 <strong>state</strong> 中（用于渲染），
        <code>intervalRef</code> 保存在 <strong>ref</strong> 中（仅事件处理器需要，不触发渲染）。
      </p>
      <h1 className="stopwatch-time">时间过去了：{secondsPassed.toFixed(3)}</h1>
      <div className="button-group">
        <button onClick={handleStart}>开始</button>
        <button onClick={handleStop}>停止</button>
        <button onClick={handleReset}>重置</button>
      </div>
    </div>
  );
}
