import React, { useState } from 'react';
import {
    AppsRounded,
    MenuOutlined,
    Refresh,
    Settings,
    ViewStreamSharp
} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { styled, alpha } from '@mui/material/styles';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Hidden,
    Menu,
    MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/google.webp';
import { Link, useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',   
    borderRadius: '5px',
    backgroundColor: alpha(theme.palette.common.black, 0.85),
    '&:focus-within': {
        backgroundColor: 'white',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(11),
        width: '50%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1.5),
        paddingLeft: `calc(1em + ${theme.spacing(5)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        
        color: '#808080'
    },
}));

const Navbar = styled(AppBar)`
        z-index: ${props => props.theme.zIndex.drawer + 1};
        background-color: #fff;
        box-shadow: inset 0 -1px 0 0 #dadce0;
        
        
    `;

const Heading = styled(Typography)`
        color : #5f6368;
        font-size: 22px;
        padding: 0 0 0 15px;
        
    `;

const Header = ({ initialTitle, open, title, handleDrawer }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null);
    const navigate=useNavigate()

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleAccountMenuOpen = (e) => {
        setAccountMenuAnchorEl(e.currentTarget);
    };

    const handleAccountMenuClose = () => {
        setAccountMenuAnchorEl(null);
    };

    const token=localStorage.getItem('token')

    const handleLogout = () => {
        
        localStorage.removeItem('token');
 
         navigate('/signin');
    };

    return (
        <>
            <Navbar open={open}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        sx={{ marginRight: 3 }}
                        onClick={handleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: "flex", alignItems: "center", marginLeft: { xs: '-10px' } }}>
                        <img src={Logo} alt="Logo" style={{ height: '55px', marginLeft: "-25px" }} />
                        <Heading sx={{ ml: -2 }}>
                            {title || initialTitle}
                        </Heading>
                    </Box>
                    <Search sx={{ backgroundColor: '#f0f0f0', marginLeft: { xs: '30px' } }}>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: '#808080' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: 'auto',
                        gap: "5px"
                    }}>
                        <Hidden mdUp>
                            <IconButton aria-label="more" aria-controls="icon-menu" aria-haspopup="true" sx={{ color: '#757575', marginRight: { xs: '-px' } }} onClick={handleClick} >
                                <MenuOutlined />
                            </IconButton>
                            <Menu
                                id="icon-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem>
                                    <Refresh />
                                </MenuItem>
                                <MenuItem>
                                    <ViewStreamSharp />
                                </MenuItem>
                                <MenuItem>
                                    <Settings />
                                </MenuItem>
                                <MenuItem>
                                    <AppsRounded />
                                </MenuItem>
                                <MenuItem onClick={handleAccountMenuOpen}>
                                    <AccountCircleRoundedIcon />
                                </MenuItem>
                            </Menu>
                            <Menu
                                id="account-menu"
                                anchorEl={accountMenuAnchorEl}
                                open={Boolean(accountMenuAnchorEl)}
                                onClose={handleAccountMenuClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >   
                                {token ? (<>
                                <MenuItem onClick={handleAccountMenuClose}>
                                 email: {localStorage.getItem('email')}
                                </MenuItem>
                                <MenuItem onClick={handleAccountMenuClose}>
                                 name: {localStorage.getItem('name')}
                                </MenuItem>
                                <MenuItem onClick={handleAccountMenuClose}>
                                 <span onClick={handleLogout}>Logout</span> 
                                </MenuItem>
                                </>):( <>
                                    <MenuItem>Welcome</MenuItem>
                                <MenuItem onClick={handleAccountMenuClose}>
                                  <Link to="/signup">Sign Up</Link>  
                                </MenuItem>
                                    <MenuItem onClick={handleAccountMenuClose}>
                                <Link to="/signin">Sign In</Link>
                                </MenuItem>
                                </>)}
                            </Menu>
                        </Hidden>
                        <Hidden smDown>
                            <IconButton
                                aria-label="refresh"
                                onClick={() => window.location.reload()}
                                sx={{ color: '#757575' }}
                            >
                                <Refresh />
                            </IconButton>
                            <IconButton sx={{ color: '#757575' }}>
                                <ViewStreamSharp sx={{ color: '#757575' }} />
                            </IconButton>
                            <IconButton sx={{ color: '#757575' }}>
                                <Settings sx={{ color: '#757575' }} />
                            </IconButton>
                            <IconButton sx={{ color: '#757575' }}>
                                <AppsRounded sx={{ color: '#757575' }} />
                            </IconButton>
                            <IconButton sx={{ color: '#757575' }} onClick={handleAccountMenuOpen}>
                                <AccountCircleRoundedIcon sx={{ color: '#757575' }} />
                            </IconButton>
                            <Menu
                                id="account-menu"
                                anchorEl={accountMenuAnchorEl}
                                open={Boolean(accountMenuAnchorEl)}
                                onClose={handleAccountMenuClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                              {token ? (<>
                                <MenuItem onClick={handleAccountMenuClose}>
                                  email: {localStorage.getItem('email')}
                                </MenuItem>
                                <MenuItem onClick={handleAccountMenuClose}>
                                  name: {localStorage.getItem('name')}
                                </MenuItem>
                                <MenuItem onClick={handleAccountMenuClose}>
                                 <span onClick={handleLogout}>Logout</span> 
                                </MenuItem>
                                </>):( <>
                                    
                                    <MenuItem>Welcome</MenuItem>
                                <MenuItem onClick={handleAccountMenuClose}>
                                  <Link to="/signup">Sign Up</Link>  
                                </MenuItem>
                                    <MenuItem onClick={handleAccountMenuClose}>
                                <Link to="/signin">Sign In</Link>
                                </MenuItem>
                                </>)}
                            </Menu>
                        </Hidden>

                    </Box>
                </Toolbar>
            </Navbar>
        </>
    )
}

export default Header;
