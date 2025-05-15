import { HttpException, HttpStatus } from '@nestjs/common';

export class OpenAiException extends HttpException {
  constructor(message: string, errorCode: string) {
    super(
      {
        message,
        errorCode,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class OpenAiUnavailableException extends OpenAiException {
  constructor() {
    super('OpenAI API is currently unavailable', 'OPENAI_UNAVAILABLE');
  }
}

export class OpenAiInvalidResponseException extends OpenAiException {
  constructor() {
    super(
      'Received invalid response from OpenAI API',
      'OPENAI_INVALID_RESPONSE',
    );
  }
}

export class OpenAiRateLimitException extends OpenAiException {
  constructor() {
    super('OpenAI API rate limit reached', 'OPENAI_RATE_LIMIT');
  }
}
