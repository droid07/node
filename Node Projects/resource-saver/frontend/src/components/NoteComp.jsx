import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useState } from 'react';
import { deleteNote } from '../services/notes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const NoteComp = ({ note, setEditContent, setIsEdit, setEditId }) => {
  const [toggle, setToggle] = useState(false);

  const queryClient = useQueryClient();

  const removeNote = useMutation(deleteNote, {
    onSuccess: () => queryClient.invalidateQueries(['note']),
  });

  const handleDeletion = (id) => {
    const ask = confirm('Are you sure?');
    if (ask) {
      removeNote.mutate(id);
    }
  };

  return (
    <div className='bg-main p-2 rounded-md my-5'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold mb-3'>{note.title}</h1>
        <div className='flex items-center gap-3'>
          {toggle ? (
            <FiChevronUp
              fontSize='1.4rem'
              className='mr-5 cursor-pointer'
              onClick={() => setToggle(!toggle)}
            />
          ) : (
            <FiChevronDown
              fontSize='1.4rem'
              className='mr-5 cursor-pointer'
              onClick={() => setToggle(!toggle)}
            />
          )}
          <FiEdit
            fontSize='1.25rem'
            className='cursor-pointer'
            onClick={() => {
              setEditContent({
                title: note.title,
                content: note.content,
              });
              setEditId(note._id);
              setIsEdit(true);
            }}
          />
          <AiOutlineDelete
            fontSize='1.25rem'
            className='cursor-pointer'
            onClick={() => handleDeletion(note._id)}
          />
        </div>
      </div>
      {toggle && (
        <div
          className='mt-2 my-editor'
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      )}
    </div>
  );
};

export default NoteComp;
