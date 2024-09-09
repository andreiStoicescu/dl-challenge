import { HttpException } from '@nestjs/common';

export const customErrorFormat = (err) => {
  const originalError = err.extensions?.originalError as HttpException;

  if (!originalError) {
    return {
      message: err.message,
      code: err.extensions?.code,
    };
  }
  return originalError;
};
