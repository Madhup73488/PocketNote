import React, { useContext } from 'react';
import NoteContext from '../context/Notes/NoteContext';

function NoteItem(props) {
    const context = useContext(NoteContext);
    const { deletenote } = context;
    const { note, updatenote, ShowToast } = props; // Destructure ShowToast from props
    const handleDelete = (id) => {
        deletenote(id);
        ShowToast("Note deleted successfully.", "success"); // Show toast after deleting note
    };

    return (
        <div className="card col-md-3 m-2 text-white " style={{ width: "408px", backgroundColor: "#2b2f32", boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)" }}>
            <div className="card-body ">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <p className="card-text text-success">#{note.tag}</p>
                <div className="flex text-end">
                
                    <i className="fa-solid fa-pen-to-square mx-4 edit" onClick={() => { updatenote(note) }}></i>
                    <i className="fa-solid fa-trash-can delete" onClick={() => { handleDelete(note._id) }}></i>
                </div>
               
            </div>
        </div>
    );
}

export default NoteItem;
