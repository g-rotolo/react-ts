import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu/UserMenu';
import { useGetAuthQuery } from '../../services/authApi';

import './header.css';

const Header = () => {
    const { data: auth, isLoading } = useGetAuthQuery();

    const isAuthenticated = !!auth;

    return (
        <header className="fixed-header">
            <Link to={isAuthenticated ? '/dashboard' : '/'}>Logo</Link>
            {isLoading ? null : (
                <>
                    {isAuthenticated ? (
                        <UserMenu />
                    ) : (
                        <Link className="login-btn" to="/login">
                            Login
                        </Link>
                    )}
                </>
            )}
        </header>
    );
};

export default Header;
