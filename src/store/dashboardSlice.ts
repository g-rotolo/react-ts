import { createSlice } from '@reduxjs/toolkit';
import mockRequest from '../utils/mockRequest';

export interface DashboardState {
    isLoading: boolean;
    dashboardData: [];
}

const initialState: DashboardState = {
    isLoading: false,
    dashboardData: [],
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        dashboardLoading(state) {
            if (!state.isLoading) {
                state.isLoading = true;
            }
        },
        dashboardReceived(state, action) {
            if (state.isLoading) {
                state.isLoading = false;
                state.dashboardData = action.payload;
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { dashboardLoading, dashboardReceived } = dashboardSlice.actions;

// Define a thunk that dispatches those action creators
export const fetchDashboard =
    () => async (dispatch: (arg0: { payload: any; type: string }) => void) => {
        dispatch(dashboardLoading());
        const response = await mockRequest.get('dashboard');
        dispatch(dashboardReceived(response.data));
    };

export default dashboardSlice.reducer;
