import React from 'react';

import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

import { userContext } from '../../components/Auth/AuthProvider';

const useStyles = makeStyles({
    menuItem: {
        textDecoration: 'none',
        color: 'inherit',
    },
});

const Dropdown: React.FC = () => {
    const user = React.useContext(userContext);
    const location = useLocation();

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);

    const openMenu = (event: React.MouseEvent): void => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = (): void => {
        setAnchorEl(null);
    };

    const logOut = (): void => {
        user.logout();
        setAnchorEl(null);
    };

    const publicMenu = [
        <Link to="/register" className={classes.menuItem} onClick={closeMenu} key="link-1">
            <MenuItem>Register</MenuItem>
        </Link>,
        <Link
            to={{
                pathname: '/login',
                state: { from: location },
            }}
            className={classes.menuItem}
            onClick={closeMenu}
            key="link-2"
        >
            <MenuItem>Login</MenuItem>
        </Link>,
    ];

    const privateMenu = [
        <MenuItem key="item-1" onClick={closeMenu}>
            Profile
        </MenuItem>,
        <MenuItem key="item-2" onClick={logOut}>
            Logout
        </MenuItem>,
    ];

    return (
        <>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={openMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
            >
                {user.isLoggedIn() ? privateMenu : publicMenu}
            </Menu>
        </>
    );
};

export default Dropdown;
