import React from 'react';
import {Bar} from 'react-chartjs-2'

const StackedBar = ({labels, data,title}) => {


    return (<>
        <div className='header w-full'>
            <h1 className='title text-center font-light text-gray-500'>{title}</h1>
        </div>
        <Bar data={{
            labels: labels,
            datasets: data,
        }} />
    </>)
}
export default StackedBar