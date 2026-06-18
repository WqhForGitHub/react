import { useReducer } from 'react';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import { initialTasks } from '../types';
import tasksReducer from '../tasksReducer';

let nextId = 3;

export default function UseReducerDemo() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text: string) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task: { id: number; text: string; done: boolean }) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <div className="demo-section">
      <h2>useReducer 版本</h2>
      <p>
        事件处理程序只 dispatch action 描述 <strong>"发生了什么"</strong>，
        reducer 函数决定 <strong>"状态如何更新"</strong>。
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
        <strong>优势：</strong>事件处理程序变得简洁——只负责 dispatch action。
        状态更新逻辑集中在 <code>tasksReducer</code> 中，方便调试和测试。
      </div>
    </div>
  );
}
