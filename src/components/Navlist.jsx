import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import { LightbulbOutlined, ArchiveOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const Navlist = ({ open, setOpen, changeNavTitle }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleDrawer = () => {
        setOpen(!open);
    };

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        const titles = ['Notes', 'Reminders', 'Edit Labels', 'Archive', 'Trash'];
        const selectedTitle = titles[index];
        changeNavTitle(selectedTitle);
    };

    const handleMouseEnter = () => {
        setOpen(true);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
        setIsHovered(false);
    };

    const sidebarLinks = [
        {
            id: 0,
            label: 'Notes',
            icon: <LightbulbOutlined />,
        },
        {
            id: 1,
            label: 'Reminders',
            icon: <NotificationsOutlinedIcon />,
        },
        {
            id: 2,
            label: 'Edit Labels',
            icon: <EditOutlinedIcon />,
        },
        {
            id: 3,
            label: 'Archive',
            icon: <ArchiveOutlined />,
        },
        {
            id: 4,
            label: 'Trash',
            icon: <DeleteOutlineOutlined />,
        },
    ];

    return (
        <List>
            {sidebarLinks.map((list, index) => (
                <ListItem
                    key={list.id}
                    disablePadding
                    onClick={() => handleListItemClick(index)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            backgroundColor: selectedIndex === index && open ? '#feefc3' : 'transparent',
                            borderBottomRightRadius: open ? '50px' : '0',
                            borderTopRightRadius: open ? '50px' : '0',
                        }}
                        onClick={handleDrawer}
                    >
                        <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                            <Box
                                sx={{
                                    bgcolor: selectedIndex === index && !isHovered ? '#feefc3' : 'transparent',
                                    borderRadius: '50%',
                                    width: 36,
                                    height: 36,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {list.icon}
                            </Box>
                        </ListItemIcon>
                        <ListItemText primary={list.label} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default Navlist;
