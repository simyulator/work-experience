import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import { DatePicker } from '@mui/lab';

const WorkExperience = (props) => {
  const { userData, setUserData, companyDetails, index } = props;

  const dateChangeHandler = (e, type) => {
    const tempData = { ...userData };
    const date = new Date(e);
    if (type === 'start') {
      userData.workExp[index].startDate = date.toString();
    } else if (type === 'end') {
      userData.workExp[index].endDate = date.toString();
    }
    setUserData(tempData);
  };

  const changeHandler = (e) => {
    const tempData = { ...userData };
    if (e.target.name === 'companyName') {
      tempData.workExp[index].companyName = e.target.value;
    } else if (e.target.name === 'jobTitle') {
      tempData.workExp[index].jobTitle = e.target.value;
    } else if (e.target.name === 'jobDescription') {
      tempData.workExp[index].jobDesc = e.target.value;
    }
    setUserData(tempData);
  };

  return (
    <div className='profile-form-section'>
      <Typography className='sub-section-heading'>
        {companyDetails?.companyName}
      </Typography>
      <div className='sub-section'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='Start Date'
            onChange={(e) => dateChangeHandler(e, 'start')}
            value={companyDetails?.startDate}
            maxDate={new Date()}
            minDate={
              index !== 0
                ? new Date(userData.workExp[index - 1]?.endDate)
                : null
            }
            renderInput={(params) => (
              <TextField className='form-element' {...params} />
            )}
          />
          {!userData.workExp[index].current && (
            <DatePicker
              label='End Date'
              onChange={(e) => dateChangeHandler(e, 'end')}
              value={companyDetails?.endDate}
              maxDate={
                index === userData.workExp.length - 1
                  ? new Date()
                  : new Date(userData.workExp[index + 1]?.startDate)
              }
              minDate={new Date(userData.workExp[index].startDate)}
              renderInput={(params) => (
                <TextField className='form-element' {...params} />
              )}
            />
          )}
          {userData.currentCompanyName === companyDetails?.companyName && (
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={companyDetails?.current}
                    name='currentWork'
                    onChange={changeHandler}
                  />
                }
                label='I currently work here.'
              />
            </FormGroup>
          )}
        </LocalizationProvider>
      </div>
      <div className='sub-section'>
        <TextField
          className='form-element'
          label='Company'
          value={companyDetails?.companyName}
          name='companyName'
          onChange={changeHandler}
        />
        <img
          src={companyDetails.companyLogo}
          alt={companyDetails.companyName}
          width='100px'
        />
      </div>
      <div className='sub-section'>
        <TextField
          className='form-element'
          label='Job Title'
          value={companyDetails?.jobTitle}
          name='jobTitle'
          onChange={changeHandler}
        />
        <TextField
          className='form-element'
          label='Job Description'
          value={companyDetails?.jobDesc}
          name='jobDescription'
          onChange={changeHandler}
        />
      </div>
    </div>
  );
};

export default WorkExperience;
