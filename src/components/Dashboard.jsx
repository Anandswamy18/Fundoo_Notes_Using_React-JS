import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer as MuiDrawer } from '@mui/material';
import NavList from './Navlist';
import Header from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    marginTop: 10,
    border: 'none'
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    marginTop: 10,
    border: 'none'
});

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        })
    }),
);

const Sidebar = () => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('Keep');

    const handleDrawer = () => {
        setOpen(prevState => !prevState);
    };

    const changeNavTitle = (title) => {
        setTitle(title);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Header initialTitle="Keep" open={open} title={title} handleDrawer={handleDrawer} />
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader sx={{marginTop:"-10px"}} />
                    <NavList open={open} setOpen={setOpen} changeNavTitle={changeNavTitle} />
                    {open && (
                        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2 }}>
                           
                        </Box>  
                    )}
                </Drawer>
            </Box>
            <Outlet/>
        </>
    );
}

export default Sidebar;
