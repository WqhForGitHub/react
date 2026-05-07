import { useState } from 'react';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import { initialTasks } from '../types';

let nextId = 3;

export default function UseStateDemo() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text: string) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task: { id: number; text: string; done: boolean }) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId: number) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <div className="demo-section">
      <h2>useState 版本</h2>
      <p>
        每个事件处理程序都通过 <code>setTasks</code> 直接设置状态。
        当状态逻辑变复杂时，组件会变得臃肿。
      </p>
      <div className="demo-box">
        <h1>布拉格的行程安排</h1>
        <AddTask onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onChangeTask={handleChangeTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
      <div className="code-hint">
        <strong>问题：</strong>三个事件处理函数 <code>handleAddTask</code>、<code>handleChangeTask</code>、<code>handleDeleteTask</code>
        各自包含状态更新逻辑，随着组件迭代，逻辑会越来越分散。
      </div>
    </div>
  );
}
