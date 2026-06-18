import { useEffect } from 'react';
import { FadeInAnimation } from './animation';

export function useFadeIn(ref: React.RefObject<HTMLElement | null>, duration: number) {
  useEffect(() => {
    const animation = new FadeInAnimation(ref.current!);
    animation.start(duration);
    return () => {
      animation.stop();
    };
  }, [ref, duration]);
}
