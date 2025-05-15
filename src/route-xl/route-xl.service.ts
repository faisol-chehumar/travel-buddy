import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

import { HttpMethod } from 'src/common/interfaces';

import { RouteOptimizeRequest, RouteOptimizeResponse } from './interfaces';
import {
  RouteXLException,
  RouteXLUnavailableException,
} from './exceptions/route-xl.exceptions';
import { AxiosError } from 'axios';

@Injectable()
export class RouteXlService {
  private readonly logger = new Logger(RouteXlService.name);

  private readonly baseUrl = 'https://api.routexl.com';
  private readonly username: string;
  private readonly password: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.username = this.configService.get<string>('ROUTE_XL_USER') || '';
    this.password = this.configService.get<string>('ROUTE_XL_PASS') || '';
  }

  async getOptimizeRoute(
    routeOptimizeRequest: RouteOptimizeRequest,
  ): Promise<RouteOptimizeResponse> {
    const response = await this.callRouteXlApi<RouteOptimizeResponse>(
      'post',
      '/tour',
      routeOptimizeRequest,
    );

    return response;
  }

  private async callRouteXlApi<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
  ): Promise<T> {
    try {
      const config = {
        auth: {
          username: this.username,
          password: this.password,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      const request =
        method === 'get'
          ? this.httpService.get<T>(`${this.baseUrl}${endpoint}`, config)
          : this.httpService.post<T>(
              `${this.baseUrl}${endpoint}`,
              data,
              config,
            );

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

  private transformToDomainError(error: AxiosError): RouteXLException {
    const name = error.name;
    const code = error.code;

    if (
      code === 'ENOTFOUND' ||
      code === 'ECONNABORTED' ||
      name === 'TimeoutError'
    ) {
      return new RouteXLUnavailableException();
    }

    return new RouteXLException(`Route XL API is error`, 'API_ERROR');
  }
}
