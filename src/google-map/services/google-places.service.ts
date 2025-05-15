import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { HttpMethod } from 'src/common/interfaces';
import { AxiosError } from 'axios';
import {
  GooglePlaceException,
  GooglePlaceUnavailableException,
} from '../exceptions/google-place.exceptions';

export interface PlaceSearchRequest {
  textQuery: string;
}

export interface PlaceLocation {
  latitude: number;
  longitude: number;
}

export interface Place {
  displayName: {
    text: string;
    languageCode: string;
  };
  location: PlaceLocation;
}

export interface PlaceSearchResponse {
  places: Place[];
}

@Injectable()
export class GooglePlacesService {
  private readonly logger = new Logger(GooglePlacesService.name);

  private readonly baseUrl = 'https://places.googleapis.com/v1';
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('GOOGLE_API_KEY') || '';

    if (!this.apiKey) {
      this.logger.warn(
        'Google Places API key not found in environment variables',
      );
    }
  }

  async searchPlaces(place: PlaceSearchRequest): Promise<PlaceSearchResponse> {
    const response = await this.callGooglePlaceApi<PlaceSearchResponse>(
      'post',
      '/places:searchText',
      { textQuery: place.textQuery },
    );

    return response;
  }

  async searchMultiplePlaces(
    placeNames: PlaceSearchRequest[],
  ): Promise<PlaceSearchResponse[]> {
    if (!placeNames || placeNames.length === 0) {
      return [];
    }

    const results = await Promise.all(
      placeNames.map((name) => this.searchPlaces(name).catch(() => null)),
    );

    return results.filter(
      (result): result is NonNullable<typeof result> => result !== null,
    );
  }

  private async callGooglePlaceApi<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
  ): Promise<T> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': this.apiKey,
        'X-Goog-FieldMask': 'places.displayName,places.location',
      };

      const request =
        method === 'get'
          ? this.httpService.get<T>(`${this.baseUrl}${endpoint}`, { headers })
          : this.httpService.post<T>(`${this.baseUrl}${endpoint}`, data, {
              headers,
            });

      const response = await firstValueFrom(request);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      this.logger.error('Failed to call route-xl api', {
        code: axiosError.code,
        message: axiosError.message,
      });

      throw this.transformToDomainError(axiosError);
    }
  }

  private transformToDomainError(error: AxiosError): GooglePlaceException {
    const name = error.name;
    const code = error.code;

    if (
      code === 'ENOTFOUND' ||
      code === 'ECONNABORTED' ||
      name === 'TimeoutError'
    ) {
      return new GooglePlaceUnavailableException();
    }

    return new GooglePlaceException(`Route XL API is error`, 'API_ERROR');
  }
}
