interface Connection {
  connect: () => void;
  disconnect: () => void;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
}

export function createConnection(
  serverUrl: string,
  roomId: string
): Connection {
  return {
    connect() {
      console.log(
        `✅ 连接到"${roomId}"房间，在 ${serverUrl}...`
      );
    },
    disconnect() {
      console.log(
        `❌ 断开"${roomId}"房间，在 ${serverUrl}`
      );
    },
    on(_event: string, _handler: (...args: unknown[]) => void) {
      // 模拟事件监听（实际实现会注册回调）
    },
  };
}

export function createConnectionWithOptions(options: {
  serverUrl: string;
  roomId: string;
}): Connection {
  return createConnection(options.serverUrl, options.roomId);
}

// 模拟播放声音
export function playSound() {
  console.log('🔔 播放通知声音');
}
