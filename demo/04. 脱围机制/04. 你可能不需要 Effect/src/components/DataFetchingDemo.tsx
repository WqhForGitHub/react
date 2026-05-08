import { useState, useEffect } from "react";

// 模拟 API
function fetchResults(query: string, page: number): Promise<string[]> {
  return new Promise((resolve) => {
    const delay = Math.random() * 500 + 200; // 200-700ms 随机延迟
    setTimeout(() => {
      const results = [
        `结果 ${page}-1: "${query}" 的搜索结果`,
        `结果 ${page}-2: "${query}" 的搜索结果`,
        `结果 ${page}-3: "${query}" 的搜索结果`,
      ];
      resolve(results);
    }, delay);
  });
}

// 🔴 避免：没有清除逻辑的数据获取（存在竞态条件）
function SearchResultsBad({ query }: { query: string }) {
  const [results, setResults] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // 🔴 没有清除逻辑！快速输入时可能出现竞态条件
    fetchResults(query, page).then((json) => {
      setResults(json);
      setIsLoading(false);
    });
  }, [query, page]);

  return (
    <div className="demo-card bad">
      <h4>🔴 避免：没有清除逻辑的获取数据</h4>
      {isLoading && <p className="loading">加载中...</p>}
      <ul className="search-results">
        {results.map((result, i) => (
          <li key={i}>{result}</li>
        ))}
      </ul>
      <button
        className="btn-small"
        onClick={() => setPage(page + 1)}
        style={{ marginTop: "0.5rem" }}
      >
        下一页
      </button>
      <p className="hint">
        问题：快速输入时，后发出的请求可能先返回（竞态条件），显示错误的结果
      </p>
    </div>
  );
}

// ✅ 正确做法：使用清除函数忽略过时的返回结果
function SearchResultsGood({ query }: { query: string }) {
  const [results, setResults] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let ignore = false;
    fetchResults(query, page).then((json) => {
      if (!ignore) {
        setResults(json);
        setIsLoading(false);
      }
    });
    return () => {
      ignore = true; // ✅ 清除函数：忽略较早的返回结果
    };
  }, [query, page]);

  return (
    <div className="demo-card good">
      <h4>✅ 正确：添加清除函数避免竞态条件</h4>
      {isLoading && <p className="loading">加载中...</p>}
      <ul className="search-results">
        {results.map((result, i) => (
          <li key={i}>{result}</li>
        ))}
      </ul>
      <button
        className="btn-small"
        onClick={() => setPage(page + 1)}
        style={{ marginTop: "0.5rem" }}
      >
        下一页
      </button>
      <p className="hint">
        优势：清除函数确保只有最后一次请求的结果会被显示，避免竞态条件
      </p>
    </div>
  );
}

// ✅ 更好的做法：提取自定义 Hook
function useData(url: string) {
  const [data, setData] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let ignore = false;
    fetchResults(url, 1).then((json) => {
      if (!ignore) {
        setData(json);
        setIsLoading(false);
      }
    });
    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, isLoading };
}

function SearchResultsCustomHook({ query }: { query: string }) {
  const { data, isLoading } = useData(query);

  return (
    <div className="demo-card good">
      <h4>✅ 更好：提取自定义 Hook</h4>
      {isLoading && <p className="loading">加载中...</p>}
      <ul className="search-results">
        {data?.map((result, i) => <li key={i}>{result}</li>)}
      </ul>
      <p className="hint">
        优势：将数据获取逻辑提取到自定义 Hook 中，更易于复用和维护
      </p>
      <pre className="code-block">{`function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then(r => r.json())
      .then(json => { if (!ignore) setData(json); });
    return () => { ignore = true; };
  }, [url]);
  return data;
}`}</pre>
    </div>
  );
}

export default function DataFetchingDemo() {
  const [query, setQuery] = useState("React");

  return (
    <div>
      <h3>11. 获取数据</h3>
      <p>
        在 Effect 中获取数据时，必须实现清除逻辑以避免竞态条件。更好的做法是提取到自定义
        Hook 中。
      </p>
      <div className="form-row" style={{ marginBottom: "1rem" }}>
        <label>
          搜索关键词：
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="快速输入以观察竞态条件..."
          />
        </label>
      </div>
      <div className="comparison">
        <SearchResultsBad query={query} />
        <SearchResultsGood query={query} />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <SearchResultsCustomHook query={query} />
      </div>
    </div>
  );
}
