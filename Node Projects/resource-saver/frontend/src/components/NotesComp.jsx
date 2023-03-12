import React from 'react';
import NoteComp from './NoteComp';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const NotesComp = ({ notes, setEditContent, setIsEdit, setEditId }) => {
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent}>
      {notes?.map((note) => (
        <NoteComp
          note={note}
          key={note._id}
          setEditContent={setEditContent}
          setIsEdit={setIsEdit}
          setEditId={setEditId}
        />
      ))}
    </div>
  );
};

export default NotesComp;
