import axios from 'axios';

const headerConfig = {
    headers: {
        Authorization: localStorage.getItem('token')
        
    }
}
export const createNote = async (obj) => {
    let response = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes", obj, headerConfig);
    return response;
}

export const updateNote = async (obj) => {
    let response = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes", obj, headerConfig);
    return response;
}

export const archiveNote = async (obj) => {
    let response = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes", obj, headerConfig);
    return response;
}
export const updateArchive= async(obj)=>{
    let response = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",obj,headerConfig)
    return response
}
export const Deleting = async (obj) => {
    let response = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes", obj, headerConfig);
    return response;
}

export const getNotes = async () => {
    let response = await axios.get("https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList", headerConfig);
    return response;
}

export const updateColor = async (obj) => {
    let response = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes", obj, headerConfig);
    return response;
}

export const getArchive = async () => {
    const response =  await axios.get("https://fundoonotes.incubation.bridgelabz.com/api/notes/getArchiveNotesList",headerConfig);
    return response;
}