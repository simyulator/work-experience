import { Avatar, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './ProfileForm.css';
import WorkExperience from './WorkExperience';
import { db } from '../util/firebase';
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';

const ProfileForm = (props) => {
  const data = {
    name: '',
    age: '',
    workExp: [],
  };

  const [userData, setUserData] = useState(data);
  const [userID, setUserID] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'userData'));
    setLoading(true);
    onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))[0];

      setUserData(data.data);
      setUserID(data.id);
    });
    setLoading(false);
  }, []);

  const createUserData = async (e) => {
    try {
      setLoading(true);
      await addDoc(collection(db, 'userData'), userData);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const handleUpdate = async (e) => {
    const taskDocRef = doc(db, 'userData', userID);
    try {
      setLoading(true);
      await updateDoc(taskDocRef, userData);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <div className='profile-form-root'>
          <div className='form-title'>
            <Typography sx={{ pl: '25px', fontWeight: 'bold' }}>
              My Profile
            </Typography>
          </div>
          <div className='profile-form-content'>
            <div className='profile-picture'>
              <Avatar
                style={{ marginLeft: '20px', height: '200px', width: '200px' }}
              />
              <Button
                variant='contained'
                onClick={handleUpdate}
                sx={{ ml: 20 }}
              >
                Save
              </Button>
            </div>
            <div className='profile-input-fields'>
              <div className='profile-form-section'>
                <Typography className='sub-section-heading'>
                  Basic Information
                </Typography>
                <div className='sub-section'>
                  <TextField
                    className='form-element'
                    label='Name'
                    value={userData?.name}
                    name='name'
                    onChange={onChangeHandler}
                  />
                  <TextField
                    className='form-element'
                    label='Age'
                    value={userData?.age}
                    name='age'
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  marginLeft: '20px',
                  alignItems: 'center',
                }}
              >
                <Typography className='sub-section-heading'>
                  Work Experience
                </Typography>
              </div>
              {userData.workExp?.map((comp, index) => {
                return (
                  <WorkExperience
                    companyDetails={comp}
                    userData={userData}
                    setUserData={setUserData}
                    key={comp.id}
                    index={index}
                    onChangeHandler={onChangeHandler}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileForm;
