import { useState, useEffect, useContext, createContext } from 'react';

const ThemeContext = createContext<'light' | 'dark'>('light');

// 模拟 POST 请求
function post(url: string) {
  console.log(`📤 POST 请求发送到 ${url}`);
}

// 模拟通知
function showNotification(message: string, theme: 'light' | 'dark') {
  console.log(`💬 通知 (${theme} 主题): ${message}`);
}

/**
 * Demo02: 这段代码应该移到事件处理程序中吗？
 * 展示特定交互逻辑应放在事件处理程序中，而非 Effect 中
 */

// ❌ 错误示例：Effect 中有特定事件的逻辑
function BadForm() {
  const [submitted, setSubmitted] = useState(false);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (submitted) {
      // 🔴 避免: Effect 中有特定事件的逻辑
      post('/api/register');
      showNotification('Successfully registered!', theme);
    }
  }, [submitted, theme]);

  return (
    <div style={{ border: '1px solid red', padding: '1rem', marginBottom: '1rem' }}>
      <h4>❌ 错误示例：使用 Effect 处理表单提交</h4>
      <p>切换主题会导致重复发送请求和通知！</p>
      <button onClick={() => setSubmitted(true)}>提交（Effect 方式）</button>
      {submitted && <p style={{ color: 'green' }}>已提交！</p>}
    </div>
  );
}

// ✅ 正确示例：在事件处理程序中处理特定交互
function GoodForm() {
  const theme = useContext(ThemeContext);

  function handleSubmit() {
    // ✅ 好：从事件处理程序调用特定于事件的逻辑
    post('/api/register');
    showNotification('Successfully registered!', theme);
  }

  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ border: '1px solid green', padding: '1rem' }}>
      <h4>✅ 正确示例：在事件处理程序中处理提交</h4>
      <p>切换主题不会导致重复请求！</p>
      <button
        onClick={() => {
          handleSubmit();
          setSubmitted(true);
        }}
      >
        提交（事件处理方式）
      </button>
      {submitted && <p style={{ color: 'green' }}>已提交！</p>}
    </div>
  );
}

export default function Demo02MoveToEventHandler() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          padding: '1rem',
          background: theme === 'dark' ? '#333' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
        }}
      >
        <h2>Demo 02: 代码应该移到事件处理程序中吗？</h2>
        <p>
          特定交互（如提交表单）的逻辑应放在事件处理程序中，而非 Effect 中。
          在 Effect 中处理会导致切换主题时重复执行。
        </p>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          切换主题（当前: {theme}）
        </button>
        <hr />
        <BadForm />
        <GoodForm />
      </div>
    </ThemeContext.Provider>
  );
}

