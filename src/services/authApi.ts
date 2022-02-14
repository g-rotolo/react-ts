import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type User = {
    id: number;
    username: string;
    name: string;
    avatarUrl: string;
};

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004' }),
    endpoints: builder => ({
        getAuth: builder.query<User, void>({
            query: () => 'auth/login',
        }),
    }),
});

export const { useGetAuthQuery } = authApi;
