import Heading from './Heading';
import Section from './Section';
import './App.css';

function Post({ title, body }: { title: string; body: string }) {
  return (
    <Section isFancy={true}>
      <Heading>{title}</Heading>
      <p><i>{body}</i></p>
    </Section>
  );
}

function RecentPosts() {
  return (
    <Section>
      <Heading>最近的帖子</Heading>
      <Post
        title="里斯本的味道"
        body="...那些蛋挞"
      />
      <Post
        title="探戈节奏中的布宜诺斯艾利斯"
        body="我爱它"
      />
    </Section>
  );
}

function AllPosts() {
  return (
    <Section>
      <Heading>帖子</Heading>
      <RecentPosts />
    </Section>
  );
}

function ProfilePage() {
  return (
    <Section>
      <Heading>My Profile</Heading>
      <Post
        title="旅行者，你好!"
        body="来看看我的冒险。"
      />
      <AllPosts />
    </Section>
  );
}

function App() {
  return (
    <div className="app">
      <h2 className="demo-title">使用 Context 深层传递参数</h2>

      <div className="demo-section">
        <h3 className="demo-subtitle">示例：Context 穿过中间层级的组件</h3>
        <p className="demo-desc">
          相同的 Post 组件在不同的嵌套层级上渲染，内部的 Heading 自动从最近的 Section 获取正确的级别。
        </p>
        <div className="demo-container">
          <ProfilePage />
        </div>
      </div>

      <div className="demo-section">
        <h3 className="demo-subtitle">示例：嵌套 Section 自动递增级别</h3>
        <p className="demo-desc">
          无需手动传递 level，Section 自动从上层读取 level 并向下传递 level + 1。
        </p>
        <div className="demo-container">
          <Section>
            <Heading>主标题</Heading>
            <Section>
              <Heading>副标题</Heading>
              <Heading>副标题</Heading>
              <Heading>副标题</Heading>
              <Section>
                <Heading>子标题</Heading>
                <Heading>子标题</Heading>
                <Heading>子标题</Heading>
                <Section>
                  <Heading>子子标题</Heading>
                  <Heading>子子标题</Heading>
                  <Heading>子子标题</Heading>
                </Section>
              </Section>
            </Section>
          </Section>
        </div>
      </div>
    </div>
  );
}

export default App;
