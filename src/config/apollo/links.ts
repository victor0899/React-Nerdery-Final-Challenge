import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { environment } from '../environment';

export const httpLink = createHttpLink({
  uri: environment.API_URL,
});

export const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${environment.AUTH_TOKEN}`,
    }
  }
});