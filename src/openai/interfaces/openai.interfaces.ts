export interface OpenAiRequest {
  model: string;
  messages: OpenAiMessage[];
  temperature?: number;
  max_tokens?: number;
}

export interface OpenAiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenApiChoices {
  index: number;
  message: OpenAiMessage;
  finish_reason: string;
}

export interface OpenAiResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OpenApiChoices[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface TripRecommendation {
  attractions: {
    name: string;
    description: string;
    type: string;
    visitDuration: number; // in minutes
  }[];
  restaurants: {
    name: string;
    description: string;
    cuisine: string;
    mealDuration: number; // in minutes
  }[];
  transportationOptions: {
    type: string;
    description: string;
    estimatedDuration: number; // in minutes
  }[];
  itinerary: {
    time: string;
    activity: string;
    description: string;
    duration: number; // in minutes
    location: string;
  }[];
}

export interface TripLocation {
  name: string;
  short_description: string;
  district: string;
  province: string;
  open: string;
  close: string;
  duration?: number;
}
