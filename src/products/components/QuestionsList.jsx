import { useGetUsersByIdsQuery } from "../../hooks/useGetUsersByIdsQuery";
import { useGetQuestionsQuery } from "../../store/api/ecommerceQuestionsApi";
import { useGetUserByTokenQuery } from "../../store/api";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material"
import {QuestionAnswer as QuestionAnswerIcon} from '@mui/icons-material';
import { useParams } from "react-router-dom";
import { Fragment } from "react";
import { ResponseQuestionsList } from './ResponseQuestionsList';

const Token = localStorage.getItem('token');

export const QuestionsList = () => {
    const { data: userData, error, isLoading } = useGetUserByTokenQuery(Token);
    console.log(userData);
    const [showResponseInput, setShowResponseInput] = useState(false);
    const [responseIndex, setResponseIndex] = useState(null);
    
    const { data: questionData = [], error: errorQuestion } = useGetQuestionsQuery();
    console.log(questionData);
    const [isHovered, setIsHovered] = useState(new Array(questionData.length).fill(false));
  return (
    <>
        {
            userData && questionData.map((question, index) => (
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
                    <QuestionAnswerIcon style={{color: '#3090ea'}}/>
                    <Typography variant="h7" gutterBottom sx={{ml:1}}>
                        {question.comments}
                    </Typography>
                    {
                        isHovered[index] &&
                        <Button 
                        color="secondary"
                        style={{textTransform: 'none', mt: 1}}
                    >
                        Reportar
                    </Button>   
                    }
 
                    {/* {
                        isHovered[index] && userData.isAdmin && 
                        <>
                            <Button 
                                color="primary" 
                                onClick={() => setResponseIndex(responseIndex === index ? null : index)}
                                style={{textTransform: 'none'}}
                            >
                                {responseIndex === index ? 'Volver' : 'Responder'}
                            </Button>       
                            {
                                responseIndex === index && 
                                <Box ml={3}>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Escribe tu respuesta" 
                                        variant="outlined" 
                                        fullWidth
                                        sx={{mt: 2, mb:1}}
                                    />
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                    >
                                        Enviar
                                    </Button>
                                </Box>
                            }
                        </>
                    } */}
                    <ResponseQuestionsList />
                </Box>
            ))
        }
    </>

  )
}
