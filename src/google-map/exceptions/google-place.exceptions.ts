export class GooglePlaceException extends Error {
  constructor(
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'GooglePlaceException';
  }
}

export class GooglePlaceUnavailableException extends GooglePlaceException {
  constructor(message = 'Google Place API is unavailable') {
    super(message, 'API_UNAVAILABLE');
  }
}
