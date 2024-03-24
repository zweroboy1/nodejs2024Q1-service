import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! It is a Home Library Service by zweroboy1';
  }
}
