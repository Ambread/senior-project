import { FC, useState } from 'react';
import { createWSClient, wsLink } from '@trpc/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '..';
import { Auth } from './Auth';

export const Connect: FC = () => {
    const [trpcClient] = useState(() => {
        return trpc.createClient({
            links: [
                wsLink({
                    client: createWSClient({
                        url:
                            localStorage.getItem('url') ??
                            'ws://192.168.106.4:3000',
                    }),
                }),
            ],
        });
    });

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        suspense: true,
                        useErrorBoundary: true,
                    },
                    mutations: {
                        useErrorBoundary: true,
                    },
                },
            }),
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Auth />
            </QueryClientProvider>
        </trpc.Provider>
    );
};
