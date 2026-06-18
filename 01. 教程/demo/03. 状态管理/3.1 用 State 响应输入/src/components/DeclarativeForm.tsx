import { useState, type FormEvent, type ChangeEvent } from 'react';

function submitForm(answer: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (answer.toLowerCase() === 'lima') {
        resolve();
      } else {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      }
    }, 1500);
  });
}

export default function DeclarativeForm() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<'typing' | 'submitting' | 'success'>(
    'typing'
  );

  if (status === 'success') {
    return (
      <div className="declarative-form">
        <h3>声明式 UI（Declarative）</h3>
        <p className="description">
          只需声明你想要显示的内容，React 会通过计算得出该如何更新 UI。
        </p>
        <h1 style={{ color: '#16a34a' }}>That&apos;s right!</h1>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err as Error);
    }
  }

  function handleTextareaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value);
  }

  return (
    <div className="declarative-form">
      <h3>声明式 UI（Declarative）</h3>
      <p className="description">
        只需声明你想要显示的内容，React 会通过计算得出该如何更新 UI。
      </p>
      <h2>City quiz</h2>
      <p>In which city is there a billboard that turns air into drinkable water?</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button
          disabled={answer.length === 0 || status === 'submitting'}
        >
          Submit
        </button>
        {error !== null && <p className="Error">{error.message}</p>}
      </form>
      {status === 'submitting' && <p className="loading">Loading...</p>}
    </div>
  );
}
