import React, {useState, useEffect} from 'react';
import {Alert, AlertTitle, Button} from '@mui/material';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Temperature from './components/Temperature';
import SpO2 from './components/SpO2';
import Pulse from './components/Pulse';
import {socket} from "../../services/socket.service"

const Dashboard = () => {
  const [alerts, setAlerts] = useState(false);

  useEffect(() => {
    socket.on('alert', data => {
        setAlerts(true)
    });
  }, []);

  const handleDismissAlert = () => {
    setAlerts(false);
  }

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Temperature />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SpO2 />
              </Grid>
              <Grid item xs={12}>
                <Pulse />
              </Grid>
            </Grid>
          </Grid>
          <Grid mt={2}>
          {alerts && (
            <Alert severity="warning">
              <AlertTitle>Fall detected</AlertTitle>
                A fall was detected by the remote device — <strong>alerting gaurdian.</strong>
                <Button onClick={handleDismissAlert}>Dismiss</Button>
            </Alert>
          )}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
