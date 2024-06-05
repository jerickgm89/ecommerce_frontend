import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { data } from '../data/data';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: '100%',
    margin: '0 auto',
    overflow: 'hidden',
  },
  containerImages: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '300px',
    // minHeight: '300px',
    // objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      minHeight: '200px',
    },
  },
  dotContainerItem: {
    cursor: 'pointer',
    fontSize: 12,
    textAlign: 'center',
  },
  active: {
    background: '#ccc',
    width: 15,
    height: 15,
    borderRadius: '50%',
  },
}));

export const ImageSlider = () => {
  const classes = useStyles();

  return (
    <Box className={classes.mainContainer}>
      <Carousel
        indicators={false}
        navButtonsAlwaysVisible={true}
        NextIcon={<KeyboardArrowRightOutlinedIcon sx={{ color: '#000' }} />}
        PrevIcon={<KeyboardArrowLeftOutlinedIcon sx={{ color: '#000' }} />}
        navButtonsProps={{
          style: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 50,
          },
        }}
      >
        {data.map((item) => (
          <Box key={item.id} className={classes.containerImages}>
            <Link to={item.link}>
              <Box
                component="img"
                src={item.imgUrl}
                className={classes.image}
                alt={`Slide ${item.id}`}
                loading="lazy"
              />
            </Link>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};
