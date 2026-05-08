import { createContext, useContext, useReducer } from 'react';

// 定义 Task 类型
export interface Task {
  id: number;
  text: string;
  done: boolean;
}

// 定义 Action 类型
type TaskAction =
  | { type: 'added'; id: number; text: string }
  | { type: 'changed'; task: Task }
  | { type: 'deleted'; id: number };

// 创建 Context
const TasksContext = createContext<Task[] | null>(null);
const TasksDispatchContext = createContext<React.Dispatch<TaskAction> | null>(null);

// 初始任务数据
const initialTasks: Task[] = [
  { id: 0, text: 'Philosopher Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false },
];

// Reducer 函数
function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + (action as TaskAction).type);
    }
  }
}

// Provider 组件
export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        {children}
      </TasksDispatchContext>
    </TasksContext>
  );
}

// 自定义 Hook：读取 tasks
export function useTasks(): Task[] {
  const context = useContext(TasksContext);
  if (context === null) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}

// 自定义 Hook：获取 dispatch 函数
export function useTasksDispatch(): React.Dispatch<TaskAction> {
  const context = useContext(TasksDispatchContext);
  if (context === null) {
    throw new Error('useTasksDispatch must be used within a TasksProvider');
  }
  return context;
}
