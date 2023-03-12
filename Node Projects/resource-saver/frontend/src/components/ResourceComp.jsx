import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteResource } from '../services/resources';

const ResourceComp = ({
  resource,
  setEditContent,
  setIsEdit,
  modalIsOpen,
  setEditId,
}) => {
  const queryClient = useQueryClient();

  const removeResource = useMutation(deleteResource, {
    onSuccess: () => queryClient.invalidateQueries(['resources']),
  });

  const handleDeletion = (id) => {
    const ask = confirm('Are you sure?');
    if (ask) {
      removeResource.mutate(id);
    }
  };

  return (
    <div className='bg-main p-3 rounded-md my-2'>
      <h1 className='text-[1.2rem]'>{resource.name}</h1>
      <p className='mt-3'>{resource.description}</p>
      <div className='flex items-center justify-between'>
        <Link to={`/resource/${resource.slug}`}>
          <button className='bg-primary text-white px-5 py-1 rounded-md mt-3'>
            Access
          </button>
        </Link>
        <div className='flex items-center gap-3'>
          <FiEdit
            fontSize='1.25rem'
            className='cursor-pointer'
            onClick={() => {
              setEditContent({
                title: resource.name,
                description: resource.description,
              });
              modalIsOpen();
              setIsEdit(true);
              setEditId(resource._id);
            }}
          />
          <AiOutlineDelete
            className='cursor-pointer'
            fontSize='1.25rem'
            onClick={() => handleDeletion(resource._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceComp;
