import { useState } from 'react';
import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onChangeTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
}

export default function TaskList({ tasks, onChangeTask, onDeleteTask }: TaskListProps) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <TaskItem
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

interface TaskItemProps {
  task: Task;
  onChange: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

function TaskItem({ task, onChange, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function handleSave() {
    if (editText.trim() === '') return;
    onChange({ ...task, text: editText.trim() });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(task.text);
    setIsEditing(false);
  }

  function handleToggle() {
    onChange({ ...task, done: !task.done });
  }

  return (
    <div className="task-item-inner">
      <label className="task-checkbox">
        <input
          type="checkbox"
          checked={task.done}
          onChange={handleToggle}
        />
        {isEditing ? (
          <input
            className="task-edit-input"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            autoFocus
          />
        ) : (
          <span className={task.done ? 'task-text done' : 'task-text'}>
            {task.text}
          </span>
        )}
      </label>
      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="btn-save" onClick={handleSave}>保存</button>
            <button className="btn-cancel" onClick={handleCancel}>取消</button>
          </>
        ) : (
          <>
            <button className="btn-edit" onClick={() => setIsEditing(true)}>编辑</button>
            <button className="btn-delete" onClick={() => onDelete(task.id)}>删除</button>
          </>
        )}
      </div>
    </div>
  );
}
