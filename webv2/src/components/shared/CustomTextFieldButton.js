import React, {useState} from 'react';
import { Button } from '@mui/material';
import CustomTextField from './CustomTextField';
import appService from 'src/services/app.service';
import authService from 'src/services/auth.service';

const CustomTextFieldWithButton = ({ ...rest }) => {
  const user = authService.getCurrentUser().user;
  const [value, setValue] = useState(rest.value || '');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (e) => {
    appService.updateUser(rest.id, value, user._id).then(()=>{
      console.log('User updated')
    },
    err => {
      console.log(err)
    })
  };
  
  return (
    <CustomTextField
      {...rest}
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <Button variant="outlined" size="small" onClick={handleClick}>
            Update
          </Button>
        ),
      }}
      />
  )
};

export default CustomTextFieldWithButton;
