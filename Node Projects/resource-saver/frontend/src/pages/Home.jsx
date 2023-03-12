import React from 'react';
import { useState } from 'react';
import ResourceAddModal from '../components/ResourceAddModal';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { getAllResources } from '../services/resources';
import ResourceComp from '../components/ResourceComp';
import Spinner from '../components/Spinner';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Home = () => {
  const { isLoading, isError, data } = useQuery(['resources'], getAllResources);

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState({
    title: '',
    description: '',
  });
  const [parent] = useAutoAnimate(/* optional config */);

  const [editId, setEditId] = useState(null);

  const modalIsOpen = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (isLoading === true) {
    return <Spinner />;
  }

  if (isError === true) {
    return <h1 className='text-center mt-10'>Something went wrong</h1>;
  }

  return (
    <>
      <div className='py-10'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl text-center'>My Resources</h1>
          <div className='bg-primary p-2 rounded-md flex items-center gap-1'>
            <AiOutlinePlusCircle fontSize='1.1rem' />
            <h1 className='text-center cursor-pointer' onClick={modalIsOpen}>
              New Resource
            </h1>
          </div>
        </div>
        <div
          className='mt-10 grid md:grid-cols-3 grid-cols-1 gap-5'
          ref={parent}
        >
          {data?.resources?.map((resource) => (
            <ResourceComp
              resource={resource}
              key={resource._id}
              setIsEdit={setIsEdit}
              setEditContent={setEditContent}
              modalIsOpen={modalIsOpen}
              setEditId={setEditId}
            />
          ))}
        </div>
      </div>
      <ResourceAddModal
        isOpen={isOpen}
        closeModal={closeModal}
        editContent={editContent}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        editId={editId}
      />
    </>
  );
};

export default Home;
