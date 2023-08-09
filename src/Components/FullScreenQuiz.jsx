import React, { useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';

export const FullScreenQuiz = ({ children }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
  
    const enterFullScreen = () => {
      const element = document.documentElement;
  
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
  
      setIsFullScreen(true);
    };
  
    const exitFullScreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
  
      setIsFullScreen(false);
    };
  
    return (
      <Box height={"550px"} display={"flex"} justifyContent={"center"} alignItems={"center"} className={`full-screen-quiz ${isFullScreen ? 'active' : ''}`}>
        {!isFullScreen ? (
          <Button w={"200px"} h={"50px"} colorScheme='messenger' onClick={enterFullScreen} fontWeight={"bold"}>Start Quiz</Button>
        ) : (
          <Box className="quiz-content">
            {children}
          </Box>
        )}
      </Box>
    );
  };
  

