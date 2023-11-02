import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-4">
      <div className="card my-4">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                className="far fa-trash-alt mx-2 text-danger cursor-pointer"
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert('Deleted successfully', 'success');
                }}
              ></i>
              <i
                className="far fa-edit mx-2 text-primary cursor-pointer"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
