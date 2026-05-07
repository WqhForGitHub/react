export class FadeInAnimation {
  node: HTMLElement;
  duration: number = 0;
  startTime: number | null = null;
  frameId: number | null = null;

  constructor(node: HTMLElement) {
    this.node = node;
  }
  start(duration: number) {
    this.duration = duration;
    this.onProgress(0);
    this.startTime = performance.now();
    this.frameId = requestAnimationFrame(() => this.onFrame());
  }
  onFrame() {
    const timePassed = performance.now() - this.startTime!;
    const progress = Math.min(timePassed / this.duration, 1);
    this.onProgress(progress);
    if (progress === 1) {
      this.stop();
    } else {
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }
  onProgress(progress: number) {
    this.node.style.opacity = String(progress);
  }
  stop() {
    cancelAnimationFrame(this.frameId!);
    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }
}
