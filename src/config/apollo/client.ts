import { ApolloClient, InMemoryCache } from '@apollo/client';
import { authLink, httpLink } from './links';

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});