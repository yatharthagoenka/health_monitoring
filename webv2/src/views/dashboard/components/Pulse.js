import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconHeart } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';
import {socket} from "../../../services/socket.service"
import {Alert, AlertTitle} from '@mui/material';

const Pulse = () => {
  const [alerts, setAlerts] = useState([]);
  const [meanPulse, setMeanPulse] = useState(72);

  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';
  const [seriescolumnchart, setSeriescolumnchart] = useState([{
    name: '',
    color: secondary,
    data: [25, 66, 20, 40, 12, 58, 20],
  }]);
  
  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  useEffect(() => {
    socket.on('pulse_receiver', data => {
      const dataValue = data.value;
      setSeriescolumnchart(prevSeries => {
        const newSeries = prevSeries[0].data.concat(dataValue).slice(-10);
        return [{ ...prevSeries[0], data: newSeries }];
      });
      
    });
  }, []);


  return (
    <DashboardCard
      title="Pulse rate"
      action={
        <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}>
          <IconHeart width={24} />
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          {meanPulse}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            -12%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            last month
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default Pulse;
