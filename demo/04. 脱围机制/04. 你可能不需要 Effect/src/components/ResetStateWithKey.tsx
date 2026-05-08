import { useState } from "react";

// 🔴 避免：在 Effect 中重置 state
function ProfileBad({ userId }: { userId: string }) {
  const [comment, setComment] = useState("");

  // 🔴 当 prop 变化时，在 Effect 中重置 state
  // 实际代码：useEffect(() => { setComment(''); }, [userId]);
  // 模拟：每次 userId 变化时重置
  const [prevUserId, setPrevUserId] = useState(userId);
  if (userId !== prevUserId) {
    setPrevUserId(userId);
    setComment("");
  }

  return (
    <div className="demo-card bad">
      <h4>🔴 避免：在 Effect 中重置 state</h4>
      <p>
        用户：<strong>{userId}</strong>
      </p>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="写一条评论..."
        rows={3}
      />
      {comment && (
        <button className="btn-small" onClick={() => alert(`提交评论: ${comment}`)}>
          提交评论
        </button>
      )}
      <p className="hint">
        问题：切换用户时，组件先用旧值渲染再重置，造成额外渲染。如果有多个
        state，每个都需要单独处理。
      </p>
    </div>
  );
}

// ✅ 正确做法：使用 key 重置整个组件
function Profile({ userId }: { userId: string }) {
  const [comment, setComment] = useState("");

  return (
    <div className="demo-card good">
      <h4>✅ 正确：使用 key 重置所有 state</h4>
      <p>
        用户：<strong>{userId}</strong>
      </p>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="写一条评论..."
        rows={3}
      />
      {comment && (
        <button className="btn-small" onClick={() => alert(`提交评论: ${comment}`)}>
          提交评论
        </button>
      )}
      <p className="hint">
        优势：key 变化时 React 会重新创建组件，所有 state 自动重置
      </p>
    </div>
  );
}

function ProfilePageGood({ userId }: { userId: string }) {
  return <Profile userId={userId} key={userId} />;
}

const users = ["alice", "bob", "charlie"];

export default function ResetStateWithKey() {
  const [userId, setUserId] = useState("alice");

  return (
    <div>
      <h3>3. 当 props 变化时重置所有 state</h3>
      <p>
        不要在 Effect 中逐个重置 state。通过传递不同的 <code>key</code>{" "}
        来告诉 React 这是不同的组件，自动重置所有 state。
      </p>
      <div className="form-row" style={{ marginBottom: "1rem" }}>
        {users.map((u) => (
          <button
            key={u}
            className={`btn-small ${userId === u ? "active" : ""}`}
            onClick={() => setUserId(u)}
          >
            {u}
          </button>
        ))}
      </div>
      <div className="comparison">
        <ProfileBad userId={userId} />
        <ProfilePageGood userId={userId} />
      </div>
    </div>
  );
}
