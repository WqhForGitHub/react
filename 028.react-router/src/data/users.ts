export interface UserProfile {
  id: number;
  name: string;
  role: string;
  bio: string;
  skills: string[];
}

export const users: UserProfile[] = [
  {
    id: 1,
    name: '陈晨',
    role: '前端工程师',
    bio: '热爱交互与渲染性能优化。',
    skills: ['React', 'TypeScript', 'Vite'],
  },
  {
    id: 2,
    name: '李雷',
    role: '全栈工程师',
    bio: '一个人就是一支队伍。',
    skills: ['Node.js', 'React', 'PostgreSQL'],
  },
  {
    id: 3,
    name: '韩梅',
    role: 'UI 设计师',
    bio: '像素眼晚期患者。',
    skills: ['Figma', '动效', '插画'],
  },
  {
    id: 4,
    name: '王浩',
    role: '算法工程师',
    bio: '炼丹但不熬夜。',
    skills: ['Python', 'PyTorch', 'LLM'],
  },
  {
    id: 5,
    name: '赵琳',
    role: '测试工程师',
    bio: 'bug 在我手里无处可逃。',
    skills: ['Vitest', 'Playwright', 'CI'],
  },
];
