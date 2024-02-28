import React from 'react'
import Noteslist from './Noteslist';
function Notes(props) {
    const {ShowToast} = props;
    return (<>
        <div className="container pt-5 bg-dark text-white">
            <Noteslist ShowToast={ShowToast} />
        </div>
    </>
    )
}

export default Notes