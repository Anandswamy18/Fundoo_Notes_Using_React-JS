import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Modal } from '@mui/material/';
import { AddAlertOutlined, PaletteOutlined, PersonAddAltOutlined, MoreVertOutlined, ArchiveOutlined, ImageOutlined, UnarchiveOutlined, Block, Circle, DeleteOutline, RestoreFromTrash } from '@mui/icons-material';
import { Deleting, updateArchive, updateColor, removeNotes,updateNote } from '../services/Noteservices';

function NoteCard({ note, action, isTrashNote, getData }) {
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [colorMenuAnchorEl, setColorMenuAnchorEl] = useState(null);
    const [editNote, setEditNote] = useState(false);
    const [editTitle, setEditTitle] = useState(note.title || "");
    const [editDescription, setEditDescription] = useState(note.description || "");

    const handleMenuClick = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleColorMenuClick = (event) => {
        setColorMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleColorMenuClose = () => {
        setColorMenuAnchorEl(null);
    };

    const noteColor = async (color) => {
        handleColorMenuClose();
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
            await Deleting(deleteData);
            getData();
        } catch (error) {
            console.error('Error deleting note:', error);
        } finally {
            handleMenuClose();
        }
    };

    const removeNotePermanently = async () => {
        try {
            await removeNotes({ noteIdList: [note.id] });
            action();
        } catch (error) {
            console.error('Error permanently deleting note:', error);
        } finally {
            handleMenuClose();
        }
    };

    const restoreNote = async () => {
        try {
            const restoreData = { noteIdList: [note.id], isDeleted: false };
            await Deleting(restoreData);
            action();
        } catch (error) {
            console.error('Error restoring note:', error);
        } finally {
            handleMenuClose();
        }
    };

    const toggleArchive = async () => {
        try {
            const archiveData = { noteIdList: [note.id], isArchived: !note.isArchived };
            await updateArchive(archiveData);
            getData();
        } catch (error) {
            console.error('Error updating archive status:', error);
        } finally {
            handleMenuClose();
        }
    };

    const handleEditNote = (action) => {
        if (action === "open") {
            setEditNote(true);
        } else {
            setEditNote(false);
        }
    };

    const handleEditSave = async () => {
        setEditNote(false);
        note.title = editTitle;
        note.description = editDescription;
        try {
            await updateNote({
                noteIdList: [note.id],
                title: editTitle,
                description: editDescription
            });
            console.log(note.id,editTitle,editDescription)
            getData();
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <div className="flex flex-col justify-between mt-[-40px] h-[110px] min-h[103px] max-h-[385.2px] w-[250px] border-gray-200 rounded-lg border-2 relative m-[10px] group" style={{ backgroundColor: note.color }}>
            <div className='p-[8px]' onClick={() => handleEditNote('open')}>
                <input value={note.title} type='text' className="text-base font-medium leading-6 pt-2 mb-[4px] outline-none bg-transparent" placeholder='Title' readOnly />
                <textarea value={note.description} className="h-full w-full font-normal leading-5 resize-none outline-none bg-transparent overflow-hidden" readOnly />
            </div>
            <div className="opacity-0 group-hover:opacity-100 visibility-hidden group-hover:visibility-visible transition-opacity duration-200 ease-in-out flex justify-around mt-[-30px]">
                {isTrashNote ? (
                    <>
                        <IconButton onClick={restoreNote} title='Restore' className='!w-[35px] !min-w-0' color="inherit"><RestoreFromTrash style={{ fontSize: 18 }} /></IconButton>
                        <IconButton onClick={removeNotePermanently} title='Delete Forever' className='!w-[35px] !min-w-0' color="inherit"><DeleteOutline style={{ fontSize: 18 }} /></IconButton>
                    </>
                ) : (
                    <>
                        <IconButton title='Remind me' className='!w-[35px] !min-w-0' color="inherit"><AddAlertOutlined style={{ fontSize: 18 }} /></IconButton>
                        <IconButton title='Collaborator' className='!w-[35px] !min-w-0' color="inherit"><PersonAddAltOutlined style={{ fontSize: 18 }} /></IconButton>
                        <IconButton onClick={handleColorMenuClick} title='Background options' className='!w-[35px] !min-w-0' color="inherit"><PaletteOutlined style={{ fontSize: 18 }} /></IconButton>
                        <IconButton title='Add image' className='!w-[35px] !min-w-0' color="inherit"><ImageOutlined style={{ fontSize: 16 }} /></IconButton>
                        {note.isArchived ? (
                            <IconButton onClick={toggleArchive} title='Unarchive' className='!w-[35px] !min-w-0' color="inherit"><UnarchiveOutlined style={{ fontSize: 18 }} /></IconButton>
                        ) : (
                            <IconButton onClick={toggleArchive} title='Archive' className='!w-[35px] !min-w-0' color="inherit"><ArchiveOutlined style={{ fontSize: 18 }} /></IconButton>
                        )}
                        <IconButton onClick={handleMenuClick} title='More' className='!w-[35px] !min-w-0' aria-controls="simple-menu" aria-haspopup="true" color="inherit"><MoreVertOutlined /></IconButton>
                        <Menu id="simple-menu" open={Boolean(menuAnchorEl)} onClose={handleMenuClose} anchorEl={menuAnchorEl}>
                            <MenuItem onClick={deleteNote}>Delete</MenuItem>
                            <MenuItem>Share</MenuItem>
                            <MenuItem>Add Label</MenuItem>
                        </Menu>
                    </>
                )}
            </div>
            <Menu open={Boolean(colorMenuAnchorEl)} onClose={handleColorMenuClose} anchorEl={colorMenuAnchorEl}>
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

            <Modal open={editNote} onClose={() => setEditNote(false)}  >
                <div className="h-[136px] w-[600px] border border-solid border-gray-400 m-auto shadow-md rounded-lg flex flex-col bg-white mt-[190px] " style={{ backgroundColor: note.color }}>
                    <div className="h-16 w-full flex items-center">
                        <input type="text" id="title" style={{ backgroundColor: note.color }} onChange={(e) => setEditTitle(e.target.value)} value={editTitle} className="h-full w-[400px] ml-[20px] border-none outline-none text-lg" />
            
                    </div>
                    <span className="h-16 w-full" >
                        <input type="text" id="desc" style={{ backgroundColor: note.color }} value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="h-full w-[560px] ml-[20px] border-none outline-none text-lg" />
                    </span>
                    <div className="ml-[8px] mt-3 h-8 flex items-center justify-between">
                        <div className="icon-container ml-4">
                            <IconButton title='Remind me' className='!w-[35px] !min-w-0' color="inherit"><AddAlertOutlined style={{ fontSize: 18 }} /></IconButton>
                            <IconButton title='Collaborator' className='!w-[35px] !min-w-0' color="inherit"><PersonAddAltOutlined style={{ fontSize: 18 }} /></IconButton>
                            <IconButton onClick={handleColorMenuClick}  title='Background options' className='!w-[35px] !min-w-0' color="inherit"><PaletteOutlined style={{ fontSize: 18 }} /></IconButton>
                            <IconButton title='Add image' className='!w-[35px] !min-w-0' color="inherit"><ImageOutlined style={{ fontSize: 16 }} /></IconButton>
                            {note.isArchived ? (
                                <IconButton onClick={toggleArchive} title='Unarchive' className='!w-[35px] !min-w-0' color="inherit"><UnarchiveOutlined style={{ fontSize: 18 }} /></IconButton>
                            ) : (
                                <IconButton onClick={toggleArchive} title='Archive' className='!w-[35px] !min-w-0' color="inherit"><ArchiveOutlined style={{ fontSize: 18 }} /></IconButton>
                            )}
                            <IconButton onClick={handleMenuClick} title='More' className='!w-[35px] !min-w-0' aria-controls="simple-menu" aria-haspopup="true" color="inherit"><MoreVertOutlined /></IconButton>
                            <Menu id="simple-menu" open={Boolean(menuAnchorEl)} onClose={handleMenuClose} anchorEl={menuAnchorEl}>
                                <MenuItem onClick={deleteNote}>Delete</MenuItem>
                                <MenuItem>Share</MenuItem>
                                <MenuItem>Add Label</MenuItem>
                            </Menu>
                            <Menu open={Boolean(colorMenuAnchorEl)} onClose={handleColorMenuClose} anchorEl={colorMenuAnchorEl}>
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
                        <button onClick={handleEditSave} className="h-7 w-20 bg-gray-200 mr-3 rounded">Save</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default NoteCard;



