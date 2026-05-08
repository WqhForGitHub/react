import { useState } from 'react';
import Counter from './components/Counter';
import Chat from './components/Chat';
import ContactList from './components/ContactList';
import './App.css';

// 示例1：两个独立的 Counter，各自独立 state
function Demo1() {
  return (
    <div>
      <Counter />
      <Counter />
    </div>
  );
}

// 示例2：条件渲染第二个计数器，移除时 state 消失
function Demo2() {
  const [showB, setShowB] = useState(true);
  return (
    <div>
      <Counter />
      {showB && <Counter />}
      <label>
        <input
          type="checkbox"
          checked={showB}
          onChange={e => {
            setShowB(e.target.checked);
          }}
        />
        渲染第二个计数器
      </label>
    </div>
  );
}

// 示例3：相同位置的相同组件会保留 state
function Demo3() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <Counter isFancy={true} />
      ) : (
        <Counter isFancy={false} />
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked);
          }}
        />
        使用好看的样式
      </label>
    </div>
  );
}

// 示例4：相同位置的不同组件会使 state 重置
function Demo4() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div>
      {isPaused ? (
        <p>待会见！</p>
      ) : (
        <Counter />
      )}
      <label>
        <input
          type="checkbox"
          checked={isPaused}
          onChange={e => {
            setIsPaused(e.target.checked);
          }}
        />
        休息一下
      </label>
    </div>
  );
}

// 示例5：不同父元素导致 state 重置
function Demo5() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <div>
          <Counter isFancy={true} />
        </div>
      ) : (
        <section>
          <Counter isFancy={false} />
        </section>
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked);
          }}
        />
        使用好看的样式
      </label>
    </div>
  );
}

// 示例6：嵌套组件定义导致 state 重置（错误示例）
function Demo6() {
  const [counter, setCounter] = useState(0);

  // 注意：这是错误做法！不要在组件内部定义组件
  function MyTextField() {
    const [text, setText] = useState('');
    return (
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="输入一些文字..."
      />
    );
  }

  return (
    <>
      <MyTextField />
      <button onClick={() => {
        setCounter(counter + 1);
      }}>点击了 {counter} 次</button>
    </>
  );
}

// 示例7：方法一 - 将组件渲染在不同的位置来重置 state
function Demo7() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        下一位玩家！
      </button>
    </div>
  );
}

// 示例8：方法二 - 使用 key 来重置 state
function Demo8() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        下一位玩家！
      </button>
    </div>
  );
}

// 示例9：使用 key 重置表单
const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

function Demo9() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div className="messenger">
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat key={to.id} contact={to} />
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <h1>对 state 进行保留和重置</h1>
      <p className="intro">
        各个组件的 state 是各自独立的。根据组件在 UI 树中的位置，
        React 可以跟踪哪些 state 属于哪个组件。你可以控制在重新渲染过程中何时对 state 进行保留和重置。
      </p>

      <section className="demo-section">
        <h2>1. 两个独立的 Counter（各自独立的 state）</h2>
        <p>两个 Counter 组件互不影响，各自拥有独立的 score 和 hover state。</p>
        <Demo1 />
      </section>

      <section className="demo-section">
        <h2>2. 条件渲染 —— 移除时 state 消失</h2>
        <p>取消勾选复选框移除第二个计数器，再次勾选时 state 从头开始初始化。</p>
        <Demo2 />
      </section>

      <section className="demo-section">
        <h2>3. 相同位置的相同组件会保留 state</h2>
        <p>切换 isFancy 时，Counter 的 state 被保留，因为它是位于相同位置的相同组件。</p>
        <Demo3 />
      </section>

      <section className="demo-section">
        <h2>4. 相同位置的不同组件会使 state 重置</h2>
        <p>勾选复选框将 Counter 替换为 p 标签，Counter 的 state 会被销毁。</p>
        <Demo4 />
      </section>

      <section className="demo-section">
        <h2>5. 不同父元素导致 state 重置</h2>
        <p>虽然 Counter 相同，但父元素从 section 变为 div，整个子树 state 被重置。</p>
        <Demo5 />
      </section>

      <section className="demo-section">
        <h2>6. 嵌套组件定义导致 state 重置（错误示例）</h2>
        <p>点击按钮增加计数时，输入框的 state 消失，因为每次渲染都创建了不同的组件函数。</p>
        <Demo6 />
      </section>

      <section className="demo-section">
        <h2>7. 方法一：将组件渲染在不同的位置</h2>
        <p>通过在不同位置渲染两个 Counter，切换时 state 会被重置。</p>
        <Demo7 />
      </section>

      <section className="demo-section">
        <h2>8. 方法二：使用 key 来重置 state</h2>
        <p>使用不同的 key 让 React 区分组件，即使它们出现在相同位置。</p>
        <Demo8 />
      </section>

      <section className="demo-section">
        <h2>9. 使用 key 重置表单</h2>
        <p>切换收件人时，Chat 组件的 state 会被重置，输入框内容被清除。</p>
        <Demo9 />
      </section>
    </div>
  );
}

export default App;
