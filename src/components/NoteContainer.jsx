import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import NoteCard from './NoteCard';
import TakeNote from './TakeNote';
import { getNotes } from '../services/Noteservices';

const NotesContainer = () => {
    const [info, setInfo] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [error, setError] = useState(null);
    const [expandNote, setExpandNote] = useState(false);

    const getData = async () => {
        try {
            const response = await getNotes();
            if (response && response.data && response.data.data && Array.isArray(response.data.data.data)) {
                const notes = response.data.data.data;
                const filteredNotes = notes.filter(note => !note.isArchived && !note.isDeleted);
                setInfo(filteredNotes);
            } else {
                setError('Data is not in the expected format');
            }
            setLoaded(true);
        } catch (error) {
            setError('Error fetching notes. Please try again.');
            console.error('Error fetching notes:', error);
        }
    };

    const handleResize = () => {
        setIsMobileView(window.innerWidth < 768);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        getData();
    }, [expandNote]);

    const fetchData = () => {
        getData();
    };

    return (
        <div className='flex flex-col items-center'>
            <TakeNote expandNote={expandNote} setExpandNote={setExpandNote} fetchData={fetchData} />
            <br />
            <div onClick={() => setExpandNote(false)} className={`${isMobileView ? 'grid grid-cols-1' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-x-4 gap-y-10 mt-[50px]`}>
                {loaded ? (
                    error ? (
                        <div>{error}</div>
                    ) : (
                        info.map((note) => (
                            <div key={note.id}>
                                <NoteCard note={note} getData={getData} />
                            </div>
                        ))
                    )
                ) : (
                    <CircularProgress />
                )}
            </div>
        </div>
    );
};

export default NotesContainer;

