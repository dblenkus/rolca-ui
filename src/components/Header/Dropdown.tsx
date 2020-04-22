import React from 'react';

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

interface Props {
    loggedin: boolean;
}

const Dropdown: React.FC<Props> = (props: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);

    const openMenu = (event: React.MouseEvent): void => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = (): void => {
        setAnchorEl(null);
    };

    const publicMenu = [
        <MenuItem key="item-1" onClick={closeMenu}>
            Register
        </MenuItem>,
        <MenuItem key="item-2" onClick={closeMenu}>
            Login
        </MenuItem>,
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
