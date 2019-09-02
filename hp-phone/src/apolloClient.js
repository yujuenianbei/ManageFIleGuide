// http
import { http } from './http'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

// await before instantiating ApolloClient, else queries might run before the cache is persisted
// we need it for autorization (adding/removing token)
// const contextLink = setContext(_ => dynamicContext(context));
async function apollo() {
    const link = createHttpLink({
        uri: http.port,
          credentials: 'include',
        // credentials: 'same-origin',
    });
    const cache = new InMemoryCache({ addTypename: true });

    // await before instantiating ApolloClient, else queries might run before the cache is persisted
    // await persistCache({
    //     cache,
    //     storage: window.localStorage,
    // });

    // Continue setting up Apollo as usual.

    const client = new ApolloClient({
        link,
        cache
    });
    return client
}

export const client = apollo()

