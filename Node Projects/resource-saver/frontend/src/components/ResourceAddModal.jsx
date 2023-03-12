import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { createResource, updateResource } from '../services/resources';
import { toast } from 'react-toastify';

const ResourceAddModal = ({
  isOpen,
  closeModal,
  editContent,
  isEdit,
  setIsEdit,
  editId,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [windowWidth, setWindowWidth] = useState(0);

  const queryClient = useQueryClient();

  const addResource = useMutation(createResource, {
    onSuccess: () => queryClient.invalidateQueries(['resources']),
  });

  const editResource = useMutation(updateResource, {
    onSuccess: () => queryClient.invalidateQueries(['resources']),
  });

  useEffect(() => {
    setWindowWidth(window.screen.width);
    isEdit && setTitle(editContent.title);
    isEdit && setDescription(editContent.description);
    !isEdit && setTitle('');
    !isEdit && setDescription('');

    if (addResource.isError === true) {
      toast.error(addResource.error.message, {
        position: 'top-center',
        theme: 'colored',
      });
    }
  }, [isEdit, editContent, addResource.isError, addResource.error]);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: `${windowWidth <= 500 ? '90%' : '30%'}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: '#1F2937',
      color: 'black',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,.80)',
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEdit
      ? editResource.mutate({ id: editId, name: title, description })
      : addResource.mutate({ name: title, description });
    setIsEdit(false);
    setTitle('');
    setDescription('');
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        closeModal();
        setIsEdit(false);
      }}
      style={customStyles}
      ariaHideApp={false}
      contentLabel='post Modal'
    >
      <form className='w-full' onSubmit={handleSubmit}>
        <div className='my-4'>
          <input
            type='text'
            name='title'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border border-primary p-3 w-full rounded-md outline-none text-black'
          />
        </div>
        <div className='my-4'>
          <input
            type='text'
            name='description'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border border-primary p-3 w-full rounded-md outline-none text-black'
          />
        </div>
        <button className='bg-primary text-white px-5 py-1 rounded-md'>
          {isEdit ? 'Edit resource' : 'Add resource'}
        </button>
      </form>
    </Modal>
  );
};

export default ResourceAddModal;
