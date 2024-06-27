import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import NoteCard from './NoteCard';
import TakeNote from './TakeNote';
import { getNotes, getArchive } from '../services/Noteservices'; 

const NotesContainer = ({ writeNote }) => {
    const [info, setInfo] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [error, setError] = useState(null);
    const [expandNote, setExpandNote] = useState(false);

    const getData = async () => {
        try {
            let response;
            if (writeNote === 'Notes') {
                response = await getNotes();
            } else if (writeNote === 'Archive') {
                response = await getArchive();
            }

            let arr = response.data.data.data;
            let newArr = [];

            if (writeNote === 'Notes') {
                newArr = arr.filter((note) => !note.isArchived && !note.isDeleted);
            } else if (writeNote === 'Archive') {
                newArr = arr.filter((note) => note.isArchived && !note.isDeleted);
            } else if (writeNote === 'Trash') {
                newArr = arr.filter((note) => !note.isArchived && note.isDeleted);
            }
            setInfo(newArr);
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
    }, [writeNote]);

    const fetchData = () => {
        getData();
    };

    return (
        <div className='flex flex-col items-center'>
            <TakeNote expandNote={expandNote} setExpandNote={setExpandNote} fetchData={fetchData} />
            <br />
            <div onClick={() => setExpandNote(false)} className={`${isMobileView ? 'grid grid-cols-1' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-x-4 gap-y-10 mt-[50px] `}>
                {loaded ? (
                    error ? (
                        <div>{error}</div>
                    ) : (
                        info.map((note) => (
                            <div key={note.id}>
                                <NoteCard info={info} note={note} action={() => {}} />
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
