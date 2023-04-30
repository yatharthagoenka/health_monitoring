import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/system';
import CustomTextField from '../../components/shared/CustomTextField';
import authService from 'src/services/auth.service';

const Profile = () => {
  const user = (authService.getCurrentUser()).user;

  return (
    <PageContainer title="Profile" description="Access user profile">

      <DashboardCard title="User Profile">
        <Box>
            <Stack mb={3}>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='name' mb="5px">Username</Typography>
                <CustomTextField id="name" variant="outlined" fullWidth value={user.username} />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                <CustomTextField id="email" variant="outlined" fullWidth value={user.email} />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                <CustomTextField id="password" variant="outlined" fullWidth value={user.password} />
            </Stack>
            <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/auth/login">
                Sign Up
            </Button>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Profile;
