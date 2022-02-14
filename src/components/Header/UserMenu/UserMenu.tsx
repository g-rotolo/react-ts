import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/authSlice';
import { useGetAuthQuery } from '../../../services/authApi';
import defaultAvatar from '../../../images/defaultavatar.jpeg';

import './userMenu.css';

const UserMenu = () => {
    const dispatch = useDispatch();
    const { data: auth } = useGetAuthQuery();

    const [showMenu, setShowMenu] = useState(false);
    const ref = useRef<HTMLImageElement | null>(null);

    const closeMenu = (event: MouseEvent) => {
        if (ref.current !== event.target) {
            setShowMenu(false);
            document.removeEventListener('click', closeMenu);
        }
    };

    const showMenuHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        setShowMenu(true);
        document.addEventListener('click', closeMenu);
    };

    const logoutHandler = () => {
        setShowMenu(false);
        document.removeEventListener('click', closeMenu);
        dispatch(logout());
    };

    return (
        <div className="auth-menu-container">
            <div className="dropdown-menu-container">
                <img
                    className="profile-img"
                    src={auth?.avatarUrl || defaultAvatar}
                    alt="avatar"
                    ref={ref}
                    onClick={showMenuHandler}
                />
                {showMenu && (
                    <div className="dropdown-menu">
                        <div className="menu-element">{auth?.username}</div>
                        <div className="menu-element">
                            <button type="button" onClick={logoutHandler}>
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserMenu;
