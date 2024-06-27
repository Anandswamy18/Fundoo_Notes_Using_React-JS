import React, { useState } from 'react';
import { IconButton, Input, Menu } from '@mui/material';
import { Redo, Undo, AddAlertOutlined, PaletteOutlined, PersonAddAltOutlined, MoreVertOutlined, ArchiveOutlined, ImageOutlined, Brush, CheckBoxOutlined, Circle, Block } from '@mui/icons-material';
import BrushIcon from '@mui/icons-material/BrushOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBoxOutlined';
import ImageIcon from '@mui/icons-material/ImageOutlined';
import { createNote } from '../services/Noteservices';
import { Outlet } from 'react-router-dom';
import pin from '../assets/pin.svg'


export default function TakeNote({ expandNote, setExpandNote, fetchData }) {
    const [colorMenu, setColorMenu] = useState(null);
    const openColor = Boolean(colorMenu);
    const [color, setColor] = useState("#ffffff");
    const [title, setTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [isArchived, setIsArchived] = useState(false);

    const pickColor = (e) => {
        setColorMenu(e.currentTarget);
    };

    const noteColor = (colour) => {
        setColor(colour);
        setColorMenu(null);
    };

    const handleInputChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setNoteContent(e.target.value);
    };
  
    const addNote = async () => {       
        try {
            setExpandNote(false); 
            const noteData = { 
                title, 
                description: noteContent, 
                color, 
                isArchived 
            };
            await createNote(noteData); 
            setExpandNote(false); 
            setTitle('');
            setNoteContent('');
            setColor("#ffffff");
            setIsArchived(false);
            fetchData();
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    const toggleArchive = () => {
        setIsArchived(!isArchived); 
    };

    return (
        <div className={`${
            expandNote ? "w-[310px] xl:w-[600px] border-gray-200 rounded-lg border-2 relative m-[30px] bg-white fixed top-10 z-10" : "h-[46px] border-gray-100 rounded-lg border-2 relative mt-[90px] xl:w-[600px]"
        }`} style={{ backgroundColor: color, boxShadow: '0 4px 6px rgba(0, 0.2, 0.2, 0.3)', marginLeft: expandNote ? '0' : '10px' }}>
            {expandNote ?
                <div className='pt-[5px] pr-[10px] pl-[10px] pb-[2px]' >
                    <Input type='text' value={title} onChange={handleInputChange} className="w-full mb-[2px] text-base font-medium leading-6 pt-3 outline-none bg-transparent" placeholder='Title' disableUnderline={true} sx={{ fontFamily: "unset", fontWeight: 500 }} />
                    <Input value={noteContent} onChange={handleContentChange} className="h-full w-full font-normal leading-5 resize-none outline-none bg-transparent" placeholder='Take Note...' disableUnderline={true} multiline={true} minRows={2} maxRows={6} sx={{ fontFamily: "unset", fontWeight: 500 }} />
                </div>
                :
                <div onClick={() => setExpandNote(true)} className="pt-[2px] pr-[10px] pl-[40px] pb-[4px] flex items-center gap-[20px]">
                    <label className="text-left text-slate-400 w-full mb-[4px] text-base font-medium leading-6 outline-none">Take Note...</label>
                    <div className='flex justify-between items-center w-[160px] pl-[10px]'>
                        <IconButton title='Checkbox' className='!w-[35px] !min-w-0'><CheckBoxIcon /></IconButton>
                        <IconButton title='Brush' className='!w-[35px] !min-w-0'><BrushIcon /></IconButton>
                        <IconButton title='Image' className='!w-[35px] !min-w-0'><ImageIcon /></IconButton>
                    </div>
                </div>
            }
            {expandNote && (
                <div className='mb-[4px] flex flex-wrap justify-between ml-[10px] xl:mr-[10px]'>
                    <div className="flex flex-wrap xl:gap-[15px]">
                        <IconButton title='Remind me' className='!w-[35px] !min-w-0'><AddAlertOutlined /></IconButton>
                        <IconButton title='Collaborator' className='!w-[35px] !min-w-0'><PersonAddAltOutlined /></IconButton>
                        <IconButton onClick={pickColor} title='Background options' className='!w-[35px] !min-w-0'><PaletteOutlined /></IconButton>
                        <IconButton title='Add image' className='!w-[35px] !min-w-0'><ImageOutlined /></IconButton>
                        <IconButton title='Archive' className='!w-[35px] !min-w-0' onClick={toggleArchive}><ArchiveOutlined /></IconButton>
                        <IconButton title='More' className='!w-[35px] !min-w-0'><MoreVertOutlined /></IconButton>
                        <IconButton title='Undo' className='!w-[35px] !min-w-0' disabled={!noteContent}><Undo sx={{ fontSize: 20 }} /></IconButton>
                        <IconButton title='Redo' className='!w-[35px] !min-w-0' disabled={!noteContent}><Redo sx={{ fontSize: 18 }} /></IconButton>
                    </div>
                    <IconButton onClick={addNote} className='!normal-case !text-base font-semibold !text-black'>Close</IconButton>
                </div>
            )}
            {expandNote &&
                <button title='Pin Note' className='absolute top-2 right-2'><img src={pin} alt="Pin Note" /></button>
            }
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
            <Outlet/>
        </div>
    );
}
