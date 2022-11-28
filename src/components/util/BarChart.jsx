import React from "react";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import {Bar} from "react-chartjs-2";
import {colors} from "../../helpers/util";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


export default function BarChart({scores, labels, title}) {
    const colorList = scores.map((item) => colors[Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)]]);


    return (
        <Bar data={{

            datasets: [
                {
                    label: title,
                    tension: 0.3,
                    data: scores,
                    borderColor: colorList,
                    backgroundColor: colorList,
                },

            ],
            labels,
        }} options={{
            fill: true,
            animations: true,
            scales: {
                y: {
                    min: 0,
                },
            },
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                },
                filler: {
                    propagate: true,
                }
            },
        }}/>
    );
}