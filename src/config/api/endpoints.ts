import { environment } from '../environment';

export const API_ENDPOINTS = {
  GRAPHQL: environment.API_URL,
  // Aquí podrían ir otros endpoints si se necesitan en el futuro
} as const;