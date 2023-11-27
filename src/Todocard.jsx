//import React, { useState,useEffect} from 'react';
import React, { useState } from 'react';

const Todocard = ({ todo, onDelete, onUpdateStatus, onEdit, onUpdate }) => {
  const [editedTaskName, setEditedTaskName] = useState(todo.taskName);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    onDelete();
  };

  const handleEdit = () => {
    setIsEditing(true);
    onEdit();
  };

  const handleUpdate = () => {
    setIsEditing(false);
    onUpdate({
      taskName: editedTaskName,
      description: editedDescription,
    });
  };

  return (
    <div className="col-xl-4 col-md-6 col-sm-6 px-5 px-sm-1 px-lg-4 py-3">
      <div className="card p-3" style={{ backgroundColor: "#ccf5d3", border: "0" }}>
        <div className='card-body'>
          <section>
            <div className='namedetails'>
              <span>Name:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={editedTaskName}
                  onChange={(e) => setEditedTaskName(e.target.value)}
                />
              ) : (
                <span>{todo.taskName}</span>
              )}
            </div>
            <div className='discrioption'>
              <span>Description:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              ) : (
                <span>{todo.description}</span>
              )}
            </div>
            <div>
              <label htmlFor='status'>Status</label>
              <select
                value={todo.status}
                onChange={(e) => onUpdateStatus(e.target.value)}
                className={`select ms-2 color-white ${todo.status === 'Completed' ? 'light-green-sts' : 'light-danger'}`}
              >
                <option value="Not Completed">Not Completed</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className='text-end mt-4'>
              {isEditing ? (
                <button
                  className='btn btn-primary btn-light-green me-4 px-4'
                  type='button'
                  onClick={handleUpdate}
                >
                  Update
                </button>
              ) : (
                <button
                  className='btn btn-primary btn-light-green me-4 px-4'
                  type='button'
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
              <button className='btn btn-danger px-3' type='button' onClick={handleDelete}>
                Delete
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Todocard;
