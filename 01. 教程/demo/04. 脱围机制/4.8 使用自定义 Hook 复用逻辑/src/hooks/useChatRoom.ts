import { useEffect, useRef } from 'react';
import { createConnection } from './chat';

export function useChatRoom({ serverUrl, roomId, onReceiveMessage }: { serverUrl: string; roomId: string; onReceiveMessage: (msg: string) => void }) {
  const onMessageRef = useRef(onReceiveMessage);

  useEffect(() => {
    onMessageRef.current = onReceiveMessage;
  }, [onReceiveMessage]);

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId,
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      onMessageRef.current(msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
