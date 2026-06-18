export function sendMessage(message: string) {
  console.log('🔵 You sent: ' + message);
}

export function createConnection(serverUrl: string, roomId: string) {
  let connectedCallback: (() => void) | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return {
    connect() {
      console.log(`✅ Connecting to "${roomId}" room at ${serverUrl}...`);
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event: string, callback: () => void) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      console.log(`❌ Disconnected from "${roomId}" room at ${serverUrl}`);
      if (timeout) {
        clearTimeout(timeout);
      }
    },
  };
}
