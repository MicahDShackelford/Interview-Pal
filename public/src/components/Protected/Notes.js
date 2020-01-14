import React, {useState, useEffect} from 'react';
import fetcher from '../util/fetch/fetcher';
import { debounce } from 'debounce';
import moment from 'moment';

const Notes = ({ActiveUser}) => {
    const [Notes, SetNotes] = useState([]);
    const [ActiveNote, SetActiveNote] = useState("");
    
    useEffect(() => {
        fetcher.Notes(ActiveUser.id)
            .then((res) => {
                SetNotes(res);
            })
    },[])

    useEffect(() => {
        if(ActiveNote !== "") {
            document.getElementById('trash').classList.add('trash-active');
            document.getElementById('note-area').disabled = false;
            document.getElementById('note-area').value = Notes[ActiveNote.split('-')[1]].content;
            Array.prototype.slice.call(document.getElementsByClassName('active')).forEach(element => {
                element.classList.remove('active');
            });
            document.getElementById(ActiveNote).classList.add('active');
        }
    },[ActiveNote]);

    const createNote = (e) => {
        let notes = Notes.slice();
        let newNote = {title: prompt("Give your note a title"), content: "Write something!", noteId: `note-${notes.length}`, lastUpdate: Date.now()};
        notes.push(newNote);
        SetNotes(notes);
    }

    const ChangeTitle = (e) => {
        console.log(e.target.id);
    }

    const NoteClickHandler = (e) => {
        SetActiveNote(e.target.id);
    }

    const ChangeText = (e) => {
        let notes = Notes.slice();
        // console.log(Notes[ActiveNote.split('-')[1]]);
        console.log(ActiveNote);
        let newNote = {title: Notes[ActiveNote.split('-')[1]].title, content: document.getElementById('note-area').value, noteId: ActiveNote, lastUpdate: Date.now()};
        notes[ActiveNote.split('-')[1]] = newNote;
        SetNotes(notes);
        fetch(`/api/notes/${ActiveUser.id}`, {
            method: "PATCH",
            body: JSON.stringify(notes),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const DeleteNote = (e) => {
        let notes = Notes.slice();
        notes.splice(parseInt(ActiveNote.split('-')[1]), 1);
        for(var i = 0; i < notes.length; i++) {
            notes[i].noteId = `note-${i}`
        }
        SetNotes(notes);
        fetch(`/api/notes/${ActiveUser.id}`, {
            method: "PATCH",
            body: JSON.stringify(notes),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    let debounceChangeNote = debounce(ChangeText, 500);

    return (
        <div id="notes" className="flex column">
            <div className="notes-wrap">
                <div className="note-sidebar">
                    <div className="header p-5">
                        <div className="flex spaced">
                            <h3>Your Notes</h3>
                            <i className="fas fa-edit p-5" onClick={createNote}></i>
                        </div>
                    </div>
                    <div className="note-list">
                        {Notes.map((note) => (
                            <div className="note-item" id={note.noteId} onClick={NoteClickHandler}>
                                <div>
                                    <h5>{note.title}</h5>
                                    <p>Last Edit: {moment(note.lastUpdate).fromNow()}</p>
                                </div>
                                <div>
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="header p-5"></div>
                </div>
                <textarea className="note-main" id="note-area" onChange={debounceChangeNote} disabled></textarea>
                <div className="trash" id="trash" onClick={DeleteNote}>
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        </div>
    )
}

export default Notes;