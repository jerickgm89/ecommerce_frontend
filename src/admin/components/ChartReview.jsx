import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useGetAverageScoresQuery, useGetProductsQuery } from '../../store/api';
import { Box, Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ChartReview = () => {
    const { data: scoresData, error: scoresError, isLoading: scoresLoading } = useGetAverageScoresQuery();
    const { data: productsData, error: productsError, isLoading: productsLoading } = useGetProductsQuery();
    
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!scoresLoading && !productsLoading && scoresData && productsData) {
            const productNames = {};
            productsData.forEach(product => {
                productNames[product.idProduct] = product.nameProduct;
            });

            const shortenProductName = (name) => {
                if (name.length > 20) {
                    return name.substring(0, 20) + '...';
                }
                return name;
            };

            const scoreColors = {
                '1': 'rgba(255, 0, 0, 0.6)',
                '2': 'rgba(255, 100, 0, 0.6)',
                '3': 'rgba(255, 200, 0, 0.6)',
                '4': 'rgba(0, 255, 0, 0.6)',
                '5': 'rgba(0, 200, 255, 0.6)'
            };

            const labels = scoresData.map(item => shortenProductName(productNames[item.idProduct]) || `Producto ${item.idProduct}`);
            const scores = scoresData.map(item => parseFloat(item.averageScore));
            const backgroundColors = scores.map(score => scoreColors[String(score)]);

            const newChartData = {
                labels,
                datasets: [
                    {
                        label: 'Review Score',
                        data: scores,
                        backgroundColor: backgroundColors,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            };

            setChartData(newChartData);
        }
    }, [scoresData, productsData, scoresLoading, productsLoading]);

    if (scoresLoading || productsLoading) return <Typography>Loading...</Typography>;
    if (scoresError || productsError) return <Typography>Error: {scoresError?.message || productsError?.message}</Typography>;

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Promedio de calificaciones por producto',
            },
        },
    };

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: 600,
                height: 400,
                margin: 'auto',
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: '#fff',
            }}
        >
            {chartData ? <Bar data={chartData} options={options} /> : <Typography>Loading chart...</Typography>}
        </Box>
    );
};
