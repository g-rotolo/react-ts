import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboard } from '../store/dashboardSlice';
import { RootState } from '../store/store';

const useDashboard = () => {
    const dashboard = useSelector((state: RootState) => state.dashboard);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDashboard());
    }, [dispatch]);

    return dashboard;
};

export default useDashboard;
