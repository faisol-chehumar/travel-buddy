import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const response = 'Hello World';
    return response;
  }
}
