import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getFirstRequest(): string {
    return 'App is ready to accept requests';
  }
}
