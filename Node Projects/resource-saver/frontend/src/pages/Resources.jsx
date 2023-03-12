import React, { useEffect } from 'react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAllNotes, updateNote } from '../services/notes';
import NotesComp from '../components/NotesComp';
import Spinner from '../components/Spinner';
import { createNote } from '../services/notes';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Resources = () => {
  const { slug } = useParams();

  const { isLoading, isError, data } = useQuery(['note', slug], () =>
    getAllNotes(slug)
  );

  const queryClient = useQueryClient();

  const addNote = useMutation(createNote, {
    onSuccess: () => queryClient.invalidateQueries(['note']),
  });

  const editNote = useMutation(updateNote, {
    onSuccess: () => queryClient.invalidateQueries(['note']),
  });

  const [title, setTitle] = useState('dd');
  const [content, setContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState({
    title: '',
    content: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    isEdit && setTitle(editContent.title);
    isEdit && setContent(editContent.content);
    !isEdit && setTitle('');
    !isEdit && setContent('');

    if (addNote.isError === true) {
      toast.error(addNote.error.message, {
        position: 'top-center',
        theme: 'colored',
      });
    }
  }, [isEdit, editContent, addNote.isError, addNote.error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    isEdit
      ? editNote.mutate({ id: editId, title, content })
      : addNote.mutate({ id: data.resources._id, title, content });
    setIsEdit(false);
    setTitle('');
    setContent('');
  };

  if (isLoading === true) {
    return <Spinner />;
  }
  if (isError === true) {
    return <h1 className='text-center mt-10'>Something went wrong</h1>;
  }

  return (
    <div className='py-10'>
      <form className='mt-5' onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border border-primary p-3 w-full rounded-md outline-none text-black'
        />
        <div className='mt-5 text-black'>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            // config={{
            //   image: {
            //     toolbar: ['toggleImageCaption', 'imageTextAlternative'],
            //   },
            //   toolbar: [
            //     'heading',
            //     '|',
            //     'bold',
            //     'italic',
            //     'link',
            //     'bulletedList',
            //     'numberedList',
            //     'blockQuote',
            //   ],
            //   heading: {
            //     options: [
            //       {
            //         model: 'paragraph',
            //         title: 'Paragraph',
            //         class: 'ck-heading_paragraph',
            //       },
            //       {
            //         model: 'heading1',
            //         view: 'h1',
            //         title: 'Heading 1',
            //         class: 'ck-heading_heading1',
            //       },
            //       {
            //         model: 'heading2',
            //         view: 'h2',
            //         title: 'Heading 2',
            //         class: 'ck-heading_heading2',
            //       },
            //     ],
            //   },
            // }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
        </div>
        <button className='bg-primary text-white px-5 py-1 rounded-md mt-5'>
          {isEdit ? 'Edit Note' : 'Add Note'}
        </button>
      </form>

      <div className='my-5'>
        <h1 className='text-2xl'>Notes</h1>

        {data.resources.notes.length === 0 && (
          <h2 className='mt-3 text-xl'>No notes to show</h2>
        )}

        <div className='my-5'>
          <NotesComp
            notes={data.resources.notes}
            setEditContent={setEditContent}
            setIsEdit={setIsEdit}
            setEditId={setEditId}
          />
        </div>
      </div>
    </div>
  );
};

export default Resources;
