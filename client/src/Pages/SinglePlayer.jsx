import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuestionService from "../Services/QuestionService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Singleplayer Component - Represents the single-player mode of the Mathminds Online application.
 * @component
 * @returns {JSX.Element} Singleplayer component
 */
const Singleplayer = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(-3);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [questionsArray, setQuestionsArray] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

    /**
   * useEffect to fetch questions when the game starts and the countdown reaches 0.
   * @function
   * @async
   * @returns {void}
   */
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await QuestionService.getQuestions();
        const fetchedQuestions = response.data.questions;
        const shuffledQuestions = [...fetchedQuestions];
        for (let i = shuffledQuestions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
        }
        setQuestionsArray(shuffledQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (gameStarted && countdown === 0 && questionsArray.length === 0) {
      fetchQuestions();
    }
  }, [gameStarted, countdown, questionsArray.length]);

  /**
   * Countdown and timer logic.
   * @function
   * @returns {void}
   */
  useEffect(() => {
    let countdownInterval;
    let timerInterval;
  
    if (gameStarted && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
  
    if (gameStarted && !gameOver) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
  
    // Combine cleanup logic for both intervals
    return () => {
      clearInterval(countdownInterval);
      clearInterval(timerInterval);
    };
  }, [gameStarted, countdown, timer, gameOver]);

  /**
   * Function to check the player's answer.
   * @function
   * @returns {void}
   */
  const checkAnswer = () => {
    const isCorrect = playerAnswer === questionsArray[currentQuestion].answer;

    if (isCorrect) {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
      toast.success('Correct!', { autoClose: 2000 ,
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      toast.error('Incorrect!', { autoClose: 2000 ,
        position: toast.POSITION.BOTTOM_LEFT,
      });
      // Skip to the next question only if the answer is correct
      return;
    }

    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setPlayerAnswer("");

    // Check if the player has answered 10 questions
    if (correctAnswers + 1 === 10) {
      // Handle win condition (update win count in the database)
      // For now, you can just setGameOver(true) to simulate the end of the game
      setGameOver(true);
    }
  };

  /**
   * Function to start the game.
   * @function
   * @returns {void}
   */
  const startGame = () => {
    setGameStarted(true);
  };
  /**
   * Function to reset the game.
   * @function
   * @returns {void}
   */
  const resetGame = () => {
    setGameStarted(true);
    setCountdown(3);
    setTimer(-3); //Timer starts when countdown starts, so it will show as 0 immediately after countdown
    setCurrentQuestion(0);
    setPlayerAnswer("");
    setCorrectAnswers(0);
    setGameOver(false);
  };

  /**
   * Event handler for keypress events in the input field.
   * @function
   * @param {React.KeyboardEvent} e - The keyboard event object.
   * @returns {void}
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  /**
   * Renders the game content based on the game state.
   * @function
   * @returns {JSX.Element|null} Game content JSX element or null.
   */
  const renderGameContent = () => {
    if (!gameStarted) {
      return (
        <div>
          <h2 className="loggedInPageTitle">Singleplayer Mode</h2>
          <div style={{marginTop: '1.5em', textAlign:'left', width:'75%'}}>
            <p className="modeDesc">So you're pitching against yourself, eh? No worries, at least you'll be able to train yourself against opponents.</p><br/>
            <p className="modeDesc">Note that this is a practice mode, so you can't expect yourself to grind wins.</p><br/>
            <p className="modeDesc">On the bright side, you can't lose either, even if you give up mid-round!</p><br/>
            <p className="modeDesc">Ready to play the game?</p>
          </div>
          <button className="btn singleplayer" onClick={startGame}>Absolutely!</button>
        </div>
      );
    }
  
    if (countdown > 0) {
      return <div className="countdown">{countdown}</div>;
    }

    
    if (questionsArray.length === 0) {
      return null;
    }
  
    if (gameOver) {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      const formattedTime = minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''} and ` : '';
      const gameTime = `${formattedTime}${seconds} second${seconds !== 1 ? 's' : ''}`;
  
      return (
        <>
        <div className="centerGameAreaText">
          <p>Game over! You answered {correctAnswers} questions correctly in {gameTime}.</p>
          <button className="btn" style={{fontSize:'.5em',marginTop:'2em'}} onClick={resetGame}>Retry round</button>
        <Link to="/" className="btn" style={{fontSize:'.5em',marginTop:'2em'}}>Return to main menu</Link>
        </div>
        </>
      );
    }
  
    return (
      <div className="singlePlayerRound">
      <p>Timer: {`${Math.floor(timer / 60).toString().padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`}</p>
      <hr />
      <p>Question {currentQuestion + 1}/10</p>
      <hr />
      <p>{questionsArray[currentQuestion].question}</p>
      <input
        type="text"
        value={playerAnswer}
        onChange={(e) => setPlayerAnswer(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div>
      <button className="btn" style={{fontSize:'.875em'}} onClick={checkAnswer}>
        Submit Answer
      </button><br/>
      <Link to="/" className="btn" style={{fontSize:'.875em'}}>
        Quit round
      </Link>
      </div>
    </div>
    );
  };

  return <div align="center">{renderGameContent()}</div>;
};

export default Singleplayer;
