export function createConnection(serverUrl: string, roomId: string) {
  // 实际的实现将会连接到服务器
  return {
    connect() {
      console.log(`✅ 连接到 "${roomId}" 房间，位于 ${serverUrl}...`);
    },
    disconnect() {
      console.log(`❌ 断开 "${roomId}" 房间，位于 ${serverUrl}`);
    },
  };
}
