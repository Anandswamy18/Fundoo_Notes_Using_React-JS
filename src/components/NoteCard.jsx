import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { AddAlertOutlined, PaletteOutlined, PersonAddAltOutlined, MoreVertOutlined, ArchiveOutlined, ImageOutlined, UnarchiveOutlined, DeleteForever, RestoreFromTrash, CheckCircle, Circle, Block } from '@mui/icons-material';
import { Deleting } from '../services/Noteservices'; 

function NoteCard({ note, action, info }) {
    const [menu, setMenu] = useState(null);
    const [colorMenu, setColorMenu] = useState(null);

    const open = Boolean(menu);
    const openColor = Boolean(colorMenu);

    const handleClick = (e) => {
        setMenu(e.currentTarget);
    };

    const pickColor = (e) => {
        setColorMenu(e.currentTarget);
    };

    const noteColor = (color) => {
        setColorMenu(null);
        note.color = color;
    };

    const Delete1 = async () => {
        let deletenote = { noteIdList: [info.id], isDeleted: true };
        let response = await Deleting(deletenote);
        console.log(response);
    };

    return (
        <div className="flex flex-col justify-between mt-[-40px] h-[110px] min-h-[103px] max-h-[385.2px] w-[250px] border-gray-200 rounded-lg border-2 relative m-[10px] group" style={{ backgroundColor: note.color }}>
            <div className='p-[10px]'>
                <input value={note.title} type='text' className="text-base font-medium leading-6 pt-3 font-family: 'Google Sans', Roboto, Arial, sans-serif mb-[4px] outline-none bg-transparent" placeholder='Title' readOnly />
                <textarea value={note.description} className="h-full w-full font-normal leading-5 font-family: Roboto, Arial, sans-serif resize-none outline-none bg-transparent overflow-hidden" readOnly />
            </div>
            <div className="hidden justify-around mt-[-30px] group-hover:flex ">
                <IconButton title='Remind me' className='!w-[35px] !min-w-0' color="inherit"><AddAlertOutlined style={{ fontSize: 18 }} /></IconButton>
                <IconButton title='Collaborator' className='!w-[35px] !min-w-0' color="inherit"><PersonAddAltOutlined style={{ fontSize: 18 }} /></IconButton>
                <IconButton onClick={pickColor} title='Background options' className='!w-[35px] !min-w-0' color="inherit"><PaletteOutlined style={{ fontSize: 18 }} /></IconButton>
                <IconButton title='Add image' className='!w-[35px] !min-w-0' color="inherit"><ImageOutlined style={{ fontSize: 16 }} /></IconButton>
                {note.isArchived ? (
                    <IconButton onClick={() => action(note.id, "unarchive")} title='Unarchive' className='!w-[35px] !min-w-0' color="inherit"><UnarchiveOutlined style={{ fontSize: 18 }} /></IconButton>
                ) : (
                    <IconButton onClick={() => action(note.id, "archive")} title='Archive' className='!w-[35px] !min-w-0' color="inherit"><ArchiveOutlined style={{ fontSize: 18 }} /></IconButton>
                )}
                <IconButton onClick={handleClick} title='More' className='!w-[35px] !min-w-0' aria-controls="simple-menu" aria-haspopup="true" color="inherit"><MoreVertOutlined /></IconButton>
                <Menu id="simple-menu" open={open} onClose={() => setMenu(null)} anchorEl={menu}>
                    <MenuItem onClick={Delete1}>Delete</MenuItem>
                    <MenuItem>Share</MenuItem>
                    <MenuItem>Add Label</MenuItem>
                </Menu>
            </div>
            <Menu open={openColor} onClose={() => setColorMenu(null)} anchorEl={colorMenu}>
                <div className='flex'>
                    <IconButton onClick={() => noteColor('#FFFFFF')}><Block /></IconButton>
                    <IconButton onClick={() => noteColor('#94bbe9')}><Circle sx={{ color: '#94bbe9' }} /></IconButton>
                    <IconButton onClick={() => noteColor('#32a852')}><Circle sx={{ color: '#32a852' }} /></IconButton>
                    <IconButton onClick={() => noteColor('#4287f5')}><Circle sx={{ color: '#4287f5' }} /></IconButton>
                    <IconButton onClick={() => noteColor('#FF5733')}><Circle sx={{ color: '#FF5733' }} /></IconButton>
                    <IconButton onClick={() => noteColor('#FFBD33')}><Circle sx={{ color: '#FFBD33' }} /></IconButton>
                    <IconButton onClick={() => noteColor('#33FFBD')}><Circle sx={{ color: '#33FFBD' }} /></IconButton>
                </div>
            </Menu>
        </div>
    );
}

export default NoteCard;
