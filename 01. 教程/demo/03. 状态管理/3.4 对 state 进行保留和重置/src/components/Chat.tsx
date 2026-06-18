import { useState } from 'react';

interface Contact {
  id: number;
  name: string;
  email: string;
}

interface ChatProps {
  contact: Contact;
}

export default function Chat({ contact }: ChatProps) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'跟 ' + contact.name + ' 聊一聊'}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>发送到 {contact.email}</button>
    </section>
  );
}

export type { Contact };
