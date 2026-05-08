import { useState, useEffect } from 'react';

// 模拟 API 请求
function fetchCities(country: string): Promise<string[]> {
  console.log(`🌐 获取 ${country} 的城市列表...`);
  return new Promise((resolve) => {
    const data: Record<string, string[]> = {
      中国: ['北京', '上海', '广州'],
      美国: ['纽约', '洛杉矶', '芝加哥'],
      日本: ['东京', '大阪', '京都'],
    };
    setTimeout(() => resolve(data[country] || []), 500);
  });
}

function fetchAreas(city: string): Promise<string[]> {
  console.log(`🌐 获取 ${city} 的区域列表...`);
  return new Promise((resolve) => {
    const data: Record<string, string[]> = {
      北京: ['朝阳区', '海淀区', '东城区'],
      上海: ['浦东新区', '黄浦区', '静安区'],
      纽约: ['曼哈顿', '布鲁克林', '皇后区'],
      东京: ['新宿区', '涩谷区', '港区'],
    };
    setTimeout(() => resolve(data[city] || []), 500);
  });
}

/**
 * Demo03: Effect 是否在做几件不相关的事情？
 * 展示将不相关的逻辑拆分到不同的 Effect 中
 */
export default function Demo03SplitEffects() {
  const [country, setCountry] = useState('中国');
  const [cities, setCities] = useState<string[]>([]);
  const [city, setCity] = useState<string | null>(null);
  const [areas, setAreas] = useState<string[]>([]);

  // Effect 1: 根据 country 获取城市
  useEffect(() => {
    let ignore = false;
    setCities([]);
    setCity(null);
    fetchCities(country).then((result) => {
      if (!ignore) {
        setCities(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, [country]);

  // Effect 2: 根据 city 获取区域
  useEffect(() => {
    if (!city) {
      setAreas([]);
      return;
    }
    let ignore = false;
    setAreas([]);
    fetchAreas(city).then((result) => {
      if (!ignore) {
        setAreas(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, [city]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Demo 03: 拆分不相关的 Effect</h2>
      <p>
        两个不相关的同步过程（国家→城市、城市→区域）应该放在两个独立的 Effect 中，
        避免一个依赖变化导致不相关的逻辑重新执行。
      </p>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <label>
            国家：
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="中国">中国</option>
              <option value="美国">美国</option>
              <option value="日本">日本</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            城市：
            <select
              value={city || ''}
              onChange={(e) => setCity(e.target.value)}
              disabled={cities.length === 0}
            >
              <option value="">请选择城市</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            区域：
            <select disabled={areas.length === 0}>
              <option value="">请选择区域</option>
              {areas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <hr />
      <p style={{ fontSize: '0.85rem', color: '#666' }}>
        打开控制台查看 fetch 调用时机。改变城市不会触发重新获取国家列表。
      </p>
    </div>
  );
}
