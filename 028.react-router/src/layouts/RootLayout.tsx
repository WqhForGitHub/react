import type { CSSProperties } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const layout: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 860,
  margin: '0 auto',
  padding: 24,
};

const header: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  borderBottom: '1px solid #e2e8f0',
  paddingBottom: 12,
};

const nav: CSSProperties = {
  display: 'flex',
  gap: 8,
};

const navLink = ({ isActive }: { isActive: boolean }): CSSProperties => ({
  padding: '8px 14px',
  borderRadius: 8,
  textDecoration: 'none',
  background: isActive ? '#2563eb' : 'transparent',
  color: isActive ? '#fff' : '#475569',
});

export default function RootLayout() {
  return (
    <div style={layout}>
      <header style={header}>
        <strong style={{ fontSize: 18 }}>Demo 028</strong>
        <nav style={nav}>
          <NavLink to="/" style={navLink}>
            首页
          </NavLink>
          <NavLink to="/users" style={navLink}>
            用户
          </NavLink>
          <NavLink to="/about" style={navLink}>
            关于
          </NavLink>
        </nav>
      </header>

      <Outlet />

      <footer style={{ marginTop: 40, color: '#94a3b8', fontSize: 12 }}>
        React Router 7 · 嵌套布局 + 动态路由 + 查询参数 + 路由懒加载 + 404
      </footer>
    </div>
  );
}
