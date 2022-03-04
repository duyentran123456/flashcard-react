import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

import "./styles.css";

function Lesson(props) {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentCard, setCurrentCard] = useState(null);
  const [unlearnCards, setUnlearnCards] = useState([]);
  const [flip, setFlip] = useState(false);

  useEffect(async () => {
    // call firebase to get lesson
    const lesson = {
      id: lessonId,
      title: "Animals",
      cards: [{
        id: "1",
        question: "https://picsum.photos/id/237/200/300",
        answer: "A dog",
      },
      {
        id: "2",
        question: "https://picsum.photos/seed/picsum/200/300",
        answer: "A cat",
      },
      {
        id: "3",
        question: "https://picsum.photos/200/300?grayscale",
        answer: "A tiger",
      }
    ]
    };
    setLesson(lesson);
    setIsLoading(false);
    setCurrentCard(lesson.cards[0]);
    setUnlearnCards(lesson.cards);
  }, []);

  const handleLearn = () => {
    const newCards = unlearnCards.filter((card) => {
      return card.id !== currentCard.id;
    });
    const randomIndex = Math.floor(Math.random() * newCards.length);
    const newCurrentCard = newCards[randomIndex];

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
                      <span className="card-answer">{currentCard.answer}</span>
                    :
                      <img src={currentCard.question} className="card-image" alt=''/>
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

export default Lesson;
