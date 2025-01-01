export const API_CONFIG = {
  API_URL: import.meta.env.VITE_API_URL || 'https://syn-api-prod.herokuapp.com/graphql',
  AUTH_TOKEN: import.meta.env.VITE_AUTH_TOKEN
};

export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_CONFIG.AUTH_TOKEN}`
});

export const fetchGraphQL = async (query: string) => {

  console.log('Making request to:', API_CONFIG.API_URL);
  console.log('With headers:', getAuthHeaders());

  try {
    const response = await fetch(API_CONFIG.API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ 
        query
      })
    });

    if (!response.ok) {

      console.error('Response status:', response.status);
      console.error('Response statusText:', response.statusText);
      const errorText = await response.text();
      console.error('Response body:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};