/**
 * 你的第一个组件 —— 定义组件
 *
 * React 组件是一段可以 使用标签进行扩展 的 JavaScript 函数。
 * 构建组件的三个步骤：
 * 1. 导出组件 (export default)
 * 2. 定义函数 (function Name, 大写字母开头)
 * 3. 添加标签 (JSX)
 */
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}
