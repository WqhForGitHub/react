import { useState } from 'react';

interface AddTaskProps {
  onAddTask: (text: string) => void;
}

export default function AddTask({ onAddTask }: AddTaskProps) {
  const [text, setText] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim() === '') return;
    onAddTask(text.trim());
    setText('');
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="添加任务..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">添加</button>
    </form>
  );
}
