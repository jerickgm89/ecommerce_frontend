import { Add } from "@mui/icons-material"
import { Avatar, Box, Divider, Rating, Typography } from "@mui/material"
import { AddNewReview } from "./AddNewReview"

export const ReviewList = () => {
  return (
    <>
        <Box display={'flex'}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 50, height: 50, mr: 2 }}/>
            <Box>
                <Typography variant="h7">
                    Remy Sharp
                </Typography>
                <Box display={'flex'} flexDirection={'row'} sx={{textAlign: 'center'}}>
                    <Rating sx={{ mb: 1, mr: 2 }} />
                    <Typography variant="body2" sx={{ mb: 1, mr: 2 }}>
                        4.7
                    </Typography>
                    <Typography variant="body2">
                        1 año
                    </Typography>
                </Box>
            </Box>
        </Box>
        <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.
        </Typography>
        <AddNewReview />
    </>
  )
}
