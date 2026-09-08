import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section style={{ padding: '56px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: 72, margin: 0, color: '#cbd5e1' }}>404</h1>
      <p style={{ color: '#64748b' }}>路径 '*' 通配路由兜住了这个不存在的地址</p>
      <p>
        <Link to="/">回首页</Link>
      </p>
    </section>
  );
}
