/**
 * 模块依赖树
 *
 * 模块依赖树中的每个节点是一个模块，每个分支代表该模块中的 import 语句。
 * 与渲染树相比，依赖树的节点是模块而非组件，且非组件模块也会出现在树中。
 * 依赖树对于确定运行 React 应用程序所需的模块非常有用。
 */

// ---- 依赖树可视化 ----
interface TreeNodeProps {
  label: string
  isData?: boolean
  children?: React.ReactNode
}

function TreeNode({ label, isData, children }: TreeNodeProps) {
  return (
    <div>
      <div className="tree-node">
        <span className="node-arrow">▼</span>
        <span
          className="node-label"
          style={
            isData
              ? { background: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.5)', color: '#16a34a' }
              : undefined
          }
        >
          {label}
        </span>
      </div>
      {children && <div className="tree-children">{children}</div>}
    </div>
  )
}

function DependencyTreeView() {
  return (
    <div className="tree-container">
      <TreeNode label="App.js (入口模块)">
        <TreeNode label="FancyText.js" />
        <TreeNode label="InspirationGenerator.js">
          <TreeNode label="inspirations.js" isData />
          <TreeNode label="FancyText.js" />
          <TreeNode label="Color.js" />
        </TreeNode>
        <TreeNode label="Copyright.js" />
      </TreeNode>
    </div>
  )
}

function RenderTreeView() {
  return (
    <div className="tree-container">
      <TreeNode label="App">
        <TreeNode label="FancyText" />
        <TreeNode label="InspirationGenerator">
          <TreeNode label="FancyText / Color" />
          <TreeNode label="Copyright" />
        </TreeNode>
      </TreeNode>
    </div>
  )
}

// ---- 主 Demo ----
export default function DependencyTreeDemo() {
  return (
    <div>
      <h3>模块依赖树 vs 渲染树</h3>
      <p>
        模块依赖树和渲染树有相似的结构，但也有关键差异。下面是同一个 Inspirations
        应用程序的两种树表示。
      </p>

      <h3>渲染树（组件为节点）</h3>
      <p>渲染树仅由 React 组件组成，箭头从父组件指向子组件。</p>
      <RenderTreeView />

      <h3 style={{ marginTop: 20 }}>模块依赖树（模块为节点）</h3>
      <p>
        依赖树的节点是 JavaScript 模块，绿色标记的是非组件的数据模块（如 inspirations.js）。
      </p>
      <DependencyTreeView />

      <div className="warning" style={{ marginTop: 16 }}>
        <strong>关键差异：</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
          <li>
            <strong>Copyright.js</strong> 在依赖树中是 App.js 的子模块（因为 App.js 导入了它），
            但在渲染树中 Copyright 是 InspirationGenerator 的子组件（因为 InspirationGenerator
            通过 children props 渲染了它）。
          </li>
          <li>
            <strong>inspirations.js</strong> 是数据模块而非组件，只出现在依赖树中，
            不出现在渲染树中。
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: 20 }}>依赖树的用途</h3>
      <p>
        依赖树对于确定运行 React 应用程序所需的模块非常有用。在构建生产应用时，
        bundler（捆绑器）会使用依赖树来确定应包含哪些模块。
        了解依赖树有助于调试大型捆绑包和优化应用性能。
      </p>
    </div>
  )
}
