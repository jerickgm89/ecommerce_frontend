import { useGetAverageScoresQuery } from "../../store/api";
import { Typography, Paper, Box, Grid, Avatar } from '@mui/material';
import { RateReview as RateReviewIcon } from '@mui/icons-material';

export const TotalReviews = () => {
    const { data: averageScoreData } = useGetAverageScoresQuery();

    const totalReviews = averageScoreData ? averageScoreData.length : 0;
    const totalAverageScore = averageScoreData
        ? averageScoreData.reduce((sum, item) => sum + parseFloat(item.averageScore), 0) / totalReviews
        : 0;

    return (
        <Box mb={2}>
            <Paper elevation={3} sx={{ backgroundColor: '#4caf50', padding: '16px', borderRadius:'30px', display: 'flex', alignItems: 'center', }}>
                <Grid container alignItems="center">
                    <Grid item>
                        <Avatar sx={{ backgroundColor: '#388e3c', marginRight: '16px'}}>
                            <RateReviewIcon sx={{ color: '#ffffff' }} />
                        </Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6" color="textPrimary">Total de Reviews</Typography>
                        <Typography variant="body1" color="textSecondary">Total Reviews: {totalReviews}</Typography>
                        {/* <Typography variant="body1" color="textSecondary">Average Score: {totalAverageScore.toFixed(2)}</Typography> */}
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};
