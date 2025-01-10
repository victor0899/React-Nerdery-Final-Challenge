export const environment = {
    API_URL: import.meta.env.VITE_API_URL || 'https://syn-api-prod.herokuapp.com/graphql',
    AUTH_TOKEN: import.meta.env.VITE_AUTH_TOKEN
  } as const;