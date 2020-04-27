import React from 'react';

import { Link } from 'react-router-dom';

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    loggedin: boolean;
}

const useStyles = makeStyles({
    menuItem: {
        textDecoration: 'none',
        color: 'inherit',
    },
});

const Dropdown: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);

    const openMenu = (event: React.MouseEvent): void => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = (): void => {
        setAnchorEl(null);
    };

    const publicMenu = [
        <Link to="/register" className={classes.menuItem} onClick={closeMenu} key="link-1">
            <MenuItem>Register</MenuItem>
        </Link>,
        <Link to="/login" className={classes.menuItem} onClick={closeMenu} key="link-2">
            <MenuItem>Login</MenuItem>
        </Link>,
    ];

    const privateMenu = [
        <MenuItem key="item-1" onClick={closeMenu}>
            Profile
        </MenuItem>,
        <MenuItem key="item-2" onClick={closeMenu}>
            Logout
        </MenuItem>,
    ];

    const { loggedin } = props;

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
                {loggedin ? privateMenu : publicMenu}
            </Menu>
        </>
    );
};

export default Dropdown;
