export default function AboutPage() {
  return (
    <section style={{ padding: '24px 0', lineHeight: 2 }}>
      <h1>关于</h1>
      <p style={{ color: '#64748b' }}>
        这个页面在路由配置里用 lazy 声明，只有第一次访问时才会下载它的代码（开发模式下打开网络面板可以看到懒加载的请求）。
      </p>
      <p>
        路由即模块：把每个页面的代码拆开，首屏只加载首屏需要的部分，剩下的按需到达。
      </p>
    </section>
  );
}
