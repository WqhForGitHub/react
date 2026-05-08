import { useState, useEffect } from "react";

interface Card {
  id: number;
  name: string;
  gold: boolean;
}

const deck: Card[] = [
  { id: 1, name: "普通卡 A", gold: false },
  { id: 2, name: "普通卡 B", gold: false },
  { id: 3, name: "普通卡 C", gold: false },
  { id: 4, name: "金币卡 X", gold: true },
  { id: 5, name: "金币卡 Y", gold: true },
  { id: 6, name: "金币卡 Z", gold: true },
  { id: 7, name: "金币卡 W", gold: true },
];

// 🔴 避免：链式 Effect 相互触发调整 state
function GameBad() {
  const [card, setCard] = useState<Card | null>(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((c) => c + 1);
  });

  // 🔴 链式 Effect：每个 Effect 触发下一个
  useEffect(() => {
    if (card !== null && card.gold) {
      setGoldCardCount((c) => c + 1);
    }
  }, [card]);

  useEffect(() => {
    if (goldCardCount > 3) {
      setRound((r) => r + 1);
      setGoldCardCount(0);
    }
  }, [goldCardCount]);

  useEffect(() => {
    if (round > 5) {
      setIsGameOver(true);
    }
  }, [round]);

  useEffect(() => {
    if (isGameOver) {
      alert("游戏结束！");
    }
  }, [isGameOver]);

  function handlePlaceCard(nextCard: Card) {
    if (isGameOver) {
      alert("游戏已经结束了！");
      return;
    }
    setCard(nextCard);
  }

  return (
    <div className="demo-card bad">
      <h4>🔴 避免：链式 Effect 相互触发</h4>
      <div className="game-stats">
        <span>回合: {round}</span>
        <span>金币计数: {goldCardCount}</span>
        <span>状态: {isGameOver ? "结束" : "进行中"}</span>
        <span className="render-badge">渲染次数: {renderCount}</span>
      </div>
      <p>当前卡牌: {card ? card.name : "无"}</p>
      <div className="card-grid">
        {deck.map((c) => (
          <button
            key={c.id}
            className={`btn-card ${c.gold ? "gold" : ""}`}
            onClick={() => handlePlaceCard(c)}
            disabled={isGameOver}
          >
            {c.name}
          </button>
        ))}
      </div>
      <p className="hint">
        问题：每放置一张金币卡，触发 3-4 次额外渲染（setCard → 渲染 →
        setGoldCardCount → 渲染 → ...），效率极低
      </p>
    </div>
  );
}

// ✅ 正确做法：渲染期间计算 + 事件处理函数中调整 state
function GameGood() {
  const [card, setCard] = useState<Card | null>(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((c) => c + 1);
  });

  // ✅ 在渲染期间计算 isGameOver
  const isGameOver = round > 5;

  function handlePlaceCard(nextCard: Card) {
    if (isGameOver) {
      alert("游戏已经结束了！");
      return;
    }

    // ✅ 在事件处理函数中一次性计算所有 state 更新
    setCard(nextCard);
    if (nextCard.gold) {
      if (goldCardCount < 3) {
        setGoldCardCount(goldCardCount + 1);
      } else {
        setGoldCardCount(0);
        setRound(round + 1);
        if (round + 1 > 5) {
          setTimeout(() => alert("游戏结束！"), 0);
        }
      }
    }
  }

  return (
    <div className="demo-card good">
      <h4>✅ 正确：渲染期间计算 + 事件处理函数调整 state</h4>
      <div className="game-stats">
        <span>回合: {round}</span>
        <span>金币计数: {goldCardCount}</span>
        <span>状态: {isGameOver ? "结束" : "进行中"}</span>
        <span className="render-badge">渲染次数: {renderCount}</span>
      </div>
      <p>当前卡牌: {card ? card.name : "无"}</p>
      <div className="card-grid">
        {deck.map((c) => (
          <button
            key={c.id}
            className={`btn-card ${c.gold ? "gold" : ""}`}
            onClick={() => handlePlaceCard(c)}
            disabled={isGameOver}
          >
            {c.name}
          </button>
        ))}
      </div>
      <p className="hint">
        优势：所有 state 更新在事件处理函数中一次性完成，React
        批量处理，只需一次渲染
      </p>
    </div>
  );
}

export default function ChainedEffects() {
  return (
    <div>
      <h3>7. 避免链式计算</h3>
      <p>
        不要用多个 Effect 相互触发来调整 state。在渲染期间计算派生值，在事件处理函数中一次性更新
        state。
      </p>
      <p className="game-rules">
        游戏规则：每收集 4 张金币卡进入下一回合，第 6 回合游戏结束。观察两个版本的渲染次数差异！
      </p>
      <div className="comparison">
        <GameBad />
        <GameGood />
      </div>
    </div>
  );
}
