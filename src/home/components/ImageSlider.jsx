import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { data } from '../data/data';

const MainContainer = styled(Box)({
  width: '100%',
  margin: '0 auto',
  overflow: 'hidden',
});

const ContainerImages = styled(Box)({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
});

const Image = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  maxHeight: '400px',
  objectFit: 'cover',
  display: 'block',
  [theme.breakpoints.up('lg')]: {
    maxHeight: '600px',
  },
  [theme.breakpoints.down('md')]: {
    maxHeight: '300px',
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: '200px',
  },
}));

export const ImageSlider = () => {
  return (
    <MainContainer>
      <Carousel
        indicators={false}
        navButtonsAlwaysVisible={true}
        NextIcon={<KeyboardArrowRightOutlinedIcon sx={{ color: 'gray' }} />}
        PrevIcon={<KeyboardArrowLeftOutlinedIcon sx={{ color: 'gray' }} />}
        navButtonsProps={{
          style: {
            backgroundColor: 'transparent',
            
            borderRadius: 50,
            
          },
          size: 'small',
        }}
        
      >
        {data.map((item) => (
          <ContainerImages key={item.id}>
            <Link to={item.link}>
              <Image
                src={item.imgUrl}
                alt={`Slide ${item.id}`}
                loading="lazy"
              />
            </Link>
          </ContainerImages>
        ))}
      </Carousel>
    </MainContainer>
  );
};
