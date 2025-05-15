import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ConnectionStates } from 'mongoose';

@Injectable()
export class HealthService {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
  ) {}

  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    };
  }

  checkDatabase() {
    const isConnected =
      this.mongoConnection.readyState === ConnectionStates.connected;

    return {
      status: isConnected ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      database: {
        name: 'MongoDB',
        connected: isConnected,
        state: this.getConnectionStateName(this.mongoConnection.readyState),
      },
    };
  }

  private getConnectionStateName(state: number): string {
    const states: Record<number, string> = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    return states[state] ?? 'unknown';
  }
}
