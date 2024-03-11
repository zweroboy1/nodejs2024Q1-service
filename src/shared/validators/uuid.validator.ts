import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class UuidValidator implements PipeTransform<string> {
  transform(value: string): string {
    if (!validate(value)) {
      throw new BadRequestException('Id should be in the uuid format');
    }
    return value;
  }
}
