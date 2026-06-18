import { useState } from 'react';

// ========== 1. 初始化应用 — 不应使用 Effect ==========
// 正确做法：放在组件外部，只在模块加载时运行一次
// 示例：
// if (typeof window !== 'undefined') {
//   checkAuthToken();
//   loadDataFromLocalStorage();
// }

// ========== 2. 购买商品 — 不应使用 Effect ==========
function PurchaseDemo() {
  const [purchaseLog, setPurchaseLog] = useState<string[]>([]);

  // 错误示范：购买操作放在 Effect 中
  // useEffect(() => {
  //   fetch('/api/buy', { method: 'POST' }); // 🔴 错误！开发环境会触发两次
  // }, []);

  // 正确做法：购买操作放在事件处理程序中
  function handleBuy() {
    const msg = `🛒 购买成功！(时间: ${new Date().toLocaleTimeString()})`;
    console.log(msg);
    setPurchaseLog((prev) => [...prev, msg]);
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={handleBuy} className="btn btn-primary">
          购买商品
        </button>
        <span style={{ fontSize: 13, color: '#888' }}>
          购买是用户交互，应在事件处理程序中触发
        </span>
      </div>
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
        {purchaseLog.length === 0 ? (
          <div style={{ color: '#999' }}>暂无购买记录</div>
        ) : (
          purchaseLog.map((log, i) => <div key={i}>{log}</div>)
        )}
      </div>
    </div>
  );
}

// ========== 3. 不需要 Effect 的场景：根据 state 派生值 ==========
function DerivedStateDemo() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // 错误示范：用 Effect 同步派生 state
  // const [fullName, setFullName] = useState('');
  // useEffect(() => {
  //   setFullName(firstName + ' ' + lastName); // 🔴 不必要！
  // }, [firstName, lastName]);

  // 正确做法：在渲染期间直接计算
  const fullName = `${firstName} ${lastName}`;

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="名"
          className="text-input"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="姓"
          className="text-input"
        />
      </div>
      <p>
        全名: <strong>{fullName || '(请输入)'}</strong>
      </p>
      <p style={{ fontSize: 12, color: '#888' }}>
        派生值不需要 Effect，直接在渲染期间计算即可
      </p>
    </div>
  );
}

// ========== 4. 不需要 Effect 的场景：重置 state ==========
function ResetStateDemo() {
  const [userId, setUserId] = useState('alice');
  const [comment, setComment] = useState('');

  // 错误示范：用 Effect 重置 state
  // useEffect(() => {
  //   setComment(''); // 🔴 当 userId 变化时重置，但不需要 Effect
  // }, [userId]);

  // 正确做法：在事件处理程序中重置
  function handleUserChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(e.target.value);
    setComment(''); // 在事件处理程序中重置
  }

  return (
    <div>
      <label>
        用户：{' '}
        <select value={userId} onChange={handleUserChange} className="select-input">
          <option value="alice">Alice</option>
          <option value="bob">Bob</option>
          <option value="charlie">Charlie</option>
        </select>
      </label>
      <div style={{ marginTop: 8 }}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="输入评论..."
          className="text-input"
        />
      </div>
      <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
        切换用户时在事件处理程序中重置评论，不需要 Effect
      </p>
    </div>
  );
}

// ========== 主组件 ==========
export default function AntiPatternsDemo() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: '初始化应用', component: <InitializationInfo /> },
    { title: '购买商品', component: <PurchaseDemo /> },
    { title: '派生 State', component: <DerivedStateDemo /> },
    { title: '重置 State', component: <ResetStateDemo /> },
  ];

  return (
    <div className="demo-section">
      <h2>5. 不适用 Effect 的场景</h2>
      <p>
        Effect 通常用于与外部系统同步。如果你的逻辑只是根据 state 调整 state，或者由特定交互引起，那么你可能不需要 Effect。
      </p>

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
        <strong>原则：</strong>
        <ul>
          <li><strong>初始化应用：</strong>放在组件外部，只运行一次</li>
          <li><strong>购买等交互操作：</strong>放在事件处理程序中，不是 Effect</li>
          <li><strong>根据 state 派生值：</strong>在渲染期间直接计算</li>
          <li><strong>重置 state：</strong>在事件处理程序中重置</li>
          <li><strong>Effect 应该用于与外部系统同步</strong>，而非内部 state 管理</li>
        </ul>
      </div>
    </div>
  );
}

function InitializationInfo() {
  return (
    <div>
      <h4>初始化应用 — 放在组件外部</h4>
      <pre
        style={{
          background: '#1e1e1e',
          color: '#d4d4d4',
          padding: 12,
          borderRadius: 6,
          fontSize: 13,
          overflow: 'auto',
        }}
      >
{`// ✅ 正确：放在组件外部
if (typeof window !== 'undefined') {
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ...
}

// ❌ 错误：不要放在 Effect 中
function App() {
  useEffect(() => {
    checkAuthToken();       // 开发环境会执行两次
    loadDataFromLocalStorage();
  }, []);
}`}
      </pre>
      <p style={{ fontSize: 13, color: '#666', marginTop: 8 }}>
        组件外部的代码只在模块加载时运行一次，不受 React 重新挂载的影响。
      </p>
    </div>
  );
}
