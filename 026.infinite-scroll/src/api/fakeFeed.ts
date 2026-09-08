export interface FeedItem {
  id: number;
  title: string;
  author: string;
  summary: string;
  minutes: number;
}

const AUTHORS = ['陈晨', '李雷', '韩梅', '王浩', '赵琳'];
const TOPICS = ['React', 'TypeScript', 'Vite', 'CSS', 'Node.js', '性能优化', '工程化', '架构设计'];

export const PAGE_SIZE = 12;
export const TOTAL_PAGES = 12;
export const TOTAL_COUNT = PAGE_SIZE * TOTAL_PAGES;

export function fetchFeed(page: number): Promise<{ items: FeedItem[]; hasMore: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const baseId = (page - 1) * PAGE_SIZE;
      const items = Array.from({ length: PAGE_SIZE }, (_, i) => {
        const id = baseId + i + 1;
        const topic = TOPICS[id % TOPICS.length];
        return {
          id,
          title: `${topic} 的第 ${id} 篇精选`,
          author: AUTHORS[id % AUTHORS.length],
          summary: `关于 ${topic} 的实践总结，包含常见坑与对应的解决方案。`,
          minutes: (id % 12) + 1,
        };
      });
      resolve({ items, hasMore: page < TOTAL_PAGES });
    }, 700);
  });
}
