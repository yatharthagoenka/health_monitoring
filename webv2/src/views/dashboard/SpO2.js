import React, {useEffect, useState} from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import AppService from '../../services/app.service'
import AuthService from '../../services/auth.service'
import {Typography} from '@mui/material';
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
        text: 'Monitor Oxygen saturation',
      },
    },
};

const SpO2 = () => {
    const [files , setFiles] = useState([])
    const [user , setUser] = useState()
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
          {
            label: 'SpO2',
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
        socket.on('spo2_receiver', data => {
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
        });
      }, []);      

    return (
        <PageContainer title="SpO2" description="Access live data">

        <DashboardCard title="SpO2 Data">
            <Typography>All of the uploaded SpO2 data is monitored here</Typography>
            <Line options={options} data={chartData} />
        </DashboardCard>
        </PageContainer>
    );
};

export default SpO2;
