
import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesinitial = []
    const [notes, setnotes] = useState(notesinitial)

    // get all notes
    const getnotes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
            });
            if (!response.ok) {
                throw new Error("Unauthorized");
            }

            const json = await response.json()
            setnotes(json)
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }

    // add a note
    const addnote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const newNote = await response.json();
        setnotes([...notes, newNote]);
    }


    // edit a note
    const editnote = async (id, title, description, tag) => {
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setnotes(newNotes);
    }

    // delete a note
    const deletenote = async (id) => {
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });

        const newnotes = notes.filter((note) => { return note._id !== id })
        setnotes(newnotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
