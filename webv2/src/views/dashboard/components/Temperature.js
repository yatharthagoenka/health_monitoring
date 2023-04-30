import React, {useState, useEffect} from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import {socket} from "../../../services/socket.service"
import {Alert, AlertTitle} from '@mui/material';
import authService from 'src/services/auth.service';

const Temperature = () => {

    // select
    const [month, setMonth] = useState('1');
    const [alerts, setAlerts] = useState([]);
    const [tempData, setTempData] = useState([97, 90, 101, 95, 92, 97, 94]);
    const [labels, setLabels] = useState([]);
    const user = authService.getCurrentUser();

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // chart
    const options = {
        scales: {
            x: {
                type: 'category',
                categories: labels.slice(-15),
                labels: {
                    show: true,
                    formatter: function(value, timestamp, index) {
                        return new Date(value).toLocaleTimeString();
                    }
                },  
                tickAmount: 8,
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    beginAtZero: true,
                    stepSize: 10,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            colors: undefined,
            width: 4,
            dashArray: 0,      
        }
        
    };
    const seriescolumnchart = [
        {
            name: 'Data monitored',
            data: tempData,
        }
    ];

    useEffect(() => {
        socket.on('temp_receiver', data => {
            const dataValue = data.value;
            const time = new Date().toLocaleTimeString();
            setLabels(prevLabels => [...prevLabels.slice(-15), time]);
            setTempData(prevData => [...prevData.slice(-15), dataValue]);
            if (dataValue > 99) {
              setAlerts(prevState => [...prevState, dataValue]);
            }
            if (dataValue < 99) {
              setAlerts([]);
            }
        });
    }, []);

    return (
        <>
        <DashboardCard title="Temperature readings" action={
            <Select
                labelId="month-dd"
                id="month-dd"
                value={month}
                size="small"
                onChange={handleChange}
            >
                <MenuItem value={1}>May 2023</MenuItem>
                <MenuItem value={2}>April 2023</MenuItem>
                <MenuItem value={3}>March 2023</MenuItem>
            </Select>
        }>
            <Chart
                options={options}
                series={seriescolumnchart}
                type="line"
                height="370px"
            />
        {alerts.length >= 3 && (
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
                Temperature trend raising above 99 — <strong>about to alert gaurdian.</strong>
            </Alert>
        )}
        </DashboardCard>
        </>
    );
};

export default Temperature;
