/**
 * 保持组件纯粹 -- 纯函数：组件作为公式
 *
 * 纯函数只负责自己的任务，输入相同则输出相同。
 * React 假设你编写的所有组件都是纯函数，对于相同的输入，必须总是返回相同的 JSX。
 */

interface RecipeProps {
  drinkers: number
}

function Recipe({ drinkers }: RecipeProps) {
  return (
    <ol>
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  )
}

export default function PureFunctionDemo() {
  return (
    <div>
      <h3>纯函数：组件作为公式</h3>
      <p>
        就像数学公式 <code>y = 2x</code> 一样，纯函数对于相同的输入总是返回相同的输出。
        React 假设你编写的所有组件都是纯函数 —— 给定相同的 props，组件必须总是返回相同的 JSX。
      </p>
      <section>
        <h1>Spiced Chai Recipe</h1>
        <h2>For two</h2>
        <Recipe drinkers={2} />
        <h2>For a gathering</h2>
        <Recipe drinkers={4} />
      </section>
      <div className="code-block">
{`function Recipe({ drinkers }) {
  return (
    <ol>
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}`}
      </div>
    </div>
  )
}
