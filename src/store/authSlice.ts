import { createSlice } from '@reduxjs/toolkit';
import mockRequest from '../utils/mockRequest';

export type User = {
    username: string;
    password: string;
};

export interface AuthState {
    isLoading: boolean;
    error: any;
    authData: {} | null;
}

const initialState: AuthState = {
    isLoading: false,
    error: null,
    authData: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLoading(state) {
            if (!state.isLoading) {
                state.isLoading = true;
            }
        },
        authReceived(state, action) {
            if (state.isLoading) {
                state.isLoading = false;
                state.authData = action.payload;
            }
        },
        authError(state, action) {
            if (state.isLoading) {
                state.isLoading = false;
                state.error = action.payload;
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { authLoading, authReceived, authError } = authSlice.actions;

// Define a thunk that dispatches those action creators
export const getCurrentUser =
    () => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
        dispatch(authLoading());
        try {
            const response = await mockRequest.get('auth/login');
            dispatch(authReceived(response.data));
        } catch (error) {
            dispatch(authError(error));
        }
    };
export const login =
    (user: User) =>
    async (dispatch: (arg0: { payload: any; type: string }) => void) => {
        dispatch(authLoading());
        try {
            const response = await mockRequest.post('auth/login', user);
            dispatch(authReceived(response.data));
        } catch (error) {
            dispatch(authError(error));
        }
    };
export const logout =
    () => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
        dispatch(authReceived(null));
    };

export default authSlice.reducer;
