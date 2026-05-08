import RefCounter from './components/RefCounter';
import Stopwatch from './components/Stopwatch';
import StateCounter from './components/StateCounter';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>使用 ref 引用值</h1>
        <p className="subtitle">
          当你希望组件记住某些信息，但又不想让这些信息触发新的渲染时，你可以使用 <code>ref</code>。
        </p>
      </header>

      <main className="demos">
        <RefCounter />
        <Stopwatch />
        <StateCounter />
      </main>

      <footer className="app-footer">
        <div className="key-points">
          <h3>关键要点</h3>
          <ul>
            <li>ref 是一种脱围机制，用于保留<strong>不用于渲染</strong>的值</li>
            <li>ref 是一个普通的 JavaScript 对象，具有 <code>current</code> 属性</li>
            <li>设置 ref 的 <code>current</code> 值<strong>不会触发重新渲染</strong></li>
            <li>不要在渲染过程中读取或写入 <code>ref.current</code></li>
            <li>当信息用于渲染时使用 state，仅事件处理器需要时使用 ref</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
