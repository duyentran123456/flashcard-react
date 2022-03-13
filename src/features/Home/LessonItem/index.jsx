import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Box } from '@mui/material';

LessonItem.propTypes = {
  lesson: PropTypes.object.isRequired,
};

function LessonItem(props) {
  const { lesson } = props;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/lesson/${lesson.id}`);
  };

  return (
    <Paper
      elevation={2}
      onClick={handleClick}
      sx={{ '&:hover': { cursor: 'pointer' } }}
    >
      <Box paddingX={2} paddingY={1}>
        <Typography variant="h6" component="h3">
          {lesson.title}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          color="#939bb4"
          paddingTop={1}
        >
          {lesson.cards.length} thuật ngữ
        </Typography>
      </Box>
    </Paper>
  );
}

export default LessonItem;
