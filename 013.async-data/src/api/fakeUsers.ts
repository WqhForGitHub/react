export interface User {
  id: number;
  name: string;
  email: string;
  city: string;
  color: string;
}

const seed: User[] = [
  { id: 1, name: '陈晨', email: 'chen@example.com', city: '杭州', color: '#6366f1' },
  { id: 2, name: '李雷', email: 'lei@example.com', city: '深圳', color: '#0ea5e9' },
  { id: 3, name: '韩梅', email: 'mei@example.com', city: '北京', color: '#f59e0b' },
  { id: 4, name: '王浩', email: 'hao@example.com', city: '上海', color: '#22c55e' },
  { id: 5, name: '赵琳', email: 'lin@example.com', city: '成都', color: '#ec4899' },
  { id: 6, name: '孙强', email: 'qiang@example.com', city: '广州', color: '#8b5cf6' },
];

export function fetchUsers(options: { delay?: number; failRate?: number } = {}): Promise<User[]> {
  const { delay = 1000, failRate = 0.25 } = options;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate) {
        reject(new Error('网络开小差了，请重试'));
        return;
      }
      resolve(seed);
    }, delay);
  });
}
