// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiBaseUrl = 'YOUR_API_GATEWAY_BASE_URL';

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ content: '', image: '' });
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const response = await axios.get(`${apiBaseUrl}/notes`);
        setNotes(response.data);
    };

    const createNote = async () => {
        const response = await axios.post(`${apiBaseUrl}/notes`, newNote);
        fetchNotes();
        setNewNote({ content: '', image: '' });
    };

    const updateNote = async (noteId) => {
        await axios.put(`${apiBaseUrl}/notes/${noteId}`, selectedNote);
        fetchNotes();
        setSelectedNote(null);
    };

    const deleteNote = async (noteId) => {
        await axios.delete(`${apiBaseUrl}/notes/${noteId}`);
        fetchNotes();
    };

    return (
        <div className="App">
            <h1>Notes</h1>
            <input
                type="text"
                placeholder="Note Content"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            />
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setNewNote({ ...newNote, image: reader.result.split(',')[1] });
                    };
                    reader.readAsDataURL(file);
                }}
            />
            <button onClick={createNote}>Create Note</button>

            <h2>Existing Notes</h2>
            <ul>
                {notes.map(note => (
                    <li key={note.noteId}>
                        <p>{note.content}</p>
                        <img src={note.imageUrl} alt="Note" />
                        <button onClick={() => setSelectedNote(note)}>Edit</button>
                        <button onClick={() => deleteNote(note.noteId)}>Delete</button>
                    </li>
                ))}
            </ul>

            {selectedNote && (
                <div>
                    <h2>Edit Note</h2>
                    <input
                        type="text"
                        value={selectedNote.content}
                        onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })}
                    />
                    <button onClick={() => updateNote(selectedNote.noteId)}>Update Note</button>
                </div>
            )}
        </div>
    );
}

export default App;
