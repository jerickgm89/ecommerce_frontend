import { useEffect, useState } from 'react';
import { data } from '../data/data';
import { makeStyles } from '@mui/styles';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Box } from '@mui/material';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100%',
    height: 280,
    margin: '0 auto',
    overflow: 'hidden', 
  },
  sliderContainer: {
    position: 'relative',
    height: '100%',
  },
  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  dotContainerItem: {
    margin: '8px 3px',
    cursor: 'pointer',
    fontSize: 12,
    textAlign: 'center',
  },
  leftArrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: 20,
    fontSize: 40,
    fontWeight: 700,
    color: '#fff',
    zIndex: 1,
    cursor: 'pointer',
  },
  rightArrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    right: 20,
    fontSize: 40,
    fontWeight: 700,
    color: '#fff',
    zIndex: 1,
    cursor: 'pointer',
  },
  containerImages: {
    position: 'relative',
    width: '100%',
    height: '100%',
    // borderRadius: 20,
    // border: '1px solid #eee',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    transition: 'opacity 0.5s ease-in-out',
    opacity: 0,
  },
  visible: {
    opacity: 1,
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (autoplay) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [autoplay]);

  const scrollToImage = (direction) => {
    setAutoplay(false);

    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      });
    } else {
      const isLastSlide = currentIndex === data.length - 1;
      if (isLastSlide) {
        setCurrentIndex(0); 
      } else {
        setCurrentIndex(curr => curr + 1);
      }
    }
  };

  const goToSlide = (slideIndex) => {
    setAutoplay(false);
    setCurrentIndex(slideIndex);
  };

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.sliderContainer}>
        <ArrowBackIosNewOutlinedIcon 
          className={classes.leftArrow} 
          onClick={() => scrollToImage('prev')} 
        />
        <ArrowForwardIosOutlinedIcon 
          className={classes.rightArrow} 
          onClick={() => scrollToImage('next')} 
        />
        <Box className={classes.containerImages}>
          {data.map((item, idx) => (
            <Box 
              key={item.id} 
              component="img" 
              src={item.imgUrl} 
              className={`${classes.image} ${idx === currentIndex ? classes.visible : ''}`}
              alt={`Slide ${item.id}`}
            />
          ))}
        </Box>
        <Box className={classes.dotsContainer}>
          {data.map((_, idx) => (
            <div
              key={idx}
              className={`${classes.dotContainerItem} ${idx === currentIndex ? classes.active : ""}`}
              onClick={() => goToSlide(idx)}
            >
              &#9865;
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
