import { environment } from '../environment';

export const API_ENDPOINTS = {
  GRAPHQL: environment.API_URL,
} as const;