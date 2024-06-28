import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material/';
import { AddAlertOutlined, PaletteOutlined, PersonAddAltOutlined, MoreVertOutlined, ArchiveOutlined, ImageOutlined, UnarchiveOutlined, Block, Circle, DeleteOutline, RestoreFromTrash } from '@mui/icons-material';
import { Deleting, updateArchive, updateColor, removeNotes } from '../services/Noteservices';

function NoteCard({ note, action, isTrashNote,getData }) {
    const [menu, setMenu] = useState(null);
    const [colorMenu, setColorMenu] = useState(null);

    const open = Boolean(menu);
    const openColor = Boolean(colorMenu);

    const handleClick = (event) => {
        setMenu(event.currentTarget);
    };

    const pickColor = (event) => {
        setColorMenu(event.currentTarget);
    };

    const noteColor = async (color) => {
        setColorMenu(null);
        note.color = color;
        try {
            await updateColor({ noteIdList: [note.id], color });
            getData();
        } catch (error) {
            console.error('Error updating color:', error);
        }
    };

    const deleteNote = async () => {
        try {
            const deleteData = { noteIdList: [note.id], isDeleted: true };
            const response = await Deleting(deleteData);
            console.log('Note deleted:', response);
            getData();
        } catch (error) {
            console.error('Error deleting note:', error);
        } finally {
            setMenu(null);
        }
    };

    const removeNotePermanently = async () => {
        try {
            const response = await removeNotes({ noteIdList: [note.id] });
            console.log('Note permanently deleted:', response);
            action();
        } catch (error) {
            console.error('Error permanently deleting note:', error);
        } finally {
            setMenu(null);
        }
    };

    const restoreNote = async () => {
        try {
            const restoreData = { noteIdList: [note.id], isDeleted: false };
            const response = await Deleting(restoreData);
            console.log('Note restored:', response);
            action();
        } catch (error) {
            console.error('Error restoring note:', error);
        } finally {
            setMenu(null);
        }
    };

    const toggleArchive = async () => {
        try {
            const archiveData = { noteIdList: [note.id], isArchived: !note.isArchived };
            const response = await updateArchive(archiveData);
            console.log('Archive status updated:', response);
            getData();
        } catch (error) {
            console.error('Error updating archive status:', error);
        } finally {
            setMenu(null);
        }
    };

    return (
        <div className="flex flex-col justify-between mt-[-40px] h-[110px] min-h[103px] max-h-[385.2px] w-[250px] border-gray-200 rounded-lg border-2 relative m-[10px] group" style={{ backgroundColor: note.color }}>
            <div className='p-[10px]'>
                <input value={note.title} type='text' className="text-base font-medium leading-6 pt-3 mb-[4px] outline-none bg-transparent" placeholder='Title' readOnly />
                <textarea value={note.description} className="h-full w-full font-normal leading-5 resize-none outline-none bg-transparent overflow-hidden" readOnly />
            </div>
            <div className="hidden justify-around mt-[-30px] group-hover:flex">
                {isTrashNote ? (
                    <>
                        <IconButton onClick={restoreNote} title='Restore' className='!w-[35px] !min-w-0' color="inherit"><RestoreFromTrash style={{ fontSize: 18 }} /></IconButton>
                        <IconButton onClick={removeNotePermanently} title='Delete Forever' className='!w-[35px] !min-w-0' color="inherit"><DeleteOutline style={{ fontSize: 18 }} /></IconButton>
                    </>
                ) : (
                    <>
                        <IconButton title='Remind me' className='!w-[35px] !min-w-0' color="inherit"><AddAlertOutlined style={{ fontSize: 18 }} /></IconButton>
                        <IconButton title='Collaborator' className='!w-[35px] !min-w-0' color="inherit"><PersonAddAltOutlined style={{ fontSize: 18 }} /></IconButton>
                        <IconButton onClick={pickColor} title='Background options' className='!w-[35px] !min-w-0' color="inherit"><PaletteOutlined style={{ fontSize: 18 }} /></IconButton>
                        <IconButton title='Add image' className='!w-[35px] !min-w-0' color="inherit"><ImageOutlined style={{ fontSize: 16 }} /></IconButton>
                        {note.isArchived ? (
                            <IconButton onClick={toggleArchive} title='Unarchive' className='!w-[35px] !min-w-0' color="inherit"><UnarchiveOutlined style={{ fontSize: 18 }} /></IconButton>
                        ) : (
                            <IconButton onClick={toggleArchive} title='Archive' className='!w-[35px] !min-w-0' color="inherit"><ArchiveOutlined style={{ fontSize: 18 }} /></IconButton>
                        )}
                        <IconButton onClick={handleClick} title='More' className='!w-[35px] !min-w-0' aria-controls="simple-menu" aria-haspopup="true" color="inherit"><MoreVertOutlined /></IconButton>
                        <Menu id="simple-menu" open={open} onClose={() => setMenu(null)} anchorEl={menu}>
                            <MenuItem onClick={deleteNote}>Delete</MenuItem>
                            <MenuItem>Share</MenuItem>
                            <MenuItem>Add Label</MenuItem>
                        </Menu>
                    </>
                )}
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

