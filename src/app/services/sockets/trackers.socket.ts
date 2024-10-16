import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable()
export class TrackersSocket extends Socket {
  constructor() {
    super({ url: 'wss://api-geotracker.v-max.site/ws', options: {} });
    this.setupSocketListeners();
  }

  private setupSocketListeners(): void {
    this.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    this.on('message', (msg: any) => {
      console.log('Message received: ', msg);
    });

    this.on('error', (err: any) => {
      console.error('Error: ', err);
    });

    this.on('log', (err: any) => {
      console.log('log: ', err);
    });
  }

  public getMessage(): Observable<any> {
    return this.fromEvent('message');
  }

  public getLog(): Observable<any> {
    return this.fromEvent('log');
  }

  public getError(): Observable<any> {
    return this.fromEvent('error');
  }

  public runTracker(option: string, socketId: string, trackerId: string): void {
    const message = {
      option,
      socketId,
      trackerId,
    };

    console.log(message);

    this.emit('runTracker', message);
  }

  public getUrlTracker(socketId: string) {
    const message = {
      socketId,
    };

    this.emit('getLink', message);
  }

  public closeConnection(): void {
    this.disconnect();
  }
}
