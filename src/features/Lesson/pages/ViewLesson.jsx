import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";

import { getLessonById } from "../../../firebase/lesson";

import "../styles.css";

function ViewLesson(props) {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentCard, setCurrentCard] = useState(0);
  const [unlearnCards, setUnlearnCards] = useState([]);
  const [flip, setFlip] = useState(false);

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

  return (
    <>
      <Header />
      {isLoading ? <div>Loading...</div> : 
        <div className="main-content-container">
          <h1>{lesson.title}</h1>
          <span>{lesson.cards.length} thuật ngữ</span>

          {/* nếu còn unlearnCards sẽ hiển thị flashcard, nếu đã học hết hiển thị thông báo */}
          {unlearnCards.length > 0 
          ? 
          <div className="lesson-content">
            <div className="lesson-card-container">
              {/* flash card */}
              <div className="lesson-flash-card">
                <div className="flash-card" onClick={() => { setFlip(!flip) }}>
                  <div className="card-content">
                    {flip ?
                      <span className="card-answer">{unlearnCards[currentCard].answer}</span>
                    :
                      <img src={unlearnCards[currentCard].question} className="card-image" alt=''/>
                    }
                  </div>
                </div>
              </div>

              <button onClick={handleLearn}>Học xong</button>

            </div>
            </div>
          :
            <div>Bạn đã hoàn thành bài học!</div>
          }
        </div>
  }
    </>
  );
}

export default ViewLesson;