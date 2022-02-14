import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../store/authSlice';
import { RootState } from '../store/store';

export const useAuth = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    return auth;
};

export default useAuth;
