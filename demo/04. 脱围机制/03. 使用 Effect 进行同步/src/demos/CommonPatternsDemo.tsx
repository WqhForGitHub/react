import { useState, useEffect, useRef } from 'react';

// ========== 1. 管理非 React 小部件 ==========
function MapWidget() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    // 模拟地图组件的 setZoomLevel 调用
    const el = mapRef.current;
    if (el) {
      el.style.transform = `scale(${zoomLevel})`;
      el.textContent = `地图 (缩放: ${zoomLevel}x)`;
    }
  }, [zoomLevel]); // 不需要清理，重复设置相同值无影响

  return (
    <div>
      <label>
        缩放级别: {zoomLevel}{' '}
        <input
          type="range"
          min={1}
          max={5}
          step={0.5}
          value={zoomLevel}
          onChange={(e) => setZoomLevel(Number(e.target.value))}
        />
      </label>
      <div
        ref={mapRef}
        style={{
          width: 200,
          height: 120,
          background: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 50%, #ffd3b6 100%)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 8,
          fontSize: 14,
          fontWeight: 'bold',
          transition: 'transform 0.3s',
          transformOrigin: 'top left',
        }}
      >
        地图
      </div>
    </div>
  );
}

// ========== 2. 订阅事件 ==========
function ScrollTracker() {
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleScroll() {
      setScrollPos({
        x: Math.round(window.scrollX),
        y: Math.round(window.scrollY),
      });
    }
    window.addEventListener('scroll', handleScroll);
    // 清理函数：退订事件
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <p>
        滚动位置: X={scrollPos.x}, Y={scrollPos.y}
      </p>
      <p style={{ fontSize: 12, color: '#888' }}>
        (滚动页面查看变化，Effect 订阅 scroll 事件，清理函数退订)
      </p>
    </div>
  );
}

// ========== 3. 触发动画 ==========
function FadeInBox() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) return;
    const node = ref.current;
    if (!node) return;
    node.style.opacity = '1'; // 触发淡入动画
    return () => {
      node.style.opacity = '0'; // 清理：重置为初始状态
    };
  }, [show]);

  return (
    <div>
      <button onClick={() => setShow(!show)} className="btn" style={{ marginBottom: 8 }}>
        {show ? '隐藏' : '显示'}动画盒子
      </button>
      {show && (
        <div
          ref={ref}
          style={{
            width: 200,
            height: 80,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            opacity: 0,
            transition: 'opacity 0.5s ease-in',
          }}
        >
          淡入动画
        </div>
      )}
    </div>
  );
}

// ========== 4. 获取数据 ==========
// 模拟 API
async function fetchTodos(userId: string): Promise<string[]> {
  console.log(`🌐 正在获取 ${userId} 的待办事项...`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data: Record<string, string[]> = {
    alice: ['买牛奶', '写代码', '读 React 文档'],
    bob: ['跑步', '看电影', '学 TypeScript'],
    charlie: ['做饭', '散步', '写日记'],
  };
  return data[userId] || ['无数据'];
}

function TodoList() {
  const [userId, setUserId] = useState('alice');
  const [todos, setTodos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false; // 清理标志：忽略不再相关的请求结果

    async function startFetching() {
      setLoading(true);
      const json = await fetchTodos(userId);
      if (!ignore) {
        setTodos(json);
        setLoading(false);
      }
    }

    startFetching();

    // 清理函数：将 ignore 设为 true，忽略旧的请求结果
    return () => {
      ignore = true;
    };
  }, [userId]);

  return (
    <div>
      <label>
        用户：{' '}
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="select-input"
        >
          <option value="alice">Alice</option>
          <option value="bob">Bob</option>
          <option value="charlie">Charlie</option>
        </select>
      </label>
      <div style={{ marginTop: 8 }}>
        {loading ? (
          <p>加载中...</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {todos.map((todo, i) => (
              <li key={i}>{todo}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ========== 5. 发送分析报告 ==========
function AnalyticsDemo() {
  const [page, setPage] = useState('/home');
  const [analyticsLog, setAnalyticsLog] = useState<string[]>([]);

  useEffect(() => {
    const msg = `📊 分析: 访问页面 ${page} (时间: ${new Date().toLocaleTimeString()})`;
    console.log(msg);
    setAnalyticsLog((prev) => [...prev, msg]);
    // 不需要清理函数，分析日志可以重复发送
    // 生产环境只有一次，开发环境可能有两次（正常行为）
  }, [page]);

  return (
    <div>
      <label>
        当前页面：{' '}
        <select
          value={page}
          onChange={(e) => setPage(e.target.value)}
          className="select-input"
        >
          <option value="/home">首页</option>
          <option value="/about">关于</option>
          <option value="/contact">联系</option>
        </select>
      </label>
      <div
        style={{
          marginTop: 8,
          padding: 8,
          background: '#f5f5f5',
          borderRadius: 6,
          fontFamily: 'monospace',
          fontSize: 12,
          maxHeight: 120,
          overflowY: 'auto',
        }}
      >
        {analyticsLog.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
}

// ========== 主组件 ==========
export default function CommonPatternsDemo() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: '非 React 小部件', component: <MapWidget /> },
    { title: '订阅事件', component: <ScrollTracker /> },
    { title: '触发动画', component: <FadeInBox /> },
    { title: '获取数据', component: <TodoList /> },
    { title: '分析报告', component: <AnalyticsDemo /> },
  ];

  return (
    <div className="demo-section">
      <h2>4. Effect 常见模式</h2>
      <p>Effect 与外部系统同步的常见模式及其清理函数实现。</p>

      <div className="tab-bar">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`tab-btn ${activeTab === i ? 'active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="demo-box">{tabs[activeTab].component}</div>

      <div className="note">
        <strong>模式总结：</strong>
        <ul>
          <li><strong>非 React 小部件：</strong>调用其命令式 API，相同值重复调用无害则无需清理</li>
          <li><strong>订阅事件：</strong>清理函数中退订（removeEventListener）</li>
          <li><strong>触发动画：</strong>清理函数中将动画重置为初始状态</li>
          <li><strong>获取数据：</strong>清理函数中使用 ignore 标志忽略过时请求</li>
          <li><strong>分析报告：</strong>不需要清理，开发环境重复调用是正常的</li>
        </ul>
      </div>
    </div>
  );
}
