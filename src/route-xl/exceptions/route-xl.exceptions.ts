export class RouteXLException extends Error {
  constructor(
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'RouteXLException';
  }
}

export class RouteXLUnavailableException extends RouteXLException {
  constructor(message = 'Route-XL API is unavailable') {
    super(message, 'API_UNAVAILABLE');
  }
}
