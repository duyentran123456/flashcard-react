import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../../../components/Header';
import { getLessonById, deleteLesson } from '../../../firebase/lesson';
import Auth from '../../../components/Auth/Auth';

import '../styles.css';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ViewLesson() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [currentCard, setCurrentCard] = useState(0);
  const [unlearnCards, setUnlearnCards] = useState([]);
  const [flip, setFlip] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLesson = async () => {
      const response = await getLessonById(lessonId);
      setLesson(response);
      setIsLoading(false);
      setCurrentCard(0);
      setUnlearnCards(response.cards);
    };
    fetchLesson();
  }, [lessonId]);

  const handleLearn = () => {
    const newCards = unlearnCards.filter((card, i) => {
      return i !== currentCard;
    });
    const newCurrentCard = Math.floor(Math.random() * newCards.length);

    setUnlearnCards(newCards);
    setCurrentCard(newCurrentCard);
    setFlip(false);
  };

  const handleResetLearn = () => {
    setUnlearnCards(lesson.cards);
    setCurrentCard(0);
    setFlip(false);
  };

  const handleDeleteLesson = async () => {
    await deleteLesson(lessonId);
    navigate('/');
  };

  const renderCard = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop={3}
      >
        <Paper
          elevation={2}
          onClick={() => setFlip(!flip)}
          sx={{
            height: 325,
            width: 500,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {flip ? (
            <Typography variant="h5">
              {unlearnCards[currentCard].answer}
            </Typography>
          ) : (
            <img
              src={unlearnCards[currentCard].question}
              height={325}
              width={500}
            />
          )}
        </Paper>
        <Button onClick={handleLearn}>OK</Button>
      </Box>
    );
  };

  const renderNoti = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop={3}
      >
        <Paper
          elevation={2}
          onClick={() => setFlip(!flip)}
          sx={{
            height: 325,
            width: 500,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">Bạn đã học xong bài học này</Typography>
        </Paper>
        <Button onClick={handleResetLearn}>Học lại từ đầu</Button>
      </Box>
    );
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <div>Đang tải...</div>
      ) : (
        <Container>
          <Box display="flex" alignItems="center">
            <Typography variant="h4" component="h1" marginY={3} marginRight={2}>
              {lesson.title}
            </Typography>
            <Auth roles={['admin']}>
              <IconButton
                onClick={() => navigate(`/lesson/${lesson.id}/edit`)}
                size="small"
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDeleteLesson} size="small">
                <DeleteIcon />
              </IconButton>
            </Auth>
          </Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontSize: '15px', color: 'gray' }}
          >
            {lesson.cards.length} thuật ngữ
          </Typography>
          {unlearnCards.length > 0 ? renderCard() : renderNoti()}
        </Container>
      )}
    </>
  );
}

export default ViewLesson;
