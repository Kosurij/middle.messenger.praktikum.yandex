type TCallback = (...args: unknown[]) => void;

export default class EventBus {
  private readonly listeners: Record<string, Array<TCallback>> = {};

  on(event: string, callback: TCallback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback)
  }

  off(event: string, callback: TCallback): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]
        .filter(listener => listener !== callback);
  }


  emit(event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach(listener => {
      listener(...args)
    })
  }
}
