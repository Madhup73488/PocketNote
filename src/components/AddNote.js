import React, { useState } from 'react';
import NoteContext from '../context/Notes/NoteContext';
import { useContext } from 'react';

function AddNote(props) {
    const context = useContext(NoteContext);
    const { addnote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.ShowToast("Notes added successfully", "primary");
    }

    return (
        <div className="container bg-dark text-white">
            <h3>Add Notes</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" style={{ backgroundColor: "#ffffffbf" }} id="title" name="title" placeholder="Your title" value={note.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" style={{ backgroundColor: "#ffffffbf" }} id="description" name="description" rows="3" placeholder="Your description" value={note.description} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" style={{ backgroundColor: "#ffffffbf" }} id="tag" name="tag" placeholder="Your tag" value={note.tag} onChange={handleChange} required />
                </div>
                <div className='row justify-content-center'>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary w-full">Add Note</button>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default AddNote;
