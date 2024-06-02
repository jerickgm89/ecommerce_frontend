import { useGetUsersByIdsQuery }  from "../../hooks/useGetUsersByIdsQuery"
import { useGetUsersQuery, useGetUserByIdQuery } from "../../store/api/ecommerceUserApi"
import { useGetReviewsQuery } from "../../store/api/ecommerceReviewApi"
import { Avatar, Box, Rating, Typography } from "@mui/material"
import { AddNewReview } from "./AddNewReview"
import { formatDistanceToNow } from 'date-fns';
import { useParams } from "react-router-dom";
import { Fragment } from "react";

const TOKEN = localStorage.getItem('token');
console.log(TOKEN);


export const ReviewList = () => {
    const { data: userData, error, isLoading } = useGetUsersQuery();
    const idUser = userData ? userData.idUser : '';

    const { id } = useParams();
    const idProductPage = id;

    const { data: reviewData = [], error: errorReview, isLoading: isLoadingReview } = useGetReviewsQuery();
    
    const idUserReview = [...new Set(reviewData.map(review => review.idUser))];

    const { data: userDataReview, error: errorUserReview, isLoading: isLoadingUserReview } = useGetUsersByIdsQuery(idUserReview);
  return (
    <>
       {
            reviewData
                .filter(review => review.idProduct === Number(idProductPage))
                .map((review) => {
                    const userData = userDataReview ? userDataReview.find(user => user.idUser === review.idUser) : undefined;
                    return (
                        <Fragment key={review.idReview}>
                            <Box display={'flex'}>
                                <Avatar alt={userData ? userData.nameUser : 'Usuario'} src={userData ? userData.pictureUser : ''} sx={{ width: 50, height: 50, mr: 2 }}/>
                                <Box>
                                    <Typography variant="h7">
                                        {userData ? userData.nameUser : 'Usuario'}
                                    </Typography>
                                    <Box display={'flex'} flexDirection={'row'} sx={{textAlign: 'center'}}>
                                        <Rating value={review.scoreReview} readOnly sx={{ mb: 1, mr: 2 }}  />
                                        <Typography variant="body2" sx={{ mb: 1, mr: 2 }}>
                                            {review.scoreReview}
                                        </Typography>
                                        <Typography variant="body2">
                                            {formatDistanceToNow(new Date(review.modifiedRew), { addSuffix: true })}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Typography variant="body1" sx={{mb:3}}>
                                {review.descriptionReview}
                            </Typography>
                        </Fragment>
                    )
                })
        }
        <AddNewReview />
    </>
  )
}
