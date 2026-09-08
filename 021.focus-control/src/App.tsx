import { useRef, useState, type CSSProperties } from 'react';
import { SmartInput, type SmartInputHandle } from './components/SmartInput';

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 560,
  margin: '40px auto',
  padding: 24,
};

const card: CSSProperties = {
  padding: 24,
  borderRadius: 14,
  border: '1px solid #e2e8f0',
  background: '#fff',
  marginTop: 16,
};

const btn: CSSProperties = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: 8,
  background: '#2563eb',
  color: '#fff',
  cursor: 'pointer',
  fontSize: 14,
};

const ghostBtn: CSSProperties = {
  ...btn,
  background: '#f1f5f9',
  color: '#334155',
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14, lineHeight: 1.7 };

export default function App() {
  const usernameRef = useRef<SmartInputHandle>(null);
  const emailRef = useRef<SmartInputHandle>(null);
  const codeRef = useRef<SmartInputHandle>(null);
  const [result, setResult] = useState('');

  const submit = () => {
    const username = usernameRef.current?.getValue().trim() ?? '';
    const email = emailRef.current?.getValue().trim() ?? '';
    const code = codeRef.current?.getValue().trim() ?? '';

    if (!username) {
      usernameRef.current?.shake();
      usernameRef.current?.focus();
      setResult('用户名不能为空');
      return;
    }
    if (!email.includes('@')) {
      emailRef.current?.shake();
      emailRef.current?.focus();
      setResult('邮箱格式不正确');
      return;
    }
    if (!/^\d{4}$/.test(code)) {
      codeRef.current?.shake();
      codeRef.current?.focus();
      setResult('验证码是 4 位数字');
      return;
    }
    setResult(`提交成功：${username} / ${email}`);
  };

  return (
    <main style={page}>
      <h1>021 · ref 命令式控制</h1>
      <p style={muted}>
        SmartInput 是非受控组件；React 19 里 ref 可以直接作为 props 传入，
        useImperativeHandle 把 focus / clear / shake / getValue 这些命令式方法暴露给父组件
      </p>

      <section style={card}>
        <SmartInput ref={usernameRef} label="用户名" placeholder="如 react_fan" />
        <SmartInput ref={emailRef} label="邮箱" placeholder="you@example.com" />
        <SmartInput ref={codeRef} label="验证码" placeholder="4 位数字" maxLength={4} />

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button style={ghostBtn} onClick={() => usernameRef.current?.focus()}>
            聚焦用户名
          </button>
          <button style={ghostBtn} onClick={() => codeRef.current?.clear()}>
            清空验证码
          </button>
          <button style={ghostBtn} onClick={() => codeRef.current?.shake()}>
            抖动验证码
          </button>
          <button style={btn} onClick={submit}>
            提交
          </button>
        </div>

        {result && <p style={{ ...muted, marginTop: 12, marginBottom: 0 }}>{result}</p>}
      </section>
    </main>
  );
}
