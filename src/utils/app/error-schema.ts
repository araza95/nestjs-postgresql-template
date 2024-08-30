// Nest JS Imports
import { HttpStatus } from '@nestjs/common';

export const errorSchema = (
  statusCode: HttpStatus,
  message?: string,
): object => ({
  type: 'object',
  example: {
    statusCode,
    message: message || 'Error message',
  },
});
