import React, { useEffect } from 'react';
import Header from '../../components/Header';
import LessonItem from './LessonItem';

import { getAllLessonsRealtime } from '../../firebase/lesson';
import Auth from '../../components/Auth/Auth';

import { Container, Grid, Typography } from '@mui/material';

function Home() {
  const [lessons, setLessons] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const callback = (lessons) => {
      setLessons(lessons);
      setIsLoading(false);
    };

    return getAllLessonsRealtime(callback);
  }, []);

  return (
    <Auth roles={['user', 'admin']}>
      <Header />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Container>
          <Typography variant="h6" component="h1" gutterBottom marginTop={3}>
            Danh sách bài học
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {lessons.map((lesson) => (
              <Grid item xs={2} sm={4} md={4} key={lesson.id}>
                <LessonItem lesson={lesson} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Auth>
  );
}

export default Home;
