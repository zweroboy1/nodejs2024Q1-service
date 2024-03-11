
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class UuidValidator implements PipeTransform<string> {
  transform(value: string): string {
    if (!validate(value)) {
      throw new BadRequestException('Invalid userId format');
    }
    return value;
  }
}