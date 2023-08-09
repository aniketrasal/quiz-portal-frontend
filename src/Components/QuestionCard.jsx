import React, { useState, useEffect } from "react";
import { Heading, Box, Button } from "@chakra-ui/react";

function QuestionCard() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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
    if (document.fullscreenElement) {
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
    }
  };
  useEffect(() => {
    // Fetching questions from the API
    fetch("https://quiz-portal-backend.onrender.com/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 1) {
        setTimer(timer - 1);
      } else {
        submitAnswer(null);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  const submitAnswer = (selectedOption) => {
    const updatedUserAnswers = [...userAnswers, selectedOption];

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswers(updatedUserAnswers);
      setTimer(30);
      setSelectedOption(selectedOption);
    } else {
      setUserAnswers(updatedUserAnswers);
      setShowScore(true);
      exitFullScreen();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App">
      <div className="quiz-container">
        {questions.length === 0 ? (
          <p>Loading questions...</p>
        ) : showScore ? (
          <Box className="score" textAlign={"center"}>
            <Heading size="xl" color={"green"}>
              Quiz Completed!
            </Heading>
            <Heading size="lg">
              Your score:{" "}
              {
                userAnswers
                  .filter(
                    (answer, index) =>
                      answer === questions[index]?.correctanswer
                  )
                  .filter(Boolean).length
              }{" "}
              / {questions.length}
            </Heading>
            <br />
            <Button
              colorScheme="messenger"
              onClick={() => {
                window.location.reload();
              }}
            >
              Return to home
            </Button>
          </Box>
        ) : (
          <Box className="question-container" w={{base:"90%", sm:"90%", md:"90%",lg:"100%",xl:"100%"}} marginLeft={{base:"20px", sm:"20px"}}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Heading marginTop={"-18%"}>
                Question {currentQuestionIndex + 1}/10
              </Heading>
              <Heading marginTop={"-18%"}>Time left: {timer} seconds</Heading>
            </Box>

            <Heading marginBottom={"5%"}>{currentQuestion.question}</Heading>

            <Box
              display={"grid"}
              gridTemplateColumns={{
                base: "1fr",         
                sm: "1fr 1fr",      
                md: "1fr 1fr",  
                lg: "1fr 1fr",  
                xl: "1fr 1fr ",
              }}
              gap={"30px"}
              justifyContent={"center"}
            >
              {currentQuestion.options.map((option, index) => (
                <Button
                  onClick={() => submitAnswer(option)}
                  textAlign={"center"}
                  backgroundColor={"gray.300"}
                  fontWeight={"bold"}
                  w={"300px"}
                  h={"50px"}
                  style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                  borderRadius={"15px 15px 15px 15px"}
                >
                  <ol key={index}>{option}</ol>
                </Button>
              ))}
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
}

export default QuestionCard;
