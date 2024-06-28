import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import NoteCard from './NoteCard';
import { getTrash } from '../services/Noteservices'; 

const TrashContainer = () => {
    const [info, setInfo] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [error, setError] = useState(null);

    const getData = async () => {
        try {
            const response = await getTrash();
            if (response && response.data && response.data.data && Array.isArray(response.data.data.data)) {
                const notes = response.data.data.data;
                console.log(notes)
                const filteredNotes = notes.filter(note => note.isDeleted);
                setInfo(filteredNotes);
            } else {
                setError('Data is not in the expected format');
            }
            setLoaded(true);
        } catch (error) {
            setError('Error fetching trashed notes. Please try again.');
            console.error('Error fetching trashed notes:', error);
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
    }, []);

    const fetchData = () => {
        getData(); 
    };

    return (
        <div className='flex flex-col items-center'>
            <br />
            <br />
            <br />
            <br />
            <div className={`${isMobileView ? 'grid grid-cols-1' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-x-4 gap-y-10 mt-[50px] `}>
                {loaded ? (
                    error ? (
                        <div>{error}</div>
                    ) : (
                        info.map((note) => (
                            <div key={note.id}>
                                <NoteCard note={note} action={fetchData} isTrashNote={true}   />
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

export default TrashContainer;
