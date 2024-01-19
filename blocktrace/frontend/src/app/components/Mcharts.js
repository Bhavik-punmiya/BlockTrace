
// components/BrokerDashboard.js

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


import React from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
 


const dt = [10, 15, 25, 7, 9, 8, 30, 35, 17, 6, 14, 20];
  const linechartData = {
    
    labels: dt.map((entry, index) => `Month ${index + 1}`),
    datasets: [
      {
        label: 'Products Manufactured',
        data: dt,
        fill: false,
        borderColor: '#2196F3',
        tension: 0.4,
      },
    ],
  };
  const chartOptions = {
    
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
    
  };
  const shipped= 88;
  const doughnutChartData = {
    labels: ['Products Shipped', 'Products not shipped'],
    datasets: [
      {
        data: [shipped, 100 - shipped],
        backgroundColor: ['#2196F3', '#e0e0e0'],
      },
    ],
  };
 

   

     
   
  

function Mcharts() {
  return (
    <div className='flex justify-center items-center flex-col'>
    <div className='w-1/2 '> 
   <Line data={linechartData} options={chartOptions} />
    </div>
    <div className=' w-1/4 py-20'>
    <Doughnut data={doughnutChartData} />  
    </div>
    </div>

  )
}

export default Mcharts
