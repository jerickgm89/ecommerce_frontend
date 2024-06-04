import { useGetProductsQuery } from "../../hooks/useGetProductsByIdsQuery";
import { useGetQuestionsQuery } from "../../store/api/ecommerceQuestionsApi";
import { useGetUserByTokenQuery } from "../../store/api";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material"
import {QuestionAnswer as QuestionAnswerIcon} from '@mui/icons-material';
import { useParams } from "react-router-dom";

const Token = localStorage.getItem('token');

export const QuestionsList = () => {
    const { id } = useParams();
    const productId = id;
    
    
    const { data: questionData = [], error: errorQuestion } = useGetQuestionsQuery();
    // console.log(questionData);
    const idProductQuestion = [...new Set(questionData.map(question => question.idProduct))];
    // console.log(idProductQuestion);
    const { data: productData, error: errorProduct } = useGetProductsQuery(idProductQuestion);
    // console.log(productData);
    const [isHovered, setIsHovered] = useState(new Array(questionData.length).fill(false));
    return (
        <Box sx={{ml:2}}>
          <Typography variant="h7" gutterBottom>
          {
  questionData
    .filter(question => question.idProduct === Number(productId))
    .map((question, index) => (
      <Box 
        key={index} 
        sx={{mt: 3}} 
        onMouseEnter={() => setIsHovered(prevState => {
          const newState = [...prevState];
          newState[index] = true;
          return newState;
        })}
        onMouseLeave={() => setIsHovered(prevState => {
          const newState = [...prevState];
          newState[index] = false;
          return newState;
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <QuestionAnswerIcon style={{color: '#2E8FEA'}} sx={{fontSize: 20}}/>
          <Typography variant="h7" gutterBottom sx={{ml: 2, fontWeight: "bold" }}>
            {question.comments}
          </Typography>
          {isHovered[index] && (
            <Button 
              variant="text" 
              color="secondary" 
              sx={{ 
                ml: 2,
                textTransform: 'none',
              }}
            >
              Reportar
            </Button>
          )}
        </Box>
        {question.responseComments && (
          <Typography variant="h7" gutterBottom sx={{ml: 5}}>
            Resp: {question.responseComments}
          </Typography>
        )}
      </Box>
    ))
}
          </Typography>
        </Box>
      )
}
