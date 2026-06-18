import { useRef } from 'react';

/**
 * 示例：滚动至一个元素
 * 一个由三张图片和三个按钮组成的轮播，
 * 点击按钮会调用浏览器的 scrollIntoView() 方法
 */
export default function ScrollToElement() {
  const firstRef = useRef<HTMLImageElement>(null);
  const secondRef = useRef<HTMLImageElement>(null);
  const thirdRef = useRef<HTMLImageElement>(null);

  const scrollOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center',
  };

  function scrollToFirst() {
    firstRef.current?.scrollIntoView(scrollOptions);
  }

  function scrollToSecond() {
    secondRef.current?.scrollIntoView(scrollOptions);
  }

  function scrollToThird() {
    thirdRef.current?.scrollIntoView(scrollOptions);
  }

  return (
    <div className="demo-card">
      <h3>滚动至一个元素</h3>
      <p>一个组件中可以有多个 ref，点击按钮滚动到对应的图片。</p>
      <nav className="scroll-nav">
        <button onClick={scrollToFirst}>Neo</button>
        <button onClick={scrollToSecond}>Millie</button>
        <button onClick={scrollToThird}>Bella</button>
      </nav>
      <div className="scroll-container">
        <ul className="scroll-list">
          <li>
            <img
              src="https://placecats.com/neo/300/200"
              alt="Neo"
              ref={firstRef}
            />
          </li>
          <li>
            <img
              src="https://placecats.com/millie/300/200"
              alt="Millie"
              ref={secondRef}
            />
          </li>
          <li>
            <img
              src="https://placecats.com/bella/300/200"
              alt="Bella"
              ref={thirdRef}
            />
          </li>
        </ul>
      </div>
      <div className="code-hint">
        <code>{`ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })`}</code>
      </div>
    </div>
  );
}
