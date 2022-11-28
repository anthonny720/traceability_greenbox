import React from 'react';
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
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
};


export function LinealChart({datasets,labels,title}) {
  return <><div className='header w-full'>
            <h1 className='title text-center font-light text-gray-500'>{title}</h1>
        </div><Line options={options} data={{
    labels: labels,
    datasets: datasets,
  }
  } /></>;
}
