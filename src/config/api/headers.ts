import { environment } from '../environment';

export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${environment.AUTH_TOKEN}`
});