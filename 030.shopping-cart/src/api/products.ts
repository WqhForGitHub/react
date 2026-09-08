export interface Product {
  id: string;
  name: string;
  category: '手机' | '电脑' | '配件' | '影音';
  price: number;
  originPrice: number;
  color: string;
  rating: number;
  sales: number;
}

export const catalog: Product[] = [
  { id: 'm1', name: '旗舰手机 X', category: '手机', price: 4999, originPrice: 5499, color: '#6366f1', rating: 4.8, sales: 2310 },
  { id: 'm2', name: '轻量手机 A', category: '手机', price: 1999, originPrice: 2199, color: '#0ea5e9', rating: 4.5, sales: 5120 },
  { id: 'c1', name: '轻薄本 Pro', category: '电脑', price: 6499, originPrice: 6999, color: '#22c55e', rating: 4.7, sales: 890 },
  { id: 'c2', name: '台式主机 S', category: '电脑', price: 3999, originPrice: 4599, color: '#f59e0b', rating: 4.3, sales: 640 },
  { id: 'a1', name: '机械键盘 K', category: '配件', price: 399, originPrice: 459, color: '#ec4899', rating: 4.6, sales: 9800 },
  { id: 'a2', name: '无线鼠标 M', category: '配件', price: 199, originPrice: 229, color: '#8b5cf6', rating: 4.4, sales: 15300 },
  { id: 'v1', name: '降噪耳机 E', category: '影音', price: 599, originPrice: 699, color: '#14b8a6', rating: 4.9, sales: 4200 },
  { id: 'v2', name: '蓝牙音箱 B', category: '影音', price: 299, originPrice: 359, color: '#f97316', rating: 4.2, sales: 3100 },
];

export function fetchProducts(delay = 800): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(catalog), delay);
  });
}

export const FREE_SHIPPING_THRESHOLD = 99;
export const SHIPPING_FEE = 10;

export const discountRules = [
  { threshold: 500, off: 80, label: '满 500 减 80' },
  { threshold: 300, off: 30, label: '满 300 减 30' },
  { threshold: 150, off: 10, label: '满 150 减 10' },
];

export function resolveDiscount(subtotal: number) {
  return discountRules.find((rule) => subtotal >= rule.threshold) ?? null;
}
