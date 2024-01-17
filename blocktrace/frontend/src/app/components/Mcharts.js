
// components/BrokerDashboard.js

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
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
        label: 'Conversion Rate',
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
 

   

     
   
  

function Mcharts() {
  return (
    <div className='w-1/2 flex justify-center items-center'> 
   <Line data={linechartData} options={chartOptions} />
    </div>
    
  )
}

export default Mcharts
