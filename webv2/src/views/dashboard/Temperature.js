import React, {useEffect, useState} from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import AppService from '../../services/app.service'
import AuthService from '../../services/auth.service'
import {Typography, Alert, AlertTitle} from '@mui/material';
import {socket} from "../../services/socket.service"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monitor Temperature readings',
      },
    },
};

const Temperature = () => {
    const [files , setFiles] = useState([])
    const [user , setUser] = useState()
    const [alerts, setAlerts] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Temperature',
            data: [],
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      });
      
    let currentUser = '';

    useEffect(() => {
        currentUser = AuthService.getCurrentUser();
        setUser(currentUser.user)
    }, []);

    useEffect(() => {
        socket.on('temp_receiver', data => {
            console.log(data)
            const time = new Date().toLocaleTimeString();
            setChartData(prevState => ({
                ...prevState,
                labels: [...prevState.labels, time],
                datasets: [
                {
                    ...prevState.datasets[0],
                    data: [...prevState.datasets[0].data, data],
                },
                ],
            }));
            if (data > 99) {
              setAlerts(prevState => [...prevState, data]);
            }
            if (data < 99) {
              setAlerts([]);
            }

        });
      }, [alerts]);      

    return (
        <PageContainer title="Temperature" description="Access user uploaded files">
          {alerts.length >= 3 && (
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
                Temperature trend raising above 99 — <strong>about to alert gaurdian.</strong>
            </Alert>
          )}
          <DashboardCard title="Temperature Data">
              <Typography>All of the uploaded temperature data is monitored here</Typography>
              <Line options={options} data={chartData} />
          </DashboardCard>
        </PageContainer>
    );
};

export default Temperature;
