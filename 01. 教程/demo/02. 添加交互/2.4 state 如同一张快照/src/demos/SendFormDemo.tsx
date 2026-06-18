import { useState } from 'react';

function sendMessage(message: string) {
  // 模拟发送消息
  console.log('Sending message:', message);
}

export default function SendFormDemo() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');

  if (isSent) {
    return <h1>Your message is on its way!</h1>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSent(true);
        sendMessage(message);
      }}
    >
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
