import React, { useContext, useEffect, useState, useRef } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import NoteContext from '../context/Notes/NoteContext';
import { useNavigate } from 'react-router-dom';

function Noteslist(props) {
    const { ShowToast } = props;
    const context = useContext(NoteContext);
    const { notes, getnotes, editnote } = context;
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getnotes();
        }
        else {
            navigate('/SignUpOrLogin')
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const updatenote = (currentNote) => {
        ref.current.click();
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    // Function to handle changes in the form fields
    const handleChange = (e) => {
        setnote({
            ...note,
            [e.target.name]: e.target.value
        });
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        editnote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click(); // Close the modal
        props.ShowToast("Notes updated successfully", "success");
    }

    return (
        <>
            <AddNote ShowToast={ShowToast} />

            {/* Hidden button to trigger the modal */}
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
            </button>

            {/* Modal for editing a note */}
            <div className="modal fade text-white" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header ">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" placeholder="Your title" value={note.etitle} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name="edescription" rows="3" value={note.edescription} onChange={handleChange} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" placeholder="Your tag" value={note.etag} onChange={handleChange} required />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container row">
                <h2 className=''>Your Notes</h2>
                {notes.length === 0 ?
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <i className="fa-solid fa-cloud fs-1 mt-5"></i>
                        <p className='fs-7'>No Notes Available</p>
                    </div>
                    :
                    notes.map((note) => {
                        return <NoteItem key={note._id} updatenote={updatenote} note={note} ShowToast={ShowToast} />;
                    })
                }
            </div>
        </>
    );
}

export default Noteslist;
