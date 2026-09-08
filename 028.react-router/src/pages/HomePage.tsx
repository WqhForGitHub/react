import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section style={{ padding: '24px 0', lineHeight: 2 }}>
      <h1>028 · React Router</h1>
      <p style={{ color: '#64748b' }}>
        顶部导航在所有页面共享，内容区由父级布局的 Outlet 渲染，这就是嵌套路由。
      </p>
      <ul>
        <li>
          <Link to="/users">用户列表</Link>
          ：支持 ?q= 查询参数过滤，搜索词会同步到地址栏
        </li>
        <li>
          <Link to="/users/2">用户详情</Link>
          ：动态路由 /users/:id，用 useParams 读取参数
        </li>
        <li>
          <Link to="/about">关于页</Link>
          ：通过 route 的 lazy 懒加载，首次访问才下载代码
        </li>
        <li>
          <Link to="/nothing/here">乱写的地址</Link>
          ：会命中 * 通配路由，显示 404
        </li>
      </ul>
    </section>
  );
}
