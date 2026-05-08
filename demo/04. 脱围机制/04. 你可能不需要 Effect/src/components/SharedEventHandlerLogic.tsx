import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  isInCart: boolean;
}

// 模拟函数
const addToCart = (product: Product, setProduct: (p: Product) => void) => {
  setProduct({ ...product, isInCart: true });
};

const showNotification = (msg: string) => {
  alert(msg);
};

const navigateTo = (path: string) => {
  alert(`导航到: ${path}`);
};

// 🔴 避免：在 Effect 中处理属于事件特定的逻辑
function ProductPageBad() {
  const [product, setProduct] = useState<Product>({
    id: 1,
    name: "React 高级教程",
    price: 99,
    isInCart: false,
  });

  // 🔴 问题：每次 product 变化时，如果 isInCart 为 true 就会显示通知
  // 这意味着页面刷新后（如果购物车状态被持久化），通知会反复出现
  const [prevInCart, setPrevInCart] = useState(product.isInCart);
  if (product.isInCart && !prevInCart) {
    setPrevInCart(true);
    showNotification(`已添加 ${product.name} 进购物车！`);
  }
  if (!product.isInCart && prevInCart) {
    setPrevInCart(false);
  }

  function handleBuyClick() {
    addToCart(product, setProduct);
  }

  function handleCheckoutClick() {
    addToCart(product, setProduct);
    navigateTo("/checkout");
  }

  return (
    <div className="demo-card bad">
      <h4>🔴 避免：在 Effect 中处理事件逻辑</h4>
      <p>
        商品：<strong>{product.name}</strong> - ¥{product.price}
      </p>
      <p>购物车状态：{product.isInCart ? "已在购物车" : "未加入"}</p>
      <div className="form-row">
        <button className="btn-small" onClick={handleBuyClick}>
          加入购物车
        </button>
        <button className="btn-small" onClick={handleCheckoutClick}>
          立即购买
        </button>
      </div>
      <p className="hint">
        问题：如果购物车状态被持久化，每次刷新页面通知都会出现！Effect
        不知道用户是否点击了按钮。
      </p>
    </div>
  );
}

// ✅ 正确做法：在事件处理函数中共享逻辑
function ProductPageGood() {
  const [product, setProduct] = useState<Product>({
    id: 1,
    name: "React 高级教程",
    price: 99,
    isInCart: false,
  });

  // ✅ 提取共享逻辑到函数中
  function buyProduct() {
    addToCart(product, setProduct);
    showNotification(`已添加 ${product.name} 进购物车！`);
  }

  function handleBuyClick() {
    buyProduct();
  }

  function handleCheckoutClick() {
    buyProduct();
    navigateTo("/checkout");
  }

  return (
    <div className="demo-card good">
      <h4>✅ 正确：在事件处理函数中共享逻辑</h4>
      <p>
        商品：<strong>{product.name}</strong> - ¥{product.price}
      </p>
      <p>购物车状态：{product.isInCart ? "已在购物车" : "未加入"}</p>
      <div className="form-row">
        <button className="btn-small" onClick={handleBuyClick}>
          加入购物车
        </button>
        <button className="btn-small" onClick={handleCheckoutClick}>
          立即购买
        </button>
      </div>
      <p className="hint">
        优势：通知只在用户点击按钮时出现，不会在页面刷新时重复显示
      </p>
    </div>
  );
}

export default function SharedEventHandlerLogic() {
  return (
    <div>
      <h3>5. 在事件处理函数中共享逻辑</h3>
      <p>
        事件特定的逻辑应该在事件处理函数中处理，而不是在 Effect
        中。可以将共享逻辑提取到函数中。
      </p>
      <div className="comparison">
        <ProductPageBad />
        <ProductPageGood />
      </div>
    </div>
  );
}
