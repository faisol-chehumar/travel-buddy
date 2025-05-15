import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

import {
  OpenAiRequest,
  OpenAiResponse,
  OpenApiChoices,
  TripLocation,
} from '../interfaces';
import {
  OpenAiException,
  OpenAiUnavailableException,
} from '../exceptions/openai.exceptions';

@Injectable()
export class OpenAiService {
  private readonly logger = new Logger(OpenAiService.name);

  private readonly apiKey: string;
  private readonly baseApiUrl = 'https://api.openai.com/v1/chat/completions';
  private readonly defaultModel = 'gpt-4-turbo';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY') || '';

    if (!this.apiKey) {
      this.logger.warn('OpenAI API key not found in environment variables');
    }
  }

  async generateOneDayTripLocation(
    originPlace: string,
    destinationPlace: string,
  ): Promise<TripLocation[]> {
    const prompt = this.createOneDayTripPlanPrompt(
      originPlace,
      destinationPlace,
    );

    const response = await this.callOpenAiApi(prompt);

    return this.parseOpenAIResponse<TripLocation>(response.choices);
  }

  private createOneDayTripPlanPrompt(
    originPlace: string,
    destinationPlace: string,
  ): OpenAiRequest {
    return {
      model: this.defaultModel,
      messages: [
        {
          role: 'system',
          content: `Act as a trip planner API. Given a JSON payload with { start, destination, end }, return a JSON array of 4–6 recommended locations to visit along the route, including stops between and at the destination. Each location must include: name, short_description, district, province, open, and close (in "HH:mm"). Respond only with JSON.`,
        },
        {
          role: 'user',
          content: `Create a one-day trip plan from ${originPlace} to ${destinationPlace} to ${originPlace}.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    };
  }

  private parseOpenAIResponse<T>(choices: OpenApiChoices[]): T[] {
    const result = this.extractJsonFromOpenAI(choices) as T[];

    return result;
  }

  private extractJsonFromOpenAI<T>(response: OpenApiChoices[]): T | [] {
    const content = response[0]?.message?.content;
    const match = content.match(/```json\n([\s\S]*?)\n```/);

    if (!match) {
      return [];
    }

    return JSON.parse(match[1]) as T;
  }

  private async callOpenAiApi(request: OpenAiRequest): Promise<OpenAiResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<OpenAiResponse>(this.baseApiUrl, request, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }),
      );

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      this.logger.error(
        `Failed to call OpenAI API: ${axiosError.message}`,
        axiosError.stack,
      );

      throw this.transformToDomainError(axiosError);
    }
  }

  private transformToDomainError(error: AxiosError): OpenAiException {
    const name = error.name;
    const code = error.code;

    if (
      code === 'ENOTFOUND' ||
      code === 'ECONNABORTED' ||
      name === 'TimeoutError'
    ) {
      return new OpenAiUnavailableException();
    }

    return new OpenAiException(`OpenAI API is error`, 'API_ERROR');
  }
}
