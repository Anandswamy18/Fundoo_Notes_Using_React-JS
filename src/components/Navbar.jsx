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
import Logo from '../assets/google.webp'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    left:"50px",
    borderRadius: '5px',
    backgroundColor: alpha(theme.palette.common.black, 0.1),
    '&:focus-within': {
        backgroundColor: 'white',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
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

const Header = ({ title, handleDrawer, open }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <Navbar open={open}>
            <Toolbar>
                <IconButton
                    onClick={handleDrawer}
                    edge="start"
                    sx={{ marginRight: 2 }}>
                    <MenuOutlined />
                </IconButton>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src={Logo} alt="Logo" style={{ height: '55px', marginLeft: "5px" }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 1 }}>
                        {/* {title} */}
                        <span style={{color:"black"}}>Keep</span>
                    </Typography>
                </Box>
                <Search>
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
                        <IconButton aria-label="more" aria-controls="icon-menu" aria-haspopup="true" sx={{ color: '#757575' }} onClick={handleClick}>
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
                            <MenuItem>
                                <AccountCircleRoundedIcon />
                            </MenuItem>
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
                        <IconButton sx={{ color: '#757575' }}>
                            <AccountCircleRoundedIcon sx={{ color: '#757575' }} />
                        </IconButton>
                    </Hidden>
                </Box>
            </Toolbar>
        </Navbar>
    );
}

export default Header;
