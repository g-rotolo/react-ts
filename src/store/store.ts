import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import authReducer from './authSlice';
import { authApi } from '../services/authApi';

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export const mockStore = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
