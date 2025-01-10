import { API_ENDPOINTS } from './endpoints';
import { getAuthHeaders } from './headers';

export const fetchGraphQL = async (query: string) => {
  try {
    const response = await fetch(API_ENDPOINTS.GRAPHQL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GraphQL Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};