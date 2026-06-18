/**
 * 聊天室连接 API 模拟
 * 模拟创建连接和断开连接的过程
 */
export function createConnection(roomId: string) {
  // 真正的实现实际上会连接到服务器
  return {
    connect() {
      console.log(`✅ 连接到 "${roomId}" 聊天室……`);
    },
    disconnect() {
      console.log(`❌ 从 "${roomId}" 聊天室断开连接。`);
    },
  };
}
