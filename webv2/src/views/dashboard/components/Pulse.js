import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconArrowUpLeft, IconHeart } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';
import {socket} from "../../../services/socket.service"
import {Alert, AlertTitle} from '@mui/material';

const Pulse = () => {
  const [alerts, setAlerts] = useState("Normal");
  const [meanPulse, setMeanPulse] = useState(72);

  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';
  const successlight = '#E6FFFA';
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

  useEffect(() => {
    const data = seriescolumnchart[0].data;
    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / data.length;
    setMeanPulse(mean);
    if(mean<70){
      setAlerts("Dropping low")
    }
    if(mean>=70 && mean<=95){
      setAlerts("Normal")
    }
    if(mean>=95){
      setAlerts("Higher than usual")
    }
  }, [seriescolumnchart]);


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
          {meanPulse} bpm
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          {alerts=="Normal" ? 
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              <IconHeart width={20} color="#c6cf9d" />
            </Avatar>
          : <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
              <IconHeart width={20} color="#e00" />
            </Avatar>}
          <Typography variant="subtitle2" fontWeight="700" mt="-20px">
            {alerts}
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default Pulse;
