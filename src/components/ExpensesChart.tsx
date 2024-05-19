import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register the components needed for the charts
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

interface ExpensesChartProps {
    expenses: { date: string; amount: number }[];
    balances: { [key: string]: number };
    groupNames: { [key: string]: string };
}

const ExpensesChart: React.FC<ExpensesChartProps> = ({ expenses, balances, groupNames }) => {
    // Data for the line chart
    const lineData = {
        labels: expenses.map(expense => new Date(expense.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Expenses',
                data: expenses.map(expense => expense.amount),
                borderColor: '#D27E00',
                backgroundColor: '#D27E00',
                fill: false,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Last 10 Expenses',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount (€)',
                },
                beginAtZero: true,
            },
        },
    };

    // Data for the pie chart
    const pieData = {
        labels: Object.keys(balances).map(groupId => groupNames[groupId]),
        datasets: [
            {
                label: 'Group Balances',
                data: Object.values(balances),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#D27E00',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#D27E00',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value} €`;
                    },
                },
            },
        },
    };

    return (
        <Box>
            <Heading mb={4} size="md">Vos 10 dernières dépenses</Heading>
            <Box w="100%" maxW="600px" mx="auto">
                <Line data={lineData} options={lineOptions} />
            </Box>
            <Heading mt={8} mb={4} size="md">Dépense par groupe</Heading>
            <Box w="100%" maxW="600px" mx="auto">
                <Pie data={pieData} options={pieOptions} />
            </Box>
        </Box>
    );
};

export default ExpensesChart;
