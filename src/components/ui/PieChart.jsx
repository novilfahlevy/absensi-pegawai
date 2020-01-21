import React from 'react';
import { Pie } from 'react-chartjs-2';

class PieChart extends React.Component {
    render() {
        return (
            <Pie
                data={this.props.data}
                options={{
                    responsive: true,
                    hover: {
                        mode: 'label',
                    },
                    tooltips: {
                        enabled: true,
                        callbacks: {
                            label: function (tooltipItem, data) {
                                var label = data.labels[tooltipItem.index];
                                var val = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                                return label + ':' + val + ' (' + (100 * val / 130).toFixed(2) + '%)';
                            }
                        }
                    },
                    title: {
                        display: false,
                        text: this.props.title,
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'left'
                    }
                }}
            />
        )
    }
}

export default PieChart;