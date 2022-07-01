import React from 'react';
import ProfileForm from './ProfileForm';
import Sidebar from './Sidebar';
import './MainContainer.css';

const MainContainer = (props) => {
  return (
    <div className='main-container'>
      <Sidebar />
      <ProfileForm />
    </div>
  );
};

export default MainContainer;
