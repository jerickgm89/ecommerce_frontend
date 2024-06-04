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
            <Paper elevation={3} sx={{ borderRadius: '16px', padding: '20px', backgroundColor: '#f0f0f0' }}>
                <Grid container alignItems="center">
                    <Grid item>
                        <Avatar sx={{ backgroundColor: '#ff5722', marginRight: '16px', width: 56, height: 56 }}>
                            <RateReviewIcon sx={{ color: '#ffffff', fontSize: 32 }} />
                        </Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6" gutterBottom color="textPrimary">Total de Reviews</Typography>
                        <Typography variant="body1" color="textSecondary" gutterBottom>Total Reviews: {totalReviews}</Typography>
                        {/* <Typography variant="body1" color="textSecondary">Average Score: {totalAverageScore.toFixed(2)}</Typography> */}
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};
