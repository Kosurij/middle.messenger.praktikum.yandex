import EventBus from "/src/utils/EventBus";

type TWSTransportEvents = {
  connected: [];
  error: [];
  message: [];
  close: [];
}

export const WSTransportEvents = {
  Connected: 'connected',
  Error: 'error',
  Message: 'message',
  Close: 'close',
} as const;

export default class WSTransport extends EventBus<TWSTransportEvents> {
  private socket: WebSocket | null = null;

  private pingInterval = 0;

  constructor(private url: string) {
    super();
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.setupPing();

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, () => {
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, 5000);

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.pingInterval);

      this.pingInterval = 0;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.Connected);
    });
    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.Close);
    });

    socket.addEventListener('error', (e) => {
      this.emit(WSTransportEvents.Error, e);
    });

    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);

      if (data?.type === 'pong' || data?.type === 'user connected') {
        return;
      }

      this.emit(WSTransportEvents.Message, data);
    });
  }
}
