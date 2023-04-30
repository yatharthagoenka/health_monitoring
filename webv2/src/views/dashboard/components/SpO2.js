import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';
import {Alert, AlertTitle} from '@mui/material';
import {socket} from "../../../services/socket.service"

const SpO2 = () => {
  const [alerts, setAlerts] = useState([]);
  const [seriescolumnchart, setSeriescolumnchart] = useState([98, 2]);
  
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;
  
  // chart
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  useEffect(() => {
    socket.on('spo2_receiver', data => {
        const dataValue = data.value;
        setSeriescolumnchart([dataValue-0, 100-dataValue]);
        if (dataValue < 95) {
          setAlerts(prevState => [...prevState, dataValue]);
        }
        if (dataValue > 95) {
          setAlerts([]);
        }

    });
  }, [alerts]);

  return (
    <DashboardCard title="SpO2 Percentage">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {seriescolumnchart[0]} %
          </Typography>
          <Stack direction="row" spacing={1} mt={2} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color="#39B69A" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              +1%
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              last month
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Current
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                Lost
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="150px"
          />
        </Grid>
      </Grid>
      {alerts.length >= 3 && (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
            Temperature trend raising above 99 — <strong>about to alert gaurdian.</strong>
        </Alert>
      )}
    </DashboardCard>
  );
};

export default SpO2;
