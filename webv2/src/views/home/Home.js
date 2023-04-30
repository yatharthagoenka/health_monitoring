import React from 'react';
import { Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <PageContainer title="Home" description="landing page">
      <Box>
        <h1>Vitality</h1>
        <Link to='/auth/login'>Login</Link>
      </Box>
    </PageContainer>
  );
};

export default Home;
