import React from 'react'
import './DougnutChart.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut} from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
    plugins: {
        legend: {
            labels: {
                color: '#ffffff'
            }
        }
    }
}

const DougnutChart = ({ data, colors }) => {
    const chartedData = {
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: colors,
                border: '1px solid #fff'
            }
        ]
    }
  return (
    <div className='dougnut_chart'>
        <div className='dougnut-chart-box'>
            <Doughnut
                data={chartedData}
                options={options}
            />
        </div>
    </div>
  )
}

export default DougnutChart