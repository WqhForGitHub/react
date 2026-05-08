import { useState } from 'react';

/**
 * 原则2：避免互相矛盾的 state
 * isSending 和 isSent 不应同时为 true，所以用一个 status 变量代替它们。
 * status 可以取三种值：'typing' | 'sending' | 'sent'
 */

// 假装发送一条消息
function sendMessage(_text: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'typing' | 'sending' | 'sent'>('typing');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    await sendMessage(text);
    setStatus('sent');
  }

  const isSending = status === 'sending';
  const isSent = status === 'sent';

  if (isSent) {
    return <h1>感谢您的反馈！</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>您在"跃马客栈"的住宿体验如何？</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="请输入您的反馈..."
        style={{ width: '100%', minHeight: '80px', padding: '8px', boxSizing: 'border-box' }}
      />
      <br />
      <button disabled={isSending} type="submit" style={{ marginTop: '8px' }}>
        发送
      </button>
      {isSending && <p style={{ color: '#888' }}>正在发送...</p>}
    </form>
  );
}
